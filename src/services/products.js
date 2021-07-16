import express from "express"
import { mediaCloudinary } from "../config/cloudinary.js"
import Controllers from "../controllers/products.js"
const router = express.Router()

router.route("/").get(Controllers.getAll).post(Controllers.postNew)
router
  .route("/:productId")
  .get(Controllers.getSingle)
  .delete(Controllers.deleteSingle)
  .put(Controllers.putSingle)
router.route("/:productId/upload").post(mediaCloudinary, Controllers.addImage)
router.route("/:productId/reviews").get(Controllers.getProductWithReviews)

export default router
