import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    nickname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    profilePicture: {type: String, default: '6442a2dc66674f9ee9472690'},
    address1: { type: String, required: true },
    address2: {type: String, default: ''},
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
    birthday: { type: Date, required: true },
    website: {type: String, default: ''},
    bio: {type: String, default: ''},
    following: {type: Array, default: []},
    followers: {type: Number, default: 0},
    endorsements: {type: Number, default: 0},
    thumbUp: {type: Number, default: 0},
    thumbDown: {type: Number, default: 0},
    role: {type: String, default: 'user'},
    posts: {type: Array, default: []},
    comments: {type: Array, default: []},
    favorites: {type: Array, default: []},
    history: {type: Array, default: []},
  },
  { collection: "user" }
);
export default schema;
