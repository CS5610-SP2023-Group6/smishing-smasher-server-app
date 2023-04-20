import mongoose from "mongoose";
import commentsSchema from "./comments-schema.js";
const commentsModel = mongoose.model("commentsModel", commentsSchema);
export default commentsModel;
