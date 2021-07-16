import express from "express"
import cors from "cors"
import createError from "http-errors"
import morgan from "morgan"

import db from "./db/index.js"
import services from "./services/index.js"
import corsOptions from "./config/cors.js"

const port = process.env.PORT || 3001
const server = express()

server.use(cors(corsOptions))

server.use(express.json())
server.use(morgan("dev"))

server.use("/api", services)

db.sequelize
  .sync({ alter: true })
  .then(() => {
    server.listen(port, () => console.log("Server is running on port " + port))
    server.on("error", (error) =>
      console.info(" ❌ Server is not running due to: ", error)
    )
  })
  .catch((e) => console.log(e))
