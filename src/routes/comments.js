import express from "express";
import {
  createComments,
  getComments,
  getCommentsById,
  getCommentsByPostId,
  getPostsWithCommentCount,
} from "../controller/comments.js";
const router = express.Router();

router.post("/createComments", createComments);
router.get("/getComments", getComments);
router.get("/getCommentsById/:comments_id", getCommentsById);
router.get("/getCommentsByPostId/:pid", getCommentsByPostId);
router.get("/getPostsWithCommentCount", getPostsWithCommentCount);

export default router;
