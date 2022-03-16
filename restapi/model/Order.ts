import  mongoose, {Document, Types} from 'mongoose';
import internal from 'stream';
import {IProduct} from './Products';


export interface IOrder extends Document {
    _id: Types.ObjectId;
    webId: string;
    orderProducts: OrderProduct[];
    address: Address;
    totalPrice: number;
}

const orderSchema = new mongoose.Schema({
    webId: String,
    orderProducts: {type: Array, default: []},
    address: String,
    totalPrice: Number,
});

export interface OrderProduct{
    id: String;
    quantity: number;
}

export type Address = {
    country:string;
    locality:string;
    postal_code:string;
    region:string;
    street:string;
  }  

module.exports = mongoose.model("Orders", orderSchema);