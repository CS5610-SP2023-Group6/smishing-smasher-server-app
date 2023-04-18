import mongoose from "mongoose";
import session from "express-session";
import MongoDBStore from "connect-mongodb-session";
// TODO: add env variable for connection string
// const CONNECTION_STRING = process.env.DB_CONNECTION
const CONNECTION_STRING = "mongodb+srv://root:smishingsmasher@smishing-smasher.udn2ewp.mongodb.net/smishing-smasher?retryWrites=true&w=majority"
mongoose.connect("mongodb+srv://root:smishingsmasher@smishing-smasher.udn2ewp.mongodb.net/smishing-smasher?retryWrites=true&w=majority");


import express from 'express'
// import UserController
//     from "./controllers/users/users-controller.js"
import PostController from "./controllers/posts-controller.js"
import cors from 'cors'
import GeolocationController from "./api/geolocation/geolocation-controller.js";
import UserController from "./controllers/user-controller.js";
import AuthController from "./dao/users/auth-controller.js";

// Configure MongoDB session store
const MongoDBSessionStore = MongoDBStore(session);
const store = new MongoDBSessionStore({
    uri: CONNECTION_STRING,
    collection: "sessions",
});

const app = express()
// Use express-session middleware
app.use(
    session({
        secret: "any string",
        resave: false,
        saveUninitialized: true,
        // store: store,
        // cookie: {
        //     maxAge: 1000 * 60 * 60 * 24, // 1 day
        // },
    })
);

app.use(express.json());
app.use(cors({
        credentials: true,
        origin: "http://localhost:3000",
    }
))
PostController(app)
GeolocationController(app)
UserController(app)
AuthController(app)
app.listen(process.env.PORT || 4000)