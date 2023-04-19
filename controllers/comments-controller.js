import * as commentsDao from "../dao/posts/comments-dao.js";

const findAllComments = async (req, res) => {
  const comments = await commentsDao.findAllComments();
  res.json(comments);
};

const findCommentById = async (req, res) => {
  const comment = await commentsDao.findCommentById(req._id);
  res.json(comment);
}

const findCommentsByAuthorId = async (req, res) => {
  const comments = await commentsDao.findCommentById(req.authorID);
  res.json(comments);
}

const findCommentsByNickname = async (req, res) => {
  const comments = await commentsDao.findPostsByNickname(req.params.nickname);
  res.json(comments);
};

const findCommentsByContents = async (req, res) => {
  const comments = await commentsDao.findCommentById(req.text);
  res.json(comments);
}

const findCommentsByTime = async (req, res) => {
  const comments = await commentsDao.findCommentsByTime(req.body.start, req.body.end);
  res.json(comments);
};

const createComment = async (req, res) => {
  const newComment = req.body;
  newComment.creeatedAt = Date.now();
  newComment.thumbUp = 0;
  newComment.thumbDown = 0;

  const insertedComment = await commentsDao.createComment(newComment);
  res.json(insertedComment);
};

const deleteComment = async (req, res) => {
  const commentIdToDelete = req.body._id;
  const status = await commentsDao.deleteComment(commentIdToDelete);
  res.json(status);
};

const updateComment = async (req, res) => {
  const commentIdToUpdate = req.body._id;
  const updates = req.body;
  const status = await commentsDao.updateComment(commentIdToUpdate, updates);
  res.json(status);
};

export default (app) => {
  app.get("/api/comments/all", findAllComments);
  app.post("/api/comments/id", findCommentById);
  app.post("/api/comments/author", findCommentsByAuthorId);
  app.get("/api/comments/nickname/:nickname", findCommentsByNickname);
  app.post("/api/comments/contents", findCommentsByContents);
  app.post("/api/comments/time", findCommentsByTime);
  app.post("/api/comments", createComment);
  app.post("/api/comments/delete", deleteComment);
  app.post("/api/comments/update", updateComment);
}