import "@testing-library/jest-dom/extend-expect"
import {Types} from 'mongoose';
import {getProducts,getProduct,findProductsByName,filterProducts,addOrder,findOrdersByUser,getOrder,getReviewsOfProduct, getSolidName, getSolidWebId, getSolidAddress, isLoggedIn, addReview} from '../api/api';
import { IOrder, Review } from "../shared/shareddtypes";

global.fetch = jest.fn();

const testDate = new Date(Date.now());
const mockOrders:IOrder[] = [
    {
        _id: new Types.ObjectId('6227ae61e18344de6a6f927c'),
        webId: "test",
        orderProducts: [{id:"6227ae62e18344de6a6f927e",name:"Pantalon",quantity:2}],
        address: {country_name: "España",locality:"Asturias",postal_code: "11111",region:"test",street_address:"address test"},
        totalPrice: 30,
        date: testDate
    },
    {
        _id: new Types.ObjectId('6227ae61e18344de6a6f927a'),
        webId: "test2",
        orderProducts: [{id:"6227ae62e18344de6a6f924e",name:"Camiseta",quantity:1}],
        address: {country_name: "España",locality:"Asturias",postal_code: "11111",region:"test",street_address:"address test"},
        totalPrice: 30,
        date: new Date(Date.now())
    }
];

test('get products.', async () => {
    const mockProducts = [
        {
            _id: new Types.ObjectId('6227ae61e18344de6a6f927c'),
            name: "pants",
            photo: "",
            type: "",
            description: "description of pants",
            price: 30
        }
    ];
    global.fetch = jest.fn(() => 
        Promise.resolve({
            json: () => Promise.resolve(mockProducts)
        })
    ) as jest.Mock;

    const result = await getProducts();

    expect(result).toBe(mockProducts);
});

test('get a single product.', async () => {
    var mockProducts = [
        {
            _id: new Types.ObjectId('6227ae61e18344de6a6f927c'),
            name: "Sudadera negra",
            photo: "",
            type: "Sudadera",
            description: "Es negra",
            price: 15
        },
        {
            _id: new Types.ObjectId("6227ae62e18344de6a6f927e"),
            name:"Pantalón vaquero",
            description:"vaquero anchote",
            photo:"",
            type:"Pantalon",
            price:75.99
        }
    ];

    const epxectedResult = [{
        _id: new Types.ObjectId('6227ae61e18344de6a6f927c'),
        name: "Sudadera negra",
        photo: "",
        type: "Sudadera",
        description: "Es negra",
        price: 15
    }]

    const id = "6227ae61e18344de6a6f927c"

    const expected = mockProducts.filter( product => product._id.toString() === id);

    global.fetch = jest.fn(() => 
        Promise.resolve({
            json: () => Promise.resolve(expected)
        })
    ) as jest.Mock;

    const result = await getProduct(id);

    expect(result).toStrictEqual(epxectedResult);
});

test('get a product by searching by the name.', async () => {
    const mockProducts = [
        {
            _id: new Types.ObjectId('6227ae61e18344de6a6f927c'),
            name: "Sudadera negra",
            photo: "",
            type: "Sudadera",
            description: "Es negra",
            price: 15
        },
        {
            _id: new Types.ObjectId("6227ae62e18344de6a6f927e"),
            name:"Pantalón vaquero",
            description:"vaquero anchote",
            photo:"",
            type:"Pantalon",
            price:75.99
        }
    ];

    const expected = mockProducts.filter( product => product.name.includes("Pan"));

    const res = [
        {
            _id: new Types.ObjectId("6227ae62e18344de6a6f927e"),
            name:"Pantalón vaquero",
            description:"vaquero anchote",
            photo:"",
            type:"Pantalon",
            price:75.99
        }
    ]

    global.fetch = jest.fn(() => 
        Promise.resolve({
            json: () => Promise.resolve(expected)
        })
    ) as jest.Mock;

    const result = await findProductsByName("pan");

    expect(result).toStrictEqual(res);
});

test('get a product by filtering the type.', async () => {
    const mockProducts = [
        {
            _id: new Types.ObjectId('6227ae61e18344de6a6f927c'),
            name: "Sudadera negra",
            photo: "",
            type: "Sudadera",
            description: "Es negra",
            price: 15
        },
        {
            _id: new Types.ObjectId("6227ae62e18344de6a6f927e"),
            name:"Pantalón vaquero",
            description:"vaquero anchote",
            photo:"",
            type:"Pantalon",
            price:75.99
        }
    ];

    const expected = mockProducts.filter( product => product.type === "Pantalon");

    const res = [
        {
            _id: new Types.ObjectId("6227ae62e18344de6a6f927e"),
            name:"Pantalón vaquero",
            description:"vaquero anchote",
            photo:"",
            type:"Pantalon",
            price:75.99
        }
    ]

    global.fetch = jest.fn(() => 
        Promise.resolve({
            json: () => Promise.resolve(expected)
        })
    ) as jest.Mock;

    const result = await filterProducts("Pantalon");

    expect(result).toStrictEqual(res);
});

