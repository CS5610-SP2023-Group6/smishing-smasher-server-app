import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    title: { type: String, required: true, default: "" },
    createdAt: { type: Date, required: true, default: Date.now() },
  },
  { collection: "tag" }
);
export default schema;
