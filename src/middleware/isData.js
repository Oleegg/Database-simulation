module.exports = isData = (req, res, next) => {
  const { name, password, email } = req.body;
  !name || !password || !email
    ? res.status(400).json({ message: "no data" })
    : next();
};
