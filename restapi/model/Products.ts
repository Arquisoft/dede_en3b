import  mongoose, {Schema, Types} from 'mongoose';

export type IProduct = {
    // id: Types.ObjectId;
    name: string;
    description?: string;
    photo?: string;
    price?: number;
}

const productSchema = new Schema<IProduct>({
    name: {type: String, require:true},
    description: String,
    photo: String,
    price: Number
});

module.exports = mongoose.model("Products", productSchema);
