const fs = require("fs");
const path = require("path");

module.exports = isUseEmail = (req, res, next) => {
  const file = path.join(__dirname, "../DB/users.txt");
  const { email } = req.body;
  fs.readFile(file, "utf8", (err, data) => {
    line = data
      .split("\n")
      .filter((string) => string.length)
      .map((string) => JSON.parse(string));
    console.log(line);
    const emailList = line.map((user) => user.email);

    if (emailList.includes(email)) {
      res.status(400).json({ message: "email is using" });
    } else {
      next();
    }
  });
};
