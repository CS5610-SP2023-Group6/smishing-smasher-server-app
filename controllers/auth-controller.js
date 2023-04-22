import * as usersDao from "../dao/users/users-dao.js";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const AuthController = (app) => {
  const bcrypt = require("bcryptjs");

  const register = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const address1 = req.body.address1;
    const city = req.body.city;
    const state = req.body.state;
    const zip = req.body.zip;
    if (!email || !password) {
      res.status(422).json({ msg: "email or password is required" });
      return;
    }
    if (!address1 || !city || !state || !zip) {
      res.status(422).json({ msg: "complete address is required" });
      return;
    }
    const user = await usersDao.findUserByEmail(email);
    if (user) {
      res.status(409).json({ msg: "user has existed" });
      return;
    }
    req.body.password = bcrypt.hashSync(password, 10);
    const newUser = await usersDao.createUser(req.body);
    req.session["currentUser"] = newUser;
    res.json(newUser);
  };

  const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
      res.status(422).json({ msg: "email or password is required" });
      return;
    }
    const user = await usersDao.findUserByEmail(email);
    if (user && bcrypt.compareSync(password, user.password)) {
      req.session["currentUser"] = user;
      req.session.userInfo = { email, password };
      res.status(200).json({ msg: "login success" });
    } else {
      res.status(404).json({ msg: "login failed" });
    }
  };

  const loginByApi = async (req, res) => {
    const email = req.body.email;
    if (!email) {
      res.status(422).json({ msg: "email is required" });
      return;
    }
    const user = await usersDao.findUserByEmail(email);
    if (user) {
      console.log(email);
      req.session["currentUser"] = user;
      req.session.userInfo = { email };
      res.status(200).json({ msg: "login success" });
    } else {
      res.status(404).json({ msg: "login failed" });
    }
  }

  const profile = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.status(404).json({ msg: "please login first" });
      return;
    }
    res.json(currentUser);
  };

  const logout = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (currentUser) {
      req.session.destroy();
      res.status(200).json({ msg: "logout success" });
      return;
    }
    res.status(404).json({ msg: "logout failed" });
  };

  const editProfile = async (req, res) => {
    const currentUser = req.session["currentUser"];
    const uid = currentUser._id;
    const password = req.body.password;
    req.body.password = bcrypt.hashSync(password, 10);
    const updates = req.body;
    const body = await usersDao.updateUser(uid, updates);
    res.status(200).json(currentUser);
  };

  app.post("/api/users/register", register);
  app.post("/api/users/alogin", loginByApi);
  app.post("/api/users/login", login);
  app.get("/api/users/profile", profile);
  app.post("/api/users/logout", logout);
  app.post("/api/users/edit", editProfile);
};
export default AuthController;
