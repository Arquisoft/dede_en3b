import  mongoose, {Document, Types} from 'mongoose';

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
        country:String,
        locality:String,
        postal_code:String,
        region:String,
        street:String,
    },
    totalPrice: Number,
    date: Date
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