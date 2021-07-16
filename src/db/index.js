import s, { DataTypes } from "sequelize"
const Sequelize = s.Sequelize
const { PGUSER, PGDATABASE, PGPASSWORD, PGHOST } = process.env

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST,
  dialect: "postgres",
})

const models = {
  Product: ProductModel(sequelize, DataTypes),
  sequelize: sequelize,
}
//   Author: Author(sequelize, DataTypes),
//   Blog: Blog(sequelize, DataTypes),
//   Category: Category(sequelize, DataTypes),
//   Comment: Comment(sequelize, DataTypes),

sequelize
  .authenticate()
  .then(() => console.log("Connection established"))
  .catch((e) => console.log(e))

export default models
