const mongoose = require("mongoose");
const ObjectID = mongoose.Schema.ObjectID;

export interface IProduct {
    name: string;
    description: string;
    photo: string;
    price: number;
}

const productSchema = new mongoose.Schema({
    name: {type: String, require:true},
    description: String,
    photo: String,
    price: Number
});

module.exports = mongoose.model("Products", productSchema);
export{}; 