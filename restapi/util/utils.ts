import {OrderProduct} from '../model/Order';

function computeTotalPrice(ps :OrderProduct[]): number{
    var totalPrice: number = 0;
    ps.forEach(function (p){
        totalPrice += p.price * p.quantity;
    })
    return totalPrice;
}