const express = require("express"); 
const PORT = 3080;
const cors = require("cors");
const server = express();
const path = require("node:path");
const bodyParser = require("body-parser");
require("dotenv").config();
const passport = require("passport");
const session = require("express-session")
const {secret} = require("./src/config/authConfig")
const router = require("./src/router/index.routes");

const FrontendJoin = {
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

server.use(cors(FrontendJoin));

server.use(
  session({
    secret: secret,
    resave: true,
    saveUninitialized: true,
  })
);
server.use(passport.initialize());
server.use(passport.session());

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use("/public", express.static(path.join(__dirname, "public")));

server.get("/", (req, res) => {
  let SayHello = "Hello Welcome To ExpressJs Institute ";
  res.send(SayHello);
});

server.use(router);
server.listen(PORT, () => {
  console.log(`Server is Connected Sucessfully on http://localhost:${PORT}`);
});

