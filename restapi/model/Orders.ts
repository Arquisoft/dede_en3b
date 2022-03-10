import  mongoose, {Document, Types} from 'mongoose';
import {IProduct} from './Products';


export interface IOrder extends Document {
    _id: Types.ObjectId;
    webId: string;
    products: IProduct[];
    address: string;
    totalPrice: number;
}

const orderSchema = new mongoose.Schema({
    webId: String,
    products: {type: Array, default: []},
    address: String,
    totalPrice: Number,
});