import { PORT, MONGO } from "./config" // Import settings for server & DB
// Import dev stack
import express from 'express'
import { connect } from 'mongoose'

const app = express()

connect(MONGO, (err) => {
    if(err) throw err
    console.log("DB is connected")
})

app.use(express.urlencoded({extended: false})) // Setting a middleware to work with forms on the website

//Setting a main page
app.get('/', (req, res) => {
    res.send("Server is running")
})

//Run server
app.listen(PORT, () => console.log("Server is running"))