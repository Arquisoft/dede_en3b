import { ICartItem } from '../shared/shareddtypes';
 
export function computeTotalPrice(cart: ICartItem[]) {

    var totalPrice = 0;
    cart.forEach(
        i => totalPrice += i.product.price * i.units
    )
    
    return totalPrice;
}