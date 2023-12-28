import express from "express";
import { createPost, getPostById, getPosts } from "../controller/post.js";
const router = express.Router();



router.post("/createPost", createPost);
router.get("/getposts", getPosts);
router.get("/getpost/:post_id", getPostById);

export default router;
