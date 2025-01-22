const user = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/User')

// @desc Login
// @route POST /auth
// @access Public
const login = asyncHandler(async (req, res) =>{
    // extract username and password
    const { username, password } = req.body

    // check that both fields are filled
    if(!username || !password){
        return res.status(400).json({ message: 'All fields are required'})
    }

    // find matching user
    const foundUser = await User.findOne({ username }).exec()

    // check whether matching user is found
    if(!foundUser){
        return res.status(401).json({ message: 'Unauthorized' })
    }

    // Compare whether password matches hash
    const match = await bcrypt.compare(password, foundUser.password)

    if(!match) return res.status(401).json({ message: 'Unauthorized '})

    // Create accessToken
    const accessToken = jwt.sign(
        { "username": foundUser.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m'}
    )

    // Create refreshToken
    const refreshToken = jwt.sign(
        { "username": foundUser.username },  // payload
        process.env.REFRESH_TOKEN_SECRET,    // secret key
        { expiresIn: '1d'}                   // options
    )

    // set jwt cookie in res
    res.cookie('jwt', refreshToken,{
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000
    })


    // Send accessToken containing username
    res.json({ accessToken })
})

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = (req, res) => {
    // extract cookie property
    const cookies = req.cookies;

    console.log("Cookies?");

    // confirm jwt property exists
    if(!cookies?.jwt) return res.status(401).json({ message: "Unauthorized"});

    console.log("Cookie exists!");

    // extract refreshToken
    const refreshToken = cookies.jwt;

    // verify the supplied refreshToken
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        // called with error if failed authentication, if success called with decoded 
        asyncHandler(async (err, decoded) => {
            if(err) return res.status(403).json({ message: 'Forbidden'});
            
            const foundUser = await User.findOne({ username: decoded.username });

            console.log(decoded.username)

            if (!foundUser) return res.status(401).json({ message: 'Unauthorized' });

            console.log("User was found")

            const accessToken = jwt.sign(
                { "username": foundUser.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '10s' }
            )
    
            res.json({ accessToken })
        })
    )
}


// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
    // extract cookies
    const cookies = req.cookies

    // check for jwt cookie
    if (!cookies?.jwt) return res.sendStatus(204) // No content
    
    // clear jwt cookie
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.json({ message: 'Cookie cleared' })
}

module.exports = {
    login,
    refresh,
    logout
}