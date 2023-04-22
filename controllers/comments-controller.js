import * as commentsDao from "../dao/comments/comments-dao.js";
import * as postsDao from "../dao/posts/posts-dao.js";
import * as userDao from "../dao/users/users-dao.js";
import { ObjectId } from "mongodb";

const findAllComments = async (req, res) => {
  const comments = await commentsDao.findAllComments();
  res.json(comments);
};

const findCommentById = async (req, res) => {
  const comment = await commentsDao.findCommentById(new ObjectId(req.params.id));
  res.json(comment);
}

const findCommentsByAuthorId = async (req, res) => {
  const comments = await commentsDao.findCommentsByAuthorID(new ObjectId(req.params.author));
  res.json(comments);
}

const findCommentsByPostID = async (req, res) => {
  const comments = await commentsDao.findCommentsByPostID(new ObjectId(req.params.post));
  res.json(comments);
};

const findCommentsByContents = async (req, res) => {
  const comments = await commentsDao.findCommentsByContents(req.body.text);
  res.json(comments);
}

const findCommentsByTime = async (req, res) => {
  const comments = await commentsDao.findCommentsByTime(req.body.start, req.body.end);
  res.json(comments);
};

const createComment = async (req, res) => {
  const newComment = req.body;
  const authorIDstr = newComment.authorID;
  const postIDstr = newComment.postID;
  newComment.authorID = new ObjectId(newComment.authorID);
  newComment.postID = new ObjectId(newComment.postID);
  newComment.creeatedAt = Date.now();
  newComment.thumbUp = 0;
  newComment.thumbDown = 0;

  const insertedComment = await commentsDao.createComment(newComment);
  const author = await userDao.findUserById(authorIDstr);
  const post = await postsDao.findPostById(postIDstr);
  author.comments.push(insertedComment._id);
  post.comments.push(insertedComment._id);
  const res1 = await userDao.updateUser(authorIDstr, author);
  const res2 = await postsDao.updatePost(postIDstr, post);
  res.json(insertedComment);
};

const deleteComment = async (req, res) => {
  const commentIdToDelete = req.body._id;
  const status = await commentsDao.deleteComment(commentIdToDelete);
  res.json(status);
};

const updateComment = async (req, res) => {
  const commentIdToUpdate = req.body._id;
  req.body.authorID = new ObjectId(req.body.authorID);
  req.body.postID = new ObjectId(req.body.postID);
  const updates = req.body;
  const status = await commentsDao.updateComment(commentIdToUpdate, updates);
  res.json(status);
};

export default (app) => {
  app.get("/api/comments/all", findAllComments);
  app.get("/api/comments/id/:id", findCommentById);
  app.get("/api/comments/author/:author", findCommentsByAuthorId);
  app.get("/api/comments/post/:post", findCommentsByPostID);
  app.post("/api/comments/content", findCommentsByContents);
  app.post("/api/comments/time", findCommentsByTime);
  app.post("/api/comments/create", createComment);
  app.post("/api/comments/delete", deleteComment);
  app.post("/api/comments/update", updateComment);
}