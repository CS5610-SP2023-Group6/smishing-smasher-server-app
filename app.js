import mongoose from "mongoose";
// TODO: add env variable for connection string
const CONNECTION_STRING = process.env.DB_CONNECTION

mongoose.connect("mongodb+srv://root:smishingsmasher@smishing-smasher.udn2ewp.mongodb.net/smishing-smasher?retryWrites=true&w=majority");


import express from 'express'
// import UserController
//     from "./controllers/users/users-controller.js"
import PostController from "./controllers/posts-controller.js"
import cors from 'cors'
import GeolocationController from "./api/geolocation/geolocation-controller.js";
import UserController from "./controllers/user-controller.js";

const app = express()
app.use(express.json());
app.use(cors())
PostController(app)
GeolocationController(app)
UserController(app)
app.listen(process.env.PORT || 4000)