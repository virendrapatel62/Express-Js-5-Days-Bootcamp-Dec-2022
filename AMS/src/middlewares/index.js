function requestLogger(request, response, next) {
  console.log({
    body: request.body,
    query: request.query,
    params: request.params,
    session: request.session,
  });

  next();
}

module.exports = {
  requestLogger,
};
