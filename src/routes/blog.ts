import express from "express";
import * as authenticate from "../middleware/authentication";
import * as controller from "../controllers/blog.controller";
const router = express.Router();

router.get("/", controller.getBlogs);
router.get("/:blogId", controller.getBlogById);
router.post("/", controller.addBlog);
router.put("/:blogId", controller.editBlog);
router.delete("/:blogId", controller.deleteBlog);

export default router;
