import * as postsDao from "../dao/posts/posts-dao.js";
import * as userDao from "../dao/users/users-dao.js";
import { ObjectId } from "mongodb";

const findAllPosts = async (req, res) => {
  const posts = await postsDao.findAllPosts();
  res.json(posts);
};

const findPostById = async (req, res) => {
  console.log("find post", req.params.id);

  const post = await postsDao.findPostById(new ObjectId(req.params.id));
  res.json(post);
};

const findPostsByAuthorId = async (req, res) => {
  console.log("find posts", req.params.author);

  const posts = await postsDao.findPostByAuthorID(new ObjectId(req.params.author));
  res.json(posts);
};

const findPostsByTime = async (req, res) => {
  console.log("find posts ", req.body.start, " to ", req.body.end);

  const posts = await postsDao.findPostsByTime(req.body.start, req.body.end);
  res.json(posts);
};

const findPostsByContents = async (req, res) => {
  console.log("find post", req.body);

  const post = await postsDao.findPostsByContents(req.body);
  res.json(post);
};

const findPostsByAddress = async (req, res) => {
  console.log("find post", req.body);

  const posts = await postsDao.findPostsByAddress(req.body);
  res.json(posts);
};

const createPost = async (req, res) => {
  const newpost = req.body;
  const strId = newpost.authorID;
  console.log(strId);
  newpost.authorID = new ObjectId(newpost.authorID);
  newpost.thumbUp = 0;
  newpost.thumbDown = 0;
  newpost.endorsement = 0;
  newpost.comments = [];
  newpost.time = new Date().getTime() + "";
  const insertedpost = await postsDao.createPost(newpost);
  const author = await userDao.findUserById(strId);
  console.log(author);
  console.log(insertedpost);
  author.posts.push(insertedpost._id);
  const ress = await userDao.updateUser(strId, author);
  res.json(insertedpost);
};

const deletePost = async (req, res) => {
  const postIdToDelete = req.body._id;
  const status = await postsDao.deletePost(postIdToDelete);
  res.json(status);
};

const updatePost = async (req, res) => {
  const postIdToUpdate = req.body._id;
  req.body.authorID = new ObjectId(req.body.authorID);
  const updates = req.body;
  const status = await postsDao.updatePost(postIdToUpdate, updates);
  res.json(status);
};

export default (app) => {
  app.post("/api/posts/create", createPost);
  app.get("/api/posts/all", findAllPosts);
  app.post("/api/posts/content", findPostsByContents);
  app.post("/api/posts/address", findPostsByAddress);
  app.get("/api/posts/id/:id", findPostById);
  app.get("/api/posts/author/:author", findPostsByAuthorId);
  app.post("/api/posts/time", findPostsByTime);
  app.post("/api/posts/update", updatePost);
  app.post("/api/posts/delete", deletePost);
};
