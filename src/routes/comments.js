import express from "express";
import {
  createComments,
  getComments,
  getCommentsById,
  getCommentsByPostId,
  getUserData
} from "../controller/comments.js";
const router = express.Router();

router.post("/createComments", createComments);
router.get("/getComments", getComments);
router.get("/getCommentsById/:comments_id", getCommentsById);
router.get("/getUserData/:uid", getUserData);
router.get("/getCommentsByPostId/:pid", getCommentsByPostId);

export default router;
