import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    title: { type: String, required: true, default: "" },
    posts: { type: Array, default: []},
    createdAt: { type: Date, default: Date.now() },
  },
  { collection: "tag" }
);
export default schema;
