const fs = require("fs");
const path = require("path");
const isUseEmail = require("./middleware/isUseEmail");
const isData = require("./middleware/isData");
const isCorrectName = require("./middleware/isCorrectName");
const isCorrectEmail = require("./middleware/isCorrectEmail");
const addUserId = require("./add/addUserId");
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
  res.send("Hello");
});

app.get("/db", (req, res) => {
  res.send("DB");
});

//create user
app.post(
  "/db/users",
  isData,
  isCorrectEmail,
  isUseEmail,
  isCorrectName,
  (req, res) => {
    const { name, email, password } = req.body;
    const id = addUserId();
    // console.log("******", id);
    const user = JSON.stringify({ id, name, email, password });

    fs.appendFile(file, `\n${user}`, (err) => {
      if (err) {
        console.log(err);
      } else {
        res.send(`user ${name} is registered`);
      }
    });
  }
);

app.get("/db/users", (req, res) => {
  fs.readFile(file, "utf8", (err, data) => {
    line = data
      .split("\n")
      .filter((string) => string.length)
      .map((string) => JSON.parse(string));
    const users = line.map((user) => {
      return { name: user.name, email: user.email };
    });
    console.log(line);
    res.send(users);
  });
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
        res.send(responseUser);
      } else {
        res.send("there is no user with this id");
      }
    } else {
      console.log(err);
    }
  });
});

//Error send
app.use((req, res) => {
  res.status(404).send("Error");
});
