const fs = require("fs");
const path = require("path");

module.exports = addUserId = () => {
  const file = path.join(__dirname, "../DB/users.txt");

  const data = fs.readFileSync(file, { encoding: "utf8", flag: "r" });
  line = data
    .split("\n")
    .filter((string) => string.length)
    .map((string) => JSON.parse(string));
  const id = line.length;

  return id;
};
