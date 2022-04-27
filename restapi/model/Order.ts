const mongoose = require('mongoose');
import {Document, Types} from 'mongoose';

export interface IOrder extends Document {
    _id: Types.ObjectId;
    webId: string;
    orderProducts: OrderProduct[];
    address: Address;
    totalPrice: number;
    date: Date
}

const orderSchema = new mongoose.Schema({
    webId: String,
    orderProducts: {type: Array, default: []},
    address: {
        country_name:String,
        locality:String,
        postal_code:String,
        region:String,
        street_address:String,
    },
    totalPrice: Number,
    date: Date
});

export interface OrderProduct{
    id: string;
    quantity: number;
}

export type Address = {
    country_name:string;
    locality:string;
    postal_code:string;
    region:string;
    street_address:string;
}  


module.exports = mongoose.model("Orders", orderSchema);