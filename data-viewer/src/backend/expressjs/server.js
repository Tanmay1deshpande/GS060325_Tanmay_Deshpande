// server.js (Mock Express Backend)
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");
const {
  JWT_SECRET_KEY,
  username,
  password,
  recruiterUsername,
  recruiterPassword,
  PORT,
} = require("../../constants/api/apiConstants");

const app = express();
const port = PORT;

app.use(cors()); //Allowing reqs from other sources
app.use(bodyParser.json());

const SECRET_KEY = JWT_SECRET_KEY;

// Mock User
const user = { username: username, password: password };
const recruiterUser = {
  username: recruiterUsername,
  password: recruiterPassword,
};

app.post("/login", (req, res) => {
  const { usernameReq, passwordReq } = req.body;
  if (
    (usernameReq === user.username && passwordReq === user.password) ||
    (usernameReq === recruiterUser.recruiterUsername &&
      passwordReq === recruiterUser.recruiterPassword)
  ) {
    const token = jwt.sign({ usernameReq }, SECRET_KEY, { expiresIn: "1h" });
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
app.listen(3000, () => console.log(`Server running on port 3000`));
app.listen(3001, () => console.log(`Server running on port 3001`));
