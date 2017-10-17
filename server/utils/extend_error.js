'use strict';

class ExtendError extends Error {
  constructor(status, message) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
  }
}

module.exports = ExtendError;