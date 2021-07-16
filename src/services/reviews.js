import express from "express"
import Controllers from "../controllers/reviews.js"

const router = express.Router()

router.route("/").get(Controllers.getAll).post(Controllers.postNew)
router
  .route("/:reviewId")
  .get(Controllers.getSingle)
  .delete(Controllers.deleteSingle)
  .put(Controllers.putSingle)

export default router
