import {Schema, Model} from "mongoose";
const mongoose = require('mongoose');

export interface IUser {
    name: string;
    surname?: string;
    email: string;
    age?: number;
};

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    surname: String,
    email: {type: String, required: true},
    age: Number
});

module.exports = mongoose.model('User', userSchema);
