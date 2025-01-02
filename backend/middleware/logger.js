// module for date-formatting
const { format } = require('date-fns');
// module for generating uuids
const { v4: uuid } = require('uuid');
// module for handling file-system
const fs = require('fs');
// promise-based interface for fs
const fsPromises = require('fs').promises
// module for handling file-paths
const path = require('path')

const logEvents = async (message, logFileName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try{
        // checks if logs folder exists, if not it is created
        if(!fs.existsSync(path.join(__dirname,'..','logs'))){
            await fsPromises.mkdir(path.join(__dirname,'..','logs'));
        }
        // appends logItem to file
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs',
            logFileName), logItem);
        
    }
    catch (err){
        console.log(err);
    }
}

const logger = (req,res,next) => {
    // adds request-method, request-url and request-origin to log-file
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log');
    console.log(`${req.method} ${req.path}`)
    next()
}

module.exports = {logEvents, logger};