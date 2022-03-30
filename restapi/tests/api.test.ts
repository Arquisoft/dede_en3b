import request, {Response} from 'supertest';
import express, { Application } from 'express';
const server = require("./test.server");
import bp from 'body-parser';
import cors from 'cors';
import api from '../api';
import { IProduct } from '../model/Products';
import {Types} from 'mongoose';

let app:Application;

beforeAll(async () => {
    // app = express();
    // const port: number = 5000;
    // const options: cors.CorsOptions = {
    //     origin: ['http://localhost:3000']
    // };
    // app.use(cors(options));
    // app.use(bp.json());
    // app.use("/api", api)

    // server = app.listen(port, ():void => {
    //     console.log('Restapi server for testing listening on '+ port);
    // }).on("error",(error:Error)=>{
    //     console.error('Error occured: ' + error.message);
    // });
    await server.startDB();
    app = await server.startServer();
    server.addProducts();
});

afterAll(async () => {
    await server.closeServer(); //close the server
    await server.closeDB();
})

describe('user ', () => {
    /**
     * Test that we can list users without any error.
     */
    it('can be listed',async () => {
        const response:Response = await request(app).get("/api/users/list");
        expect(response.statusCode).toBe(200);
    });

    /**
     * Tests that a user can be created through the productService without throwing any errors.
     */
    it('can be created correctly', async () => {
        let username:string = 'Pablo'
        let email:string = 'gonzalezgpablo@uniovi.es'
        const response:Response = await request(app).post('/api/users/add').send({name: username,email: email}).set('Accept', 'application/json')
        expect(response.statusCode).toBe(200);
    });
});

describe('product', () => {
    /**
     * Test that we can list products without any error.
     */
    it('All the products available are listed', async () => {
        const response: Response = await request(app).get("/api/products/list");
        const products:IProduct[] = response.body;
        //We get an OK
        expect(response.statusCode).toBe(200);
        products.forEach(product => {
            //We change the id to an object id
            product._id = new Types.ObjectId(product._id);
            
        });
        for(var i = 0; i<products.length ; i++){
            //We check that the products are the ones in the database.
            expect(products[i]).toStrictEqual(server.prods[i]);
        }
        
    });

    /**
     * Test that we can get a product based on its id.
     */
    it('A product to be listed', async() => {
        let toBeFound:IProduct = server.prods[1];
        //The response is good.
        const response:Response = await request(app).get('/api/products/' + toBeFound._id.toString());
        expect(response.statusCode).toBe(200);
        //We make the product._id be a ObjectID to ensure equality.
        let prod:IProduct = response.body;
        prod._id = new Types.ObjectId(prod._id);
        //The object is the one that we were looking for.
        expect(prod).toStrictEqual(toBeFound);
    });

    it('A product that doesnt exist', async() => {
        let id:string = "aaaaaaaaaaaaaaaaaaaaaaaa";
        //We search for the product
        const response:Response = await request(app).get('/api/products/' + id);
        expect(response.statusCode).toBe(404);
    });
});