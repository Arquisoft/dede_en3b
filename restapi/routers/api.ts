const express = require('express');
import {check, Schema} from 'express-validator';
import { IUser } from '../model/User';
import { IProduct } from '../model/Products';
import { IOrder } from '../model/Order';
import { IReview } from '../model/Review';
import { Request, Response, Router } from 'express';
const User = require('../model/User');
const Products = require('../model/Products');
const Order = require('../model/Order');
const Review = require('../model/Review');
var mongoose = require('mongoose');
const api: Router = express.Router();

interface User {
    name: string;
    email: string;
}

//This is not a restapi as it mantains state but it is here for
//simplicity. A database should be used instead. This is just to test the workflows.
let users: Array<User> = [];


//The code here answers to the get petition over "users/list", basically shows all the users that are currently stored in the database.
api.get(
    "/users/list",
    async (req: Request, res: Response): Promise<Response> => {
        // return res.status(200).send(users);
        //Await is an asynchronous keyword that forces the system to wait for this call to end. Siempre va con funciones async
        //Find all users.
        const users:IUser[] = await User.find({});
        //We send a 200 "OK" back and we send the users that we found in the database.
        return res.status(200).send(users);
    }
);

//The code here answers to the post petition over "users/add". Adds an user to the database.
//First we check that the data that we received isn't faulty, to avoid errors.
api.post(
  "/users/add",[
    check('name').isLength({ min: 1 }).trim().escape(),
    check('email').isEmail().normalizeEmail(),
  ],
  async (req: Request, res: Response): Promise<Response> => {
    // let name = req.body.name;
    // let email = req.body.email;
    //We create a new User, simple, kinda like java, since we are using mongodb we can have empty fields only needed the required fields
    const user = new User({name: req.body.name,email:req.body.email});
	  console.log(user);
    //We add the user to the database
    await user.save();
    //We answer that its all ok.
    return res.sendStatus(200);
  }
);

/**
 * We get all the products that are currently stored in the database.
 */
api.get(
  "/products/list",
  async (req: Request, res: Response): Promise<Response> => {
    const products:IProduct[] = await Products.find({});
    return res.status(200).send(products);
  }
);

api.get("/products/:id",async (req: Request, res:Response): Promise<Response> => {
    var  id = req.params.id;
    var objID = mongoose.Types.ObjectId(id);
    const products:IProduct = await Products.findOne({_id: objID});
    if(!products) {
      return res.status(404).json({message: 'Product with name "${objID}" not found'});
    }
    return res.status(200).send(products);
});

/**
 * 
 */
api.get("/products/filter/:type", async (req: Request, res:Response): Promise<Response> => {
  let type: string = req.params.type;
  const products:IProduct[] = await Products.find({type:type});
  return res.status(200).send(products);
});
/**
 * OSCAR
 * Response for finding products by name 
 */
api.get("/products/search/:name", async (req: Request, res: Response): Promise<Response> => {
  let name:string = req.params.name;
  const products: IProduct[] = await Products.find({'name': {'$regex': name, '$options': 'i'}});
  return res.status(200).send(products);
});

//Call to add an order to the database
api.post(
  "/orders/add", [
    check('products').isLength({min : 1}),
  ],
  async (req: Request, res: Response): Promise<Response> => {
    console.log(req.body.address);
    //Creting the order
    const order = new Order ({webId:req.body.webId, orderProducts:req.body.products, address:req.body.address, totalPrice:req.body.price, date:req.body.date});
    //Adding the order to the database
    await order.save();
    //We answer that its all ok.
    return res.sendStatus(200);
  }
);

/**
 * Response for finding order for a client
 */
 api.get("/orders/find", async (req: Request, res: Response): Promise<Response> => {
  if(req.query.webId === undefined)
    return res.status(404).json({message: 'WebId is undefined!'});
  let webId = decodeURIComponent(req.query.webId.toString());
  const orders: IOrder[] = await Order.find({
    webId: webId
  });
  return res.status(200).send(orders);
 });

 /**
  * Get the list of reviews of a product
  */
 api.get("/reviews/list/:id", async (req: Request, res: Response) : Promise<Response> => {
    var id = req.params.id;
    var objID = mongoose.Types.ObjectId(id);
    const reviews : IReview[] = await Review.find({productId: objID});
    return res.status(200).send(reviews);
 });

 /**
  * Add a review
  */
 api.post("/reviews/add", async (req: Request, res: Response): Promise<Response> => {
    var id = req.body.productId;
    var productId = mongoose.Types.ObjectId(id);
    const review = new Review({productId: productId, name: req.body.name, rating: req.body.rating, comment: req.body.comment});
    await review.save();
    return res.sendStatus(200);
 });

 api.get("/orders/:id",async (req: Request, res:Response): Promise<Response> => {
  var  id = req.params.id;
  var objID = mongoose.Types.ObjectId(id);
  const order:IOrder = await Order.findOne({_id: objID});
  if(!order) {
    return res.status(404).json({message: 'Order with id "${objID}" not found'});
  }
  return res.status(200).send(order);
});

export default api;
