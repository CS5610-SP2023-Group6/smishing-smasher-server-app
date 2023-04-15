import postsModel from "./posts-model.js";
export const findPost = (postIds) => {
    console.log('postsDao', postIds)
    return postsModel.find({id: {$in: postIds}});

}

export const findAllPosts = () => postsModel.find();
export const createPost = (post) => postsModel.create(post);

export const deletePost = (pid) => postsModel.deleteOne({_id: pid});
export const updatePost = (pid, post) => postsModel.updateOne({_id: pid}, {$set: post})



