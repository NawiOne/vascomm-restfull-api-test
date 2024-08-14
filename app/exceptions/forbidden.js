// Execption unauthorized
/**
 * @extends Error
 */
class Forbidden extends Error {
  /**
   * @param  {string} message
   */
  constructor(message) {
    super(message);

    this.name = this.constructor.name;
    this.code = 403;
    this.message = message?? 'Forbidden';
  }
}

module.exports = Forbidden;
