/**
 * @extends Error
 */
class Unauthorized extends Error {
  /**
   * @param  {string} message
   * @param  {string} errorCode
   * @param  {string} statusCode
   */
  constructor(message, errorCode=null) {
    super(message, errorCode);

    this.name = this.constructor.name;
    this.code = 401;
    this.message = message ?? 'Unauthorized';
  }
}

module.exports = Unauthorized;
