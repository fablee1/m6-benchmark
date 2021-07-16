import s from "sequelize"

import ProductModel from "./models/product.js"
import ReviewModel from "./models/review.js"

const Sequelize = s.Sequelize
const { DataTypes } = s
const { PGUSER, PGDATABASE, PGPASSWORD, PGHOST } = process.env

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST,
  dialect: "postgres",
})

const models = {
  Product: ProductModel(sequelize, DataTypes),
  Review: ReviewModel(sequelize, DataTypes),
  sequelize: sequelize,
}

models.Review.belongsTo(models.Product)
models.Product.hasMany(models.Review)

sequelize
  .authenticate()
  .then(() => console.log("Connection established"))
  .catch((e) => console.log(e))

export default models
