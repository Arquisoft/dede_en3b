import { Address, ICartItem } from '../shared/shareddtypes';
 
export function computeTotalPrice(cart: ICartItem[]) {

    var totalPrice = 0;
    cart.forEach(
        i => totalPrice += i.product.price * i.units
    )
    
    return totalPrice;
}

export function stringToAddress(a:String) : Address {

    var fields : string[] = a.split(", ");
    
    return {
        street_address: fields[0],
        locality: fields[1],
        region: fields[2],
        postal_code: fields[3],
        country_name: fields[4]
    }
}