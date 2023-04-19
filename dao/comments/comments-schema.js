import mongoose from 'mongoose';

const schema = mongoose.Schema({
    authorID: {type: Object, required: true},
    createdAt: { type: Date, required: true, default: Date.now() },
    thumbUp: {type: Number, required: true, default: 0},
    thumbDown: {type: Number, required: true, default: 0},
    text: {type: String, required: true, default: ''},
}, {collection: 'comment'});
export default schema;
