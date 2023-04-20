import mongoose from 'mongoose';

const schema = mongoose.Schema({
    authorID: {type: Object, required: true},
    postID: {type: Object, required: true},
    createdAt: { type: Date, default: Date.now() },
    thumbUp: {type: Number, default: 0},
    thumbDown: {type: Number, default: 0},
    text: {type: String, required: true},
}, {collection: 'comment'});
export default schema;
