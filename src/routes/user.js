import express from 'express';
import {
  createUser,
  getUserById,
  getUserPostsByName,
  getUsers,
} from '../controller/user.js';
const router = express.Router();
router.post('/users', createUser);
router.get('/getusers', getUsers);
router.get('/users/:id', getUserById);
router.get('/getUserPostsByName/:uname', getUserPostsByName);
export default router;
