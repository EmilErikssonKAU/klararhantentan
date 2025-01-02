const { logEvents } = require('./logger');

// override express default error-handler
const errorHandler = (err, req, res, next) => {
    // Write error to log and console
    logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t
        ${req.headers.origin}`, 'errorLog.log');
    console.log(err.stack);

    // set status
    const status = res.statusCode ? res.statusCode : 500 // server error

    // return the status
    res.status(status)
    res.json({ message: err.message})
};

module.exports = errorHandler







