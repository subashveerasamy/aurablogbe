import express from "express";
import { createBlog, deleteBlog, getAllBlogs, updateBlog } from "../Controllers/Blogs.controller.js";
import { upload } from "../Middleware/multerMiddleware.js"

const router = express.Router();

router.get("/getblogs", getAllBlogs);
router.put("/update", upload.single("image"), updateBlog);
router.delete("/delete/:id", deleteBlog);

router.post("/upload", upload.single("image"), createBlog);


export default router;