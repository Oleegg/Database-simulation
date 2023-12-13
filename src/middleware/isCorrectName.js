module.exports = isCorrectName = (req, res, next) => {
  const { name } = req.body;
  // const regex = new RegExp("^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,23})$");
  const isCorrect = name.length > 1;

  isCorrect
    ? next()
    : res.status(400).json({ message: "minimum name length is 2 characters" });
};
