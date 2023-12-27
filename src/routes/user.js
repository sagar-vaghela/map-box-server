import express from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUserPostsByAuthor,
  getUsers,
  updateUser
} from "../controller/user.js";
const router = express.Router();
router.post("/createUser", createUser);
router.get("/getusers", getUsers);
router.get("/getuser/:id", getUserById);
router.put("/updateuser/:id", updateUser);
router.delete("/deleteuser/:id", deleteUser);
router.get("/author/:author", getUserPostsByAuthor);
export default router;
