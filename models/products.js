"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.products = void 0;
const mongoose_1 = require("mongoose");
//Scheme of a new element in DB 
const productsSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    leftItems: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});
exports.products = (0, mongoose_1.model)('products', productsSchema);
