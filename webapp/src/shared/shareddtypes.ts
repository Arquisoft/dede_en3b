import {Types} from 'mongoose'; 
export interface IUser {
  name: string;
  surname?: string;
  email: string;
  age?: number;
};

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

export interface IOrder {
  _id: Types.ObjectId;
  webId: string;
  orderProducts: OrderProduct[];
  address: Address;
  totalPrice: number;
  date: Date
}

export interface IProduct {
  _id: Types.ObjectId;
  name: string;
  description?: string;
  photo?: string;
  type?: string;
  price: number;
  __v?: number;
}