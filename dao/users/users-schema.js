import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    nickname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    profilePicture: String,
    address1: { type: String, required: true },
    address2: String,
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now() },
    birthday: { type: Date, required: true },
    website: {type: String, required: true, default: ''},
    bio: {type: String, required: true, default: ''},
    following: {type: Array, required: true, default: []},
    followers: {type: Number, required: true, default: 0},
    endorsements: {type: Number, required: true, default: 0},
    thumbUp: {type: Number, required: true, default: 0},
    thumbDown: {type: Number, required: true, default: 0},
    role: {type: String, required: true, default: 'user'},
    posts: {type: Array, required: true, default: []},
    comments: {type: Array, required: true, default: []},
    favorites: {type: Array, required: true, default: []},
    history: {type: Array, required: true, default: []},
  },
  { collection: "user" }
);
export default schema;
