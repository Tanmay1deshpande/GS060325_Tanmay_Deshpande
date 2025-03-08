// Mock Express Backend
const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");
// const {
//   JWT_SECRET_KEY,
//   username,
//   password,
//   recruiterUsername,
//   recruiterPassword,
//   REACT_APP_API_URL,
// } = require("../../constants/api/apiConstants");

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: "http://localhost:3000", // Allow only requests from React
  methods: "GET,POST",
};

app.use(cors(corsOptions)); //Allowing reqs from other sources
app.use(bodyParser.json());

const SECRET_KEY = "jwt_secret_key_for_dummy_data_viewer_application";

// Mock User
// const user = { username: username, password: password };
// const recruiterUser = {
//   username: recruiterUsername,
//   password: recruiterPassword,
// };

const user = { username: "admin", password: "password" };
const recruiterUser = {
  username: "recruiter",
  password: "hireMe@GreatFit.yay",
};

app.post("/api/login", (req, res) => {
  const { usernameReq, passwordReq } = req.body;
  if (
    (usernameReq === user.username && passwordReq === user.password) ||
    (usernameReq === recruiterUser.recruiterUsername &&
      passwordReq === recruiterUser.recruiterPassword)
  ) {
    const token = jwt.sign(
      { usernameReq },
      "jwt_secret_key_for_dummy_data_viewer_application",
      { expiresIn: "1h" }
    );
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

console.log("PORT: ", port);
app.listen(port, () => console.log(`Server running on port ${port}`));
