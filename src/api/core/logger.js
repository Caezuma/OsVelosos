const fs = require('fs');
const path = require('path');

class Logger {
  constructor() {
    this.logFile = path.join(__dirname, '../../logs/app.log');
  }

  log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - ${message}\n`;
    fs.appendFileSync(this.logFile, logMessage);
    console.log(logMessage);
  }

  error(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - ERROR - ${message}\n`;
    fs.appendFileSync(this.logFile, logMessage);
    console.error(logMessage);
  }
}

module.exports = new Logger();
