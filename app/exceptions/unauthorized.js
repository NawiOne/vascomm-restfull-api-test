/**
 * @extends Error
 */
class Unauthorized extends Error {
  constructor(message, errorCode=null) {
    super(message, errorCode);

    this.name = this.constructor.name;
    this.code = 401;
    this.message = message ?? 'Unauthorized';
  }
}

module.exports = Unauthorized;
