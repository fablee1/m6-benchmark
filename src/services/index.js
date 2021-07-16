import express from "express"
import productsRouter from "./products.js"
import reviewsRouter from "./reviews.js"

const route = express.Router()

route.use("/products", productsRouter)
route.use("/reviews", reviewsRouter)

export default route
