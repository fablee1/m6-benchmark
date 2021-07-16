const CategoryModel = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "categories",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      category: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
    },
    { timestamps: false }
  )
  return Category
}

export default CategoryModel
