import { PORT, MONGO } from "./config" // Import settings for server & DB
// Import dev stack
import express from 'express'
import { connect } from 'mongoose'
import { Products } from './models/products'
const cors = require('cors')

const app = express()

//Connect to DB
connect(MONGO, (err) => {
    if (err) throw err
    console.log("DB is connected")
})

app.use(express.urlencoded({ extended: false })) // Setting a middleware to work with forms on the website
app.use(cors()) //Getting rid of cors error

//Creating REST API
app.get('/api/shop-items', async (req, res) => {
    try {
        const getProducts = await Products.find()
        if (!getProducts) throw new Error("There are no products :(")
        res.status(200).send(getProducts)
    } catch (err) {
        console.error(err)
        res.status(500).send(err)
    }
})

//Find items thru input field
app.get('/api/shop-items/find-all/:search', async (req, res) => {
    try {
        const getProducts = await Products.find({ "name": { $regex: `${req.params.search}`, $options: "$i" } }, { "name": true, "img": true })
        if (!getProducts) throw new Error("There are no products :(")
        res.status(200).send(getProducts)
    } catch (err) {
        console.error(err)
        res.status(500).send(err)
    }
})

//Find products in certain category
app.get('/api/shop-items/category/:products', async (req, res) => {
    try {
        const getProducts = await Products.find({ "category": `${req.params.products}` })
        if (!getProducts) throw new Error("There are no products :(")
        res.status(200).send(getProducts)
    } catch (err) {
        console.error(err)
        res.status(500).send(err)
    }
})

//Find products by type
app.get('/api/shop-items/all/:products', async (req, res) => {
    try {
        if (req.params.products == "pizza") {
            const getProducts = await Products.find({ "category": ["spicy pizza", "pepperoni"]});
            res.status(200).send(getProducts);
        } else if (req.params.products == "marmelade") {
            const getProducts = await Products.find({ "category": ["haribo", "chupa chups", "frutella"]});
            res.status(200).send(getProducts);
        }
    } catch (err) {
        console.error(err)
        res.status(500).send(err)
    }
})

//Find product by _id to render in search output
app.get('/api/shop-items/:_id', async (req, res) => {
    try {
        const getProductsById = await Products.find({ "_id": req.params._id },
            {
                "name": true, "img": true, "price": true, "leftItems": true
            })
        if (!getProductsById) throw new Error("There is no selected item :(")
        res.status(200).send(getProductsById)
    } catch (err) {
        console.error(err)
        res.status(500).send(err)
    }
})

//Run server
app.listen(PORT, () => console.log("Server is running"))