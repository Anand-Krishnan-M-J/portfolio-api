import express from "express";
import * as authenticate from "../middleware/authentication";
import * as controller from "../controllers/blog.controller";
const router = express.Router();

router.get("/", controller.getBlogs);
router.get("/:blogId", controller.getBlogById);
router.post("/", authenticate.authenticateJWT, controller.addBlog);
router.put("/:blogId", authenticate.authenticateJWT, controller.editBlog);
router.delete("/:blogId", authenticate.authenticateJWT, controller.deleteBlog);

export default router;
