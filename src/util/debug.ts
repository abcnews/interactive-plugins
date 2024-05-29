/**
 * Log a message. The conditional _should_ mean dead code elimination removes
 * all the logs (and strings) from prod to save space.
 * @param prefix - Name of the function to prefix the message with
 * @param args
 */
export function log(prefix, ...args) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`%c${prefix}`, 'background:black;color:white', ...args);
  }
}