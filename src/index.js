const fs = require("fs");
const path = require("path");
const isUseEmail = require("./middleware/isUseEmail");
const isData = require("./middleware/isData");
const isCorrectName = require("./middleware/isCorrectName");
const isCorrectEmail = require("./middleware/isCorrectEmail");
const { v4: uuidv4 } = require("uuid");
const bcript = require("bcryptjs");
// const isCorrectPassword = require("./middleware/isCorrectPassword");

const express = require("express");

const PORT = 3000;
const app = express();

app.use(express.json());

const file = path.join(__dirname, "/DB/users.txt");

app.listen(PORT, (e) => {
  e ? console.log(e) : console.log(`Server started in port ${PORT}`);
});

app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

app.get("/db", (req, res) => {
  res.json({ message: "DB" });
});

//create user
app.post(
  "/db/users",
  isData,
  isCorrectEmail,
  isUseEmail,
  isCorrectName,
  async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const id = uuidv4();
      const hashPassword = await bcript.hash(password, 12);
      // console.log("******", id);
      const user = JSON.stringify({ id, name, email, password: hashPassword });

      fs.appendFile(file, `\n${user}`, (err) => {
        if (err) {
          throw new Error(err);
        } else {
          res.status(201).json({ message: `user ${name} is registered` });
        }
      });
    } catch (e) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

app.get("/db/users", (req, res) => {
  try {
    fs.readFile(file, "utf8", (err, data) => {
      line = data
        .split("\n")
        .filter((string) => string.length)
        .map((string) => JSON.parse(string));
      const users = line.map((user) => {
        return { id: user.id, name: user.name, email: user.email };
      });
      console.log(line);
      res.status(200).json({ users });
    });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.get("/db/user/:id", (req, res) => {
  const id = req.params.id;
  fs.readFile(file, "utf8", (err, data) => {
    if (data) {
      line = data
        .split("\n")
        .filter((string) => string.length)
        .map((string) => JSON.parse(string));
      const user = line.filter((user) => user.id.toString() === id)[0];
      if (user) {
        const responseUser = {
          id: user.id,
          name: user.name,
          email: user.email,
        };
        res.status(200).json({ user: responseUser });
      } else {
        res.status(400).json({ message: "there is no user with this id" });
      }
    } else {
      console.log(err);
    }
  });
});

//Error send
app.use((req, res) => {
  res.status(404).json({ message: "Error" });
});
