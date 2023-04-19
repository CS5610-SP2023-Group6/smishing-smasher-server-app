import * as postsDao from "../dao/posts/posts-dao.js";

const findAllPosts = async (req, res) => {
  const posts = await postsDao.findAllPosts();
  res.json(posts);
};

const findPostById = async (req, res) => {
  console.log("find post", req.body._id);

  const post = await postsDao.findPostById(req.body._id);
  res.json(post);
};

const findPostsByAuthorId = async (req, res) => {
  console.log("find posts", req.body.authorID);

  const posts = await postsDao.findPostByAuthorID(req.body.authorID);
  res.json(posts);
};

const findPostsByNickname = async (req, res) => {
  console.log("find posts", req.params.nickname);

  const posts = await postsDao.findPostsByNickname(req.params.nickname);
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
  newpost.thumbUp = 0;
  newpost.thumbDown = 0;
  newpost.endorsement = 0;
  newpost.comments = [];
  newpost.time = new Date().getTime() + "";
  const insertedpost = await postsDao.createPost(newpost);
  res.json(insertedpost);
};

const deletePost = async (req, res) => {
  const postIdToDelete = req.body._id;
  const status = await postsDao.deletePost(postIdToDelete);
  res.json(status);
};

const updatePost = async (req, res) => {
  const postIdToUpdate = req.body._id;
  const updates = req.body;
  const status = await postsDao.updatePost(postIdToUpdate, updates);
  res.json(status);
};

export default (app) => {
  app.post("/api/posts", createPost);
  app.get("/api/posts/all", findAllPosts);
  app.post("/api/posts/mul", findPostsByContents);
  app.post("/api/posts/one", findPostsByAddress);
  app.post("/api/posts/id", findPostById);
  app.post("/api/posts/author", findPostsByAuthorId);
  app.get("/api/posts/nickname/:nickname", findPostsByNickname);
  app.post("/api/posts/time", findPostsByTime);
  app.post("/api/posts/update", updatePost);
  app.post("/api/posts/delete", deletePost);
};
