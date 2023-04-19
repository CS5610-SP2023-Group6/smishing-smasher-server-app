import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    authorID: { type: Object, required: true },
    title: { type: String, required: true, default: "" },
    createdAt: { type: Date, required: true, default: Date.now() },
    phone: { type: Number, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    comments: { type: Array, required: true, default: [] },
    tags: { type: Array, required: true, default: [] },
    thumbUp: { type: Number, required: true, default: 0 },
    thumbDown: { type: Number, required: true, default: 0 },
    endorsement: { type: Number, required: true, default: 0 },
    description: {type: String, required: true, default: ''},
    spamText: {type: String, required: true, default: ''},
    photos: { type: Array, required: true, default: [] },
  },
  { collection: "smish" }
);
export default schema;
