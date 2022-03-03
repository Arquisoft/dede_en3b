import express, { Request, Response, Router } from 'express';
import {check, Schema} from 'express-validator';
import { IUser } from './model/User';
const User = require('../restapi/model/User');
const api:Router = express.Router()

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

export default api;