import  mongoose, {Document, Types} from 'mongoose';
import internal from 'stream';
import {IProduct} from './Products';


export interface IOrder extends Document {
    _id: Types.ObjectId;
    webId: string;
    orderProducts: OrderProduct[];
    address: string;
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
    price: number;
}

module.exports = mongoose.model("Orders", orderSchema);