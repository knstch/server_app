"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config"); // Import settings for server & DB
// Import dev stack
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const products_1 = require("./models/products");
const cors = require('cors');
const app = (0, express_1.default)();
//Connect to DB
(0, mongoose_1.connect)(config_1.MONGO, (err) => {
    if (err)
        throw err;
    console.log("DB is connected");
});
app.use(express_1.default.urlencoded({ extended: false })); // Setting a middleware to work with forms on the website
app.use(cors()); //Getting rid of cors error
//Creating REST API
app.get('/api/shop-items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getProducts = yield products_1.Products.find();
        if (!getProducts)
            throw new Error("There are no products :(");
        res.status(200).send(getProducts);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}));
//Find items thru input field
app.get('/api/shop-items/find-all/:search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getProducts = yield products_1.Products.find({ "name": { $regex: `${req.params.search}`, $options: "$i" } }, { "name": true, "img": true });
        if (!getProducts)
            throw new Error("There are no products :(");
        res.status(200).send(getProducts);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}));
//Find products in certain category
app.get('/api/shop-items/category/:products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getProducts = yield products_1.Products.find({ "category": `${req.params.products}` });
        if (!getProducts)
            throw new Error("There are no products :(");
        res.status(200).send(getProducts);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}));
//Find products by type
app.get('/api/shop-items/all/:products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.params.products == "pizza") {
            const getProducts = yield products_1.Products.find({ "category": ["spicy pizza", "pepperoni"] });
            res.status(200).send(getProducts);
        }
        else if (req.params.products == "marmelade") {
            const getProducts = yield products_1.Products.find({ "category": ["haribo", "chupa chups", "frutella"] });
            res.status(200).send(getProducts);
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}));
//Find product by _id to render in search output
app.get('/api/shop-items/:_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getProductsById = yield products_1.Products.find({ "_id": req.params._id }, {
            "name": true, "img": true, "price": true, "leftItems": true
        });
        if (!getProductsById)
            throw new Error("There is no selected item :(");
        res.status(200).send(getProductsById);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}));
//Run server
app.listen(config_1.PORT, () => console.log("Server is running"));
