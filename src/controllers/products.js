import models from "../db/index.js"

const Product = models.Product
const Review = models.Review
const Category = models.Category

const getAllProducts = async (req, res, next) => {
  try {
    const page = req.query.page - 1 || 0
    const limit = 10

    const products = await Product.findAll({
      limit: limit,
      offset: page * limit,
      where: req.query.category ? { "$category.category$": req.query.category } : {},
      include: [{ model: Category }],
    })
    res.send(products)
  } catch (error) {
    next(error)
  }
}

const postProduct = async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    res.send(newProduct)
  } catch (error) {
    next(error)
  }
}

const getSingle = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    res.send(product)
  } catch (error) {
    next(error)
  }
}

const putSingle = async (req, res, next) => {
  try {
    const product = await Product.update(req.body, {
      where: { id: req.params.productId },
      returning: true,
    })
    if (product[0] === 1) {
      res.status(200).send(product[1])
    } else {
      res.send(404)
    }
  } catch (error) {
    next(error)
  }
}

const deleteSingle = async (req, res, next) => {
  try {
    await Product.destroy({ where: { id: req.params.productId } })
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
}

const addImage = async (req, res, next) => {
  try {
    let imageUrl
    if (req.body.imageUrl) {
      imageUrl = req.body.imageUrl
    } else {
      imageUrl = req.file.path
    }
    const product = await Product.update(
      { imageUrl: imageUrl },
      {
        where: { id: req.params.productId },
        returning: true,
      }
    )
    if (product[0] === 1) {
      res.status(200).send(product[1])
    } else {
      res.send(404)
    }
  } catch (error) {
    next(error)
  }
}

const getProductWithReviews = async (req, res, next) => {
  try {
    const productWithReviews = await Product.findByPk(req.params.productId, {
      include: [{ model: Review }],
    })
    res.send(productWithReviews)
  } catch (error) {
    next(error)
  }
}

const Controllers = {
  getAll: getAllProducts,
  postNew: postProduct,
  getSingle,
  putSingle,
  deleteSingle,
  addImage,
  getProductWithReviews,
}

export default Controllers
