import { computeTotalPrice, stringToAddress} from '../utils/utils'
import {Address, ICartItem} from '../shared/shareddtypes'
const mongoose = require('mongoose')

test('The total price of a shopping cart is calculated correctly.', () => {
    const cart:ICartItem[] = [
        {
            product: {
                _id: mongoose.Types.ObjectId('6227ae61e18344de6a6f927c'),
                name: "Sudadera negra",
                photo: "",
                type: "Sudadera",
                description: "Es negra",
                price: 15
            },
            units: 2
        }, 
        {
            product: {
                _id: mongoose.Types.ObjectId("6227ae62e18344de6a6f927e"),
                name:"Pantalón vaquero",
                description:"vaquero anchote",
                photo:"",
                type:"Pantalon",
                price:75.99
            },
            units: 3
        }
    ];
    var price = 0;
    cart.forEach(item => price += item.product.price * item.units)

    const finalPrice = computeTotalPrice(cart);

    expect(price).toBe(finalPrice);
});

test('The adress is calculated properly', () => {
    const str:string = "Calle, Locality, Region, CodigoPostal, Pais";
    const splitString: string[] = str.split(", ");

    const address:Address = stringToAddress(str);

    expect(splitString[0]).toStrictEqual(address.street_address);
    expect(splitString[1]).toStrictEqual(address.locality);
    expect(splitString[2]).toStrictEqual(address.region);
    expect(splitString[3]).toStrictEqual(address.postal_code);
    expect(splitString[4]).toStrictEqual(address.country_name);
})