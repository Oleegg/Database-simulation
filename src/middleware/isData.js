module.exports = isData = (req, res, next) => {
  const { name, password, email } = req.body;
  !name || !password || !email ? res.end("no data") : next();
};
