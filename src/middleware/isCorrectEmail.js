module.exports = isCorrectEmail = (req, res, next) => {
  const { email } = req.body;
  const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  reg.test(email)
    ? next()
    : res.status(400).json({ message: "email is not correct" });
};
