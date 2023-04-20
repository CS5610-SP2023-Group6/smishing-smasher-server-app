import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    authorID: { type: Object, required: true },
    title: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
    phone: { type: Number, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    comments: { type: Array, default: [] },
    tags: { type: Array, default: [] },
    thumbUp: { type: Number, default: 0 },
    thumbDown: { type: Number, default: 0 },
    endorsement: { type: Number, default: 0 },
    description: {type: String, default: ''},
    spamText: {type: String, default: ''},
    photos: { type: Array, default: [] },
  },
  { collection: "smish" }
);
export default schema;
