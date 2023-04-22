import * as usersDao from "../dao/users/users-dao.js";
import { ObjectId } from "mongodb";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const bcrypt = require("bcryptjs");

const findAllUser = async (req, res) => {
  const users = await usersDao.findAllUsers();
  console.log("findAllUser", users);
  res.json(users);
};

const findUserById = async (req, res) => {
  console.log("findUser", req.params.id);
  const userId = new ObjectId(req.params.id);
  const user = await usersDao.findUserById(userId);
  res.json(user);
};

const findUserByEmail = async (req, res) => {
  console.log("findUser", req.params.email);
  const email = req.params.email;
  const user = await usersDao.findUserByEmail(email);
  res.json(user);
};

const findUsersByNickname = async (req, res) => {
  console.log("findUser", req.params.nickname);
  const nickname = req.params.nickname;
  const users = await usersDao.findUsersByNickname(nickname);
  res.json(users);
};

const findUsersByAddress = async (req, res) => {
  console.log("findUser", req.body);
  const body = req.body;
  const users = await usersDao.findUsersByAddresses(body);
  res.json(users);
};

const findUsersByBirth = async (req, res) => {
  console.log("findUser", req.body.birthday);
  const birthday = req.body.birthday;
  const users = await usersDao.findUsersByBirth(birthday);
  res.json(users);
};

const createUser = async (req, res) => {
  const newuser = req.body;
  newuser.dateJoined = new Date().getTime() + "";
  const password = req.body.password;
  req.body.password = bcrypt.hashSync(password, 10);
  newuser.endorsements = 0;
  newuser.role = "user";
  newuser.following = [];
  newuser.followers = 0;
  newuser.thumbUp = 0;
  newuser.thumbDown = 0;
  newuser.endorsements = 0;
  newuser.posts = [];
  newuser.comments = [];

  newuser.favorites = [];
  newuser.history = [];
  newuser.dateJoined = new Date().toLocaleDateString();

  const inserteduser = await usersDao.createUser(newuser);
  res.json(inserteduser);
};

const deleteUser = async (req, res) => {
  const userIdToDelete = new ObjectId(req.body._id);
  const status = await usersDao.deleteUser(userIdToDelete);

  res.json(status);
};

const updateUser = async (req, res) => {
  const userIdToUpdate = req.body._id;
  const updates = req.body;
  const status = await usersDao.updateUser(userIdToUpdate, updates);
  res.json(status);
};

const resetPassword = async (req, res) => {
  const userIdToUpdate = req.body._id;
  const updates = req.body;
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  const status = await usersDao.updateUser(userIdToUpdate, updates);
  res.json(status);
};


export default (app) => {
  app.post("/api/users/create", createUser);
  app.get("/api/users/all", findAllUser);
  app.get("/api/users/id/:id", findUserById);
  app.get("/api/users/email/:email", findUserByEmail);
  app.get("/api/users/nickname/:nickname", findUsersByNickname);
  app.post("/api/users/address", findUsersByAddress);
  app.post("/api/users/birthday", findUsersByBirth);
  app.post("/api/users/update", updateUser);
  app.post("/api/users/delete", deleteUser);
  app.post("/api/users/reset", resetPassword);
};
