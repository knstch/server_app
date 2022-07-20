import { Schema, model } from "mongoose"

//Scheme of a new element in DB 
const productsSchema = new Schema({
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
})

export const Products = model('products', productsSchema)