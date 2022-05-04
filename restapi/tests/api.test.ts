import request, {Response} from 'supertest';
import express, { Application } from 'express';
const server = require("./test.server");
import bp from 'body-parser';
import cors from 'cors';
import api from '../routers/api';
import { IProduct } from '../model/Products';
import {Types} from 'mongoose';
import { IOrder } from '../model/Order';
import { IReview } from '../model/Review';

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
    server.addOrders();
    server.addReviews();
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
        expect(products.length).toBe(server.prods.length);
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

    it('Filter the products with a correct filter',async()=> {
        let filter:string = "Pantalon";
        let filteredList:IProduct[] = [server.prods[0],server.prods[3]];
        const response: Response = await request(app).get('/api/products/filter/' + filter);
        const products:IProduct[] = response.body;
        //We get an OK
        expect(response.statusCode).toBe(200);
        products.forEach(product => {
            //We change the id to an object id
            product._id = new Types.ObjectId(product._id);
        });
        expect(products.length).toBe(filteredList.length);
        for(var i = 0; i<products.length ; i++){
            //We check that the products are the ones in the database.
            expect(products[i]).toStrictEqual(filteredList[i]);
        }
    });

    it('Search for a product by a string', async() => {
        let search:string = "pan";
        let filteredList:IProduct[] = [server.prods[0],server.prods[3]];
        const response: Response = await request(app).get('/api/products/search/' + search);
        const products:IProduct[] = response.body;
        //We get an OK
        expect(response.statusCode).toBe(200);
        products.forEach(product => {
            //We change the id to an object id
            product._id = new Types.ObjectId(product._id);
        });
        expect(products.length).toBe(filteredList.length);
        for(var i = 0; i<products.length ; i++){
            //We check that the products are the ones in the database.
            expect(products[i]).toStrictEqual(filteredList[i]);
        }
    });

    it('Search for a product by a string that no product has', async() => {
        let search:string = "fadhsjfkadsfhdjksafhasd";
        const response: Response = await request(app).get('/api/products/search/' + search);
        const products:IProduct[] = response.body;
        //We get an OK
        expect(response.statusCode).toBe(200);
        expect(products.length).toBe(0);
    });
});

describe('order', () => {
    it('We can add an order to the database', async() => {
        let order:IOrder = {
            _id: new Types.ObjectId(),
            webId: "Testwebid",
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
        }
        const response:Response = await request(app).post("/api/orders/add").send({webId: order.webId, products:order.orderProducts, address: order.address, totalPrice: order.totalPrice, date: order.date}).set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
    })

    it('We can find the orders for a given user with a valid webId.', async() => {
        var str: string = "/orders/find?webId=" + encodeURIComponent("webId");
        let filteredList:IOrder[] = [server.orders[0]];
        const response: Response = await request(app).get('/api' + str);
        const orders:IOrder[] = response.body;
        expect(response.statusCode).toBe(200);
        orders.forEach(order => {
            //We change the id to an object id
            order._id = new Types.ObjectId(order._id);
        });
        expect(orders.length).toBe(filteredList.length);
        for(var i = 0; i<orders.length ; i++){
            //We check that the products are the ones in the database.
            expect(orders[i]._id).toStrictEqual(filteredList[i]._id);
        }
    });

    it('We get a 404 error when the webId is undefined.', async() => {
        var str: string = "/orders/find";
        const response: Response = await request(app).get('/api' + str);
        expect(response.statusCode).toBe(404);
    })

    it('We can find an order by looking for their id.', async() => {
        let toBeFound:IOrder = server.orders[1];
        //The response is good.
        const response:Response = await request(app).get('/api/orders/' + toBeFound._id.toString());
        expect(response.statusCode).toBe(200);
        //We make the product._id be a ObjectID to ensure equality.
        let order:IOrder = response.body;
        order._id = new Types.ObjectId(order._id);
        //The object is the one that we were looking for.
        expect(order._id).toStrictEqual(toBeFound._id);
    });

    it('We try to find an order, but that order doesnt exist.', async() => {
        let id:string = "aaaaaaaaaaaaaaaaaaaaaaaa";
        //We search for the order
        const response:Response = await request(app).get('/api/orders/' + id);
        expect(response.statusCode).toBe(404);
    });
        
})

describe('Reviews', () => {

    it('We search for the reviews of a certain product.', async ()=> {
        const toBeFound:IReview[] = [server.reviews[1]]
        const response:Response = await request(app).get('/api/reviews/list/' + toBeFound[0].productId.toString());
        expect(response.statusCode).toBe(200);
        let review:IReview[] = response.body;
        expect(review.length).toBe(toBeFound.length)
        for(var i = 0; i<review.length ; i++){
            //We check that the products are the ones in the database.
            expect(review[i].productId.toString()).toStrictEqual(toBeFound[i].productId.toString());
            expect(review[i].name).toStrictEqual(toBeFound[i].name);
            expect(review[i].comment).toStrictEqual(toBeFound[i].comment);
            expect(review[i].rating).toStrictEqual(toBeFound[i].rating);
            
        }
    })

    it('We save a review',async () => {
        let review:IReview = {
            productId: new Types.ObjectId('6227ae61e18344de6a6f927c'),
            name: "Name3",
            rating: 3,
            comment: "Coment"
        }
        const response:Response = await request(app).post("/api/reviews/add").send({productId: review.productId, name:review.name, rating:review.rating, comment:review.comment}).set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
    })
})
