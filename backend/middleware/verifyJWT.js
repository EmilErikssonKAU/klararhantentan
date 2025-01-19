const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    console.log("Verifying jwt")
    const authHeader = req.headers.authorization || req.headers.authorization

    if(!authHeader?.startsWith('Bearer ')){
        return res.status(401).json({ message: 'Unauthroized'});
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) return res.status(403).json({ message: 'Forbidden'});
            req.user = decoded.username;
            next();
        }
    )
}

module.exports = verifyJWT;