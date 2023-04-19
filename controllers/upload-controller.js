import upload from '../middleware/upload';
import { MongoClient } from 'mongodb';
import { GridFSBucket } from 'mongodb';

const baseUrl = "http://localhost:4000/files/";

const url = 'mongodb+srv://root:smishingsmasher@smishing-smasher.udn2ewp.mongodb.net/';

const mongoClient = new MongoClient(url);

const uploadFiles = async (req, res) => {
  try {
    await upload(req, res);
    console.log(req.files);

    if (req.files.length <= 0) {
      return res
        .status(400)
        .send({ message: "You must select at least 1 file." });
    }

    return res.status(200).send({
      message: "uploaded successfully",
    });
  } catch (error) {
    console.log(error);

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).send({
        message: "Too many files to upload.",
      });
    }
    return res.status(500).send({
      message: `Error when trying upload many files: ${error}`,
    });
  }
};

const getListFiles = async (req, res) => {
  try {
    await mongoClient.connect();

    const database = mongoClient.db('smishing-smasher');
    const images = database.collection('photos' + ".files");
    let fileInfos = [];

    if ((await images.estimatedDocumentCount()) === 0) {
        fileInfos = []
    }

    let cursor = images.find({})
    await cursor.forEach((doc) => {
      fileInfos.push({
        id: doc._id,
        name: doc.filename,
        url: baseUrl + doc.filename,
      });
    });

    return res.status(200).send(fileInfos);
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const download = async (req, res) => {
  try {
    await mongoClient.connect();
    const database = mongoClient.db('smishing-smasher');
    const bucket = new GridFSBucket(database, {
      bucketName: 'photos',
    });

    let downloadStream = bucket.openDownloadStreamByName(req.params.name);

    downloadStream.on("data", function (data) {
      return res.status(200).write(data);
    });

    downloadStream.on("error", function (err) {
      return res.status(404).send({ message: "Cannot download the Image!" });
    });

    downloadStream.on("end", () => {
      return res.end();
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

export default (app) => {
  app.post("/api/upload", uploadFiles);
  app.get("/api/files", getListFiles);
  app.get("/api/files/:name", download);
};