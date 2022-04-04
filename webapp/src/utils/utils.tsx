import { ICartItem } from '../components/ICartItem';
 
export function computeTotalPrice(cart: ICartItem[]) {

    var totalPrice = 0;
    cart.forEach(
        i => totalPrice += i.product.price * i.units
    )
    
    return totalPrice;
}