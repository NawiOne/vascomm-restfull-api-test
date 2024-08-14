/**
 * @extends Error
 */
class InvalidData extends Error {
  /**
   * @param  {string} message
   */
  constructor(message) {
    super(message);

    this.name = this.constructor.name;
    this.code = 422;
    this.message = 'Invalid Input Data! ' + message? message: '';
  }
}

module.exports = InvalidData;
