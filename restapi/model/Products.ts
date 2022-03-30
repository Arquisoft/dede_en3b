import  mongoose, {Document, Types} from 'mongoose';

export interface IProduct {
    _id: Types.ObjectId;
    name: string;
    description?: string;
    photo?: string;
    type?: string;
    price: number;
    __v?: number;
}

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    photo: String,
    type: String,
    price: Number,
  });

module.exports = mongoose.model("Products", productSchema);
