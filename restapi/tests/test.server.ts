import { IProduct } from "../model/Products";

const {MongoMemoryServer} = require('mongodb-memory-server');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
import {Types} from 'mongoose';
import api from '../routers/api';
const productSchema = require('../model/Products');

export const prods:IProduct[] = [
    {
        "_id": new Types.ObjectId("6227ae61e18344de6a6f9278"),
        "name": "Pantalón de chandal",
        "description":"Pantalones de chandal para hacer deporte",
        "photo":"pantalon_chandal.png",
        "type":"Pantalon",
        "price":20.55,
        "__v":0
    }
    ,{
        "_id":new Types.ObjectId("6227ae61e18344de6a6f927a"),
        "name":"Camiseta de basket",
        "description":"Tremenda camisteta pa jugar al basket con los panas",
        "photo":"camiseta_basket.png",
        "type":"Camiseta",
        "price":18.5,
        "__v":0
    }
    ,{
        "_id": new Types.ObjectId("6227ae61e18344de6a6f927c"),
        "name":"Sudadera negra",
        "description":"Es negra",
        "photo":"sudadera_negra.png",
        "type":"Sudadera",
        "price":15,
        "__v":0
    }
    ,{
        "_id": new Types.ObjectId("6227ae62e18344de6a6f927e"),
        "name":"Pantalón vaquero",
        "description":"Pantalones de vaquero anchote",
        "photo":"pantalones_anchos.png",
        "type":"Pantalon",
        "price":75.99,
        "__v":0
    }
]; 


let mongo: { start: () => any; getUri: () => any; stop: () => any; }, server: { close: () => any; };

module.exports.startDB = async() => {
    mongo = new MongoMemoryServer({instance: {port:27017,dbName:"Db4Test"}});
    await mongo.start();
    const uri = mongo.getUri();
    console.log("Connected on :" + uri);
};

module.exports.startServer = async() => {

    console.log("Database starting");
    await mongoose.connect("mongodb://127.0.0.1:27017/Db4Test?", {useNewUrlParser: true, useUnifiedTopology: true});

    console.log("Connefction successful");
    const app = express();
    app.use(cors());
    app.options("*",cors());
    app.use(express.json());
    app.use("/api",api);

    server = await app.listen(5000);
    console.log("Server has been started");

    return app;
};

module.exports.closeServer = async() => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await server.close();
    console.log("Server closed");
};

module.exports.closeDB = async() => {
    await mongo.stop();
}

module.exports.addProducts = async() => {
    //Perhaps check if the collection exists.
    productSchema.createCollection();
    productSchema.insertMany(prods);
}
