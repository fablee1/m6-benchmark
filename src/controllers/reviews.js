import models from "../db/index.js"

const Review = models.Review

const getAllReviews = async (req, res, next) => {
  try {
    const review = await Review.findAll()
    res.send(review)
  } catch (error) {
    next(error)
  }
}

const postReview = async (req, res, next) => {
  try {
    const newReview = await Review.create(req.body)
    res.send(newReview)
  } catch (error) {
    next(error)
  }
}

const getSingle = async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.reviewId)
    res.send(review)
  } catch (error) {
    next(error)
  }
}

const putSingle = async (req, res, next) => {
  try {
    const review = await Review.update(req.body, {
      where: { id: req.params.reviewId },
      returning: true,
    })
    if (review[0] === 1) {
      res.status(200).send(review[1])
    } else {
      res.send(404)
    }
  } catch (error) {
    next(error)
  }
}

const deleteSingle = async (req, res, next) => {
  try {
    await Review.destroy({ where: { id: req.params.reviewId } })
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
}

const Controllers = {
  getAll: getAllReviews,
  postNew: postReview,
  getSingle,
  putSingle,
  deleteSingle,
}

export default Controllers
