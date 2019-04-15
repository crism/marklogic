'use strict';

/**
 * Logging wrapper for declarative wrapper.
 * Provides a simple, standardised interface to xdmp.log
 */

const appTitle = 'decmap';
const separator = ' - ';

/**
 * Create a simple header for a log message in order to simplify logging.
 * @param {array}  subHeads - an array of fields to be output before the
 *  message.
 * @return {string} a string of the application title (appTitle variable)
 *  and the headers separated by the separator.
 */
function logHeader(subHeads) {
    return Array(appTitle).concat(subHeads).join(separator);
}

/**
 * Create a formatted log message at a given level.
 * @param {array} subHeads - an array of fields to be output before the message.
 * @param {string} message - the log message
 * @param {string} level - logging level; if not defined, we set it to info.
 * @return {string} the text logged
 */
function logMessage(subHeads, message, level) {
    const actualLevel = typeof level == 'undefined' ? 'info' : level;
    const logMessage = logHeader(subHeads) + separator + message;
    xdmp.log(logMessage, actualLevel);
    return logMessage;
}

/**
 * Wrapper for logMessage with the level set to debug.
 * @param {array} subHeads - an array of fields to be output before the message.
 * @param {string} message - the log message
 * @return {string} the text logged
 */
function debug(subHeads, message) {
    return logMessage(subHeads, message, 'debug');
}

/**
 * Wrapper for logMessage with the level set to fine.
 * @param {array} subHeads - an array of fields to be output before the message.
 * @param {string} message - the log message
 * @return {string} the text logged
 */
function fine(subHeads, message) {
    return logMessage(subHeads, message, 'fine');
}

/**
 * Wrapper for logMessage with the level set to info.
 * @param {array} subHeads - an array of fields to be output before the message.
 * @param {string} message - the log message
 * @return {string} the text logged
 */
function info(subHeads, message) {
    return logMessage(subHeads, message, 'info');
}

/**
 * Wrapper for logMessage with the level set to notice.
 * @param {array} subHeads - an array of fields to be output before the message.
 * @param {string} message - the log message
 * @return {string} the text logged
 */
function notice(subHeads, message) {
    return logMessage(subHeads, message, 'notice');
}


/**
 * Wrapper for logMessage with the level set to warning.
 * @param {array} subHeads - an array of fields to be output before the message.
 * @param {string} message - the log message
 * @return {string} the text logged
 */
function warning(subHeads, message) {
    return logMessage(subHeads, message, 'warning');
}

/**
 * Wrapper for logMessage with the level set to error.
 * @param {array} subHeads - an array of fields to be output before the message.
 * @param {string} message - the log message
 * @return {string} the text logged
 */
function error(subHeads, message) {
    return logMessage(subHeads, message, 'error');
}

/**
 * Fatal error - logs the error and the raises it
 * @param {array} subHeads - an array of fields to be output before the message.
 * @param {string} message - the log message
 */
function fatal(subHeads, message) {
    let fullMessage = logMessage([].concat(subHeads, 'FATAL'),
        message, 'error');
    throw new Error(fullMessage);
}

/**
 * Log the error generated by an exception
 * @param {object} e - the exception object
 */
function logError(e) {
    switch (e.name) {
    case 'RuntimeError':
        error([typeof e, ' EXCEPTION'],
            e.message + '\n' +
            'EXPRESSION: ' + e.expression + '\n' +
            'ORIGINAL EXPRESSION: ' + e.original + '\n' +
            'STACK: ' + e.stack) +
            'UNDERLYING: ' + e.underlying;
        break;
    case 'CompileError':
        error([typeof e, ' EXCEPTION'],
            e.message + '\n' +
            'EXPRESSION: ' + e.expression + '\n' +
            'PARSE TREE: ' + xdmp.quote(e.parseTree) + '\n\n' +
            'COMPILER CONTEXT: ' + xdmp.quote(e.compilerContext) + '\n\n' +
            'STACK: ' + e.stack);
        break;
    case 'ConfigError':
        error([typeof e, 'EXCEPTION'],
            e.message + '\n' +
            xdmp.quote(e.config) + '\n\n' +
            e.stack);
        break;
    case 'Error':
        error([typeof e, 'EXCEPTION'],
            e.message + '\n' +
            e.stack);
        break;
    case 'string':
        error(['EXCEPTION'],
            e + '\n');
    }
}

exports.logError = logError;
exports.error = error;
exports.warning = warning;
exports.notice = notice;
exports.info = info;
exports.debug = debug;
exports.fine = fine;
exports.fatal = fatal;
exports.logMessage = logMessage;