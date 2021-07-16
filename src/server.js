import express from "express"
import cors from "cors"
import createError from "http-errors"
import morgan from "morgan"

const port = process.env.PORT || 3001
const server = express()

const whitelist = [process.env.FRONTEND_URL, process.env.FRONTEND_PROD_URL]

server.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error("Not allowed by cors!"))
      }
    },
  })
)

server.use(express.json())
server.use(morgan("dev"))

db.sequelize
  .sync({ alter: true })
  .then(() => {
    app.listen(port, () => console.log("Server is running on port " + port))
    app.on("error", (error) => console.info(" ❌ Server is not running due to: ", error))
  })
  .catch((e) => console.log(e))
