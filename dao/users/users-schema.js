import mongoose from 'mongoose';
import {ObjectId} from "mongodb";

const usersSchema = mongoose.Schema({
    uid: String,
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },

    firstName: String,
    lastName: String,
    handle: String,
    profilePicture: String,
    location: String,
    dateJoined : { type: Date, default: Date.now },

    following: Array,
    endorsements: Number,
    role: { type: String, default: "user" },
    posts: Array,


}, {collection: 'user'});
export default usersSchema;

