
import express, { Request, Response, Router } from 'express';
import {check, Schema} from 'express-validator';
import { IUser } from './model/User';
import { IProduct } from './model/Products';
const User = require('../restapi/model/User');
const Products = require('../restapi/model/Products');
const api:Router = express.Router();

// app.use(function(req,res,next){
//     res.header("Access-Control-Allow-Origin","*");
//     res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });


// interface User {
//     name: string;
//     email: string;
// }

// //This is not a restapi as it mantains state but it is here for
// //simplicity. A database should be used instead.
// let users: Array<User> = [];


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
    console.log(id);
    const products:IProduct = await Products.findOne({name:id});
    if(!products) {
      return res.status(404).json({message: 'Product with name "${name}" not found'});
    }
    return res.status(200).send(products);
});

export default api;