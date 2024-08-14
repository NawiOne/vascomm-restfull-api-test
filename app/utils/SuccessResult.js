class SuccessResult {
  static make(res) {
    this.res = res;
    return this;
  }

  static send(data, message, total) {
    return this.res.status(200).send(
      {
        code: 200,
        message,
        data: data,
        ...(total && {
          total: total
        })
      },
    );
  }

}

module.exports = SuccessResult;
