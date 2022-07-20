"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products = void 0;
const mongoose_1 = require("mongoose");
//Scheme of a new element in DB 
const productsSchema = new mongoose_1.Schema({
    img: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    leftItems: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});
exports.Products = (0, mongoose_1.model)('products', productsSchema);
