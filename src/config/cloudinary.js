import { v2 as cloudinary } from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import multer from "multer"

const mediaStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "m6-benchmark/products/",
  },
})

export const mediaCloudinary = multer({ storage: mediaStorage }).single("cover")
