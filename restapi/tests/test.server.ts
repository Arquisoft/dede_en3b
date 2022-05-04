import { IProduct } from "../model/Products";

const {MongoMemoryServer} = require('mongodb-memory-server');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
import {Types} from 'mongoose';
import api from '../routers/api';
import { IOrder } from "../model/Order";
import {IReview} from "../model/Review";
const productSchema = require('../model/Products');
const orderSchema = require('../model/Order')
const reviewSchema = require('../model/Review')

export const reviews:IReview[] = [
    {
        productId: new Types.ObjectId('6227ae61e18344de6a6f927c'),
        name: "Name",
        rating: 3,
        comment: "Coment"
    },
    {
        productId: new Types.ObjectId("6227ae62e18344de6a6f927e"),
        name: "Name",
        rating: 4,
        comment: "Coment"
    }
]

export const orders:IOrder[] = [
    {
        _id: new Types.ObjectId("624db9dfc3d4d99c47803bb3"),
        webId: "webId",
        orderProducts: [
            {
                id:"id",
                name:"nombre",
                quantity:2
            }
        ],
        address: {
            country_name:"Pais",
            locality: "Localidad",
            postal_code: "Codigo Postal",
            region: "Region",
            street_address: "Calle"
        },
        totalPrice: 40,
        date: new Date(Date.now())
    },
    {
        _id: new Types.ObjectId("6227ae61e18344de6a6f9274"),
        webId: "otherwebid",
        orderProducts: [
            {
                id:"id2",
                name:"otronombre",
                quantity:1
            }
        ],
        address: {
            country_name:"Pais2",
            locality: "Localidad2",
            postal_code: "Codigo Postal2",
            region: "Region2",
            street_address: "Calle2"
        },
        totalPrice: 12,
        date: new Date(Date.now())
    }
]

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

module.exports.addOrders = async() => {
    orderSchema.createCollection();
    orderSchema.insertMany(orders);
}

module.exports.addReviews = async() => {
    reviewSchema.createCollection();
    reviewSchema.insertMany(reviews);
}
