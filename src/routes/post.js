import express from "express";
import {
  createPost,
  getPostById,
  getPostByName,
  getPostByUid,
  getPosts
} from "../controller/post.js";
const router = express.Router();

router.post("/createPost", createPost);
router.get("/getposts", getPosts);
router.get("/getpost/:post_id", getPostById);
router.get("/getPostByName/:name", getPostByName);
router.get("/getPostByUid/:uid", getPostByUid);

export default router;