test('add an order.', async () => {
    const mockOrder:IOrder[] = [
        {
            _id: new Types.ObjectId('6227ae61e18344de6a6f927c'),
            webId: "test",
            orderProducts: [{id:"6227ae62e18344de6a6f927e",name:"Pantalon",quantity:2}],
            address: {country_name: "España",locality:"Asturias",postal_code: "11111",region:"test",street_address:"address test"},
            totalPrice: 30,
            date: new Date(Date.now())
        }
    ];

    const addedProduct:IOrder = {
        _id: new Types.ObjectId('6227ae61e18344de6a6f927a'),
        webId: "test2",
        orderProducts: [{id:"6227ae62e18344de6a6f924e",name:"Camiseta",quantity:1}],
        address: {country_name: "España",locality:"Asturias",postal_code: "11111",region:"test",street_address:"address test"},
        totalPrice: 30,
        date: new Date(Date.now())
    }

    const expectedLength = mockOrder.push(addedProduct)

    global.fetch = jest.fn(() => 
        Promise.resolve({
            json: () => Promise.resolve()
        })
    ) as jest.Mock;

    await addOrder([{
        product:{
            _id: new Types.ObjectId("6227ae62e18344de6a6f927e"),
            name:"Pantalón vaquero",
            description:"vaquero anchote",
            photo:"",
            type:"Pantalon",
            price:75.99
        }, units:2}],
        "test",
        {country_name: "España",locality:"Asturias",postal_code: "11111",region:"test",street_address:"address test"},
        30,
        new Date(Date.now())
    );

    expect(expectedLength).toBe(mockOrder.length);
});

test('get an order by searching by the webId.', async () => {

    const expectedLength = mockOrders.filter(order => order.webId === "test");

    global.fetch = jest.fn(() => 
        Promise.resolve({
            json: () => Promise.resolve(expectedLength)
        })
    ) as jest.Mock;

    const result = await findOrdersByUser("test")

    expect(result).toStrictEqual([{
        _id: new Types.ObjectId('6227ae61e18344de6a6f927c'),
        webId: "test",
        orderProducts: [{id:"6227ae62e18344de6a6f927e",name:"Pantalon",quantity:2}],
        address: {country_name: "España",locality:"Asturias",postal_code: "11111",region:"test",street_address:"address test"},
        totalPrice: 30,
        date: testDate
    }]);
});

test('get an order by searching by the id.', async () => {
    const expectedLength = mockOrders.filter(order => order._id.toString() === "6227ae61e18344de6a6f927c");

    global.fetch = jest.fn(() => 
        Promise.resolve({
            json: () => Promise.resolve(expectedLength)
        })
    ) as jest.Mock;

    const result = await getOrder("6227ae61e18344de6a6f927c")

    expect(result).toStrictEqual([{
        _id: new Types.ObjectId('6227ae61e18344de6a6f927c'),
        webId: "test",
        orderProducts: [{id:"6227ae62e18344de6a6f927e",name:"Pantalon",quantity:2}],
        address: {country_name: "España",locality:"Asturias",postal_code: "11111",region:"test",street_address:"address test"},
        totalPrice: 30,
        date: testDate
    }]);
});

test('Get the name of the user.', async () => {

    global.fetch = jest.fn(() => 
        Promise.resolve({
            json: () => Promise.resolve("Jesus")
        })
    ) as jest.Mock;

    const result = await getSolidName()

    expect(result).toStrictEqual("Jesus");
});

test('Get the webId of the user.', async () => {

    global.fetch = jest.fn(() => 
        Promise.resolve({
            json: () => Promise.resolve({webId: "webId"})
        })
    ) as jest.Mock;

    const result = await getSolidWebId()

    expect(result).toStrictEqual("webId");
});

test('Get the address of the user.', async () => {

    global.fetch = jest.fn(() => 
        Promise.resolve({
            json: () => Promise.resolve({country_name: "España",locality:"Asturias",postal_code: "11111",region:"test",street_address:"address test"})
        })
    ) as jest.Mock;

    const result = await getSolidAddress()

    expect(result).toStrictEqual({country_name: "España",locality:"Asturias",postal_code: "11111",region:"test",street_address:"address test"});
});

test('Do solid loggin.', async () => {

    global.fetch = jest.fn(() => 
        Promise.resolve({
            json: () => Promise.resolve({
                isLoggedIn: true 
            })
        })
    ) as jest.Mock;

    const result = await isLoggedIn()

    expect(result).toStrictEqual({isLoggedIn:true})
});

test('Get reviews of a product.', async () => {

    const reviews:Review[] = [
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
        },
    ]

    const expected = reviews.filter(review => review.productId.toString() === "6227ae61e18344de6a6f927c")

    global.fetch = jest.fn(() => 
        Promise.resolve({
            json: () => Promise.resolve(expected)
        })
    ) as jest.Mock;

    const result = await getReviewsOfProduct("6227ae61e18344de6a6f927c")

    expect(result).toStrictEqual([reviews[0]])
});

test('Add a review to a product', async() => {

    global.fetch = jest.fn(() => 
        Promise.resolve(true)
    ) as jest.Mock;
    const res = await addReview("str","str",0,"str");
    expect(res).toBeTruthy
})
