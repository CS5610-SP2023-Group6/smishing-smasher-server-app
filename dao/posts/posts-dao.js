import postsModel from "./posts-model.js";

export const findAllPosts = () => postsModel.find();
export const findPostById = (pid) => postsModel.findById(pid);
export const findPostByAuthorID = (authorID) => postsModel.find({authorID: authorID});
export const findPostsByContents = (body) => {
  const queries = [];
  Object.keys(body).forEach(function (key) {
    if (key === "title") {
      queries.push({ title: { $regex: body[key], $options: "i" } });
    }
    else if (key === "spamText") {
      queries.push({ spamText: { $regex: body[key], $options: "i" } });
    }
    else if (key === "description") {
      queries.push({ description: { $regex: body[key], $options: "i" } });
    }
    console.log(queries);
  });
  return postsModel.find({ $and: queries });
};
export const findPostsByAddress = (body) => {
  const queries = [];
  Object.keys(body).forEach(function (key) {
    if (key === "state") {
      queries.push({ state: { $regex: body[key], $options: "i" } });
    }
    else if (key === "city") {
      queries.push({ city: { $regex: body[key], $options: "i" } });
    }
    else if (key === "address1") {
      queries.push({ address1: { $regex: body[key], $options: "i" } });
    }
    else if (key === "address2") {
      queries.push({ address2: { $regex: body[key], $options: "i" } });
    }
    else if (key === "zip") {
      queries.push({ zip: { $regex: body[key], $options: "i" } });
    }
  });
  return postsModel.find({ $and: queries });
};
export const findPostsByTime = (start, end) => postsModel.find({createdAt: {$gte: start, $lte: end}});
export const createPost = (post) => postsModel.create(post);
export const deletePost = (pid) => postsModel.findByIdAndDelete(pid);
export const updatePost = (pid, post) =>
  postsModel.findByIdAndUpdate(pid, { $set: post });
