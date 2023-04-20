import mongoose from "mongoose";
import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import PostController from "./controllers/posts-controller.js";
import GeolocationController from "./api/geolocation-api.js";
import UserController from "./controllers/users-controller.js";
import CommentsController from "./controllers/comments-controller.js";
import TagsController from "./controllers/tags-controller.js";
import AuthController from "./controllers/auth-controller.js";
// TODO: add env variable for connection string
const CONNECTION_STRING = process.env.DB_CONNECTION;

mongoose.connect(
  "mongodb+srv://root:smishingsmasher@smishing-smasher.udn2ewp.mongodb.net/smishing-smasher?retryWrites=true&w=majority"
);

const blackUrlList = [
  "/api/users/profile",
  "/api/users/edit",
  "/api/upload",
  "/api/files",
  "/api/users/create",
  "/api/users/update",
  "/api/users/delete",
  "/api/tags/create",
  "/api/tags/delete",
  "/api/tags/update",
  "/api/posts/create",
  "/api/posts/update",
  "/api/posts/delete",
  "/api/comments/create",
  "/api/comments/delete",
  "/api/comments/update",
]

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: "sessionKey",
    name: 'token',
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24
    },
    saveUninitialized: true,
    rolling: true,
  })
);
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(function (req, res, next) {
  const { userInfo } = req.session;
  if (blackUrlList.includes(req.url)) {
    if (!userInfo) {
      res.send({ flag: false, status: 403, msg: 'cookies outdated' });
    } else {
      next();
    }
  } else {
    next();
  }
});
app.use(express.json());
PostController(app);
GeolocationController(app);
UserController(app);
CommentsController(app);
TagsController(app);
AuthController(app);

app.listen(process.env.PORT || 4000);
