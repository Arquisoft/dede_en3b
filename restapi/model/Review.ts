const mongoose = require('mongoose');
import {Types} from 'mongoose';
export interface IReview {
    productId: Types.ObjectId;
    name: string;
    rating: number;
    comment: string;
}

const reviewSchema = new mongoose.Schema({
    productId: Types.ObjectId,
    name: String,
    rating: Number,
    comment: String,
  });

module.exports = mongoose.model("Reviews", reviewSchema);