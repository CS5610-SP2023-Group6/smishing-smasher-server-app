import * as tagsDao from '../dao/tags/tags-dao.js';

const findAllTags = async (req, res) => {
  const tags = await tagsDao.findAllTags();
  res.json(tags);
};

const findTagById = async (req, res) => {
  const tag = await tagsDao.findTagById(req._id);
  res.json(tag);
}

const findTagsByTitle = async (req, res) => {
  const tags = await tagsDao.findTagsByTitle(req.params.title);
  res.json(tags);
};

const createTag = async (req, res) => {
  const newTag = req.body;
  newTag.creeatedAt = Date.now();

  const insertedComment = await tagsDao.createTag(newTag);
  res.json(insertedComment);
};

const deleteTag = async (req, res) => {
  const tagIdToDelete = req.body._id;
  const status = await tagsDao.deletePost(tagIdToDelete);
  res.json(status);
};

const updateTag = async (req, res) => {
  const tagIdToUpdate = req.body._id;
  const updates = req.body;
  const status = await tagsDao.updatePost(tagIdToUpdate, updates);
  res.json(status);
};

export default (app) => {
  app.get("/api/tags/all", findAllTags);
  app.post("/api/tags/id", findTagById);
  app.get("/api/tags/title/:title", findTagsByTitle);
  app.post("/api/tags", createTag);
  app.post("/api/tags/delete", deleteTag);
  app.post("/api/tags/update", updateTag);
}
