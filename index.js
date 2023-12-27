import express from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUserPostsByAuthor,
  getUsers,
  updateUser
} from "./src/routes/user.js";
const app = express();
import dotenv from "dotenv"; 
dotenv.config();
app.use(express.json());

const port = 8000;

app.post("/user", createUser);
app.get("/getusers", getUsers);
app.get("/getuser/:id", getUserById);
app.put("/updateuser/:id", updateUser);
app.delete("/deleteuser/:id", deleteUser);
app.get("/author/:author", getUserPostsByAuthor);

app.listen(port, () => console.log(`Server running on port ${port}`));
