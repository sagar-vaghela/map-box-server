import { Sequelize } from "sequelize";
import pool from "../db/conn.js";

// export const createPost = async (req, res) => {
//   try {
//     const { postid, uid, name } = req.body;

//     if (!uid || !name) {
//       return res.status(400).json({ error: "Missing required parameters" });
//     }

//     // Check if the user with the specified uid exists
//     const userQuery = {
//       text: 'SELECT id FROM users WHERE id = $1',
//       values: [uid],
//     };

//     const userResult = await pool.query(userQuery);

//     if (userResult.rows.length === 0) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // If the user exists, insert the post
//     const postQuery = {
//       text: 'INSERT INTO post (postid, uid, name) VALUES ($1, $2, $3) RETURNING *',
//       values: [postid, uid, name],
//     };

//     const postResult = await pool.query(postQuery);

//     res.status(201).json({
//       msg: "Data inserted successfully",
//       data: postResult.rows[0],
//     });
//   } catch (err) {
//     console.error("Unexpected error:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

export const createPost = async (req, res) => {
  try {
    const { name, title, images, description, sub_title } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    // const userQuery = {
    //   text: "SELECT id FROM users WHERE id = $1",
    //   values: [uid]
    // };

    // const userResult = await pool.query(userQuery);

    // if (userResult.rows.length === 0) {
    //   return res.status(404).json({ error: "User not found" });
    // }

    // const existingPostQuery = {
    //   text: 'SELECT postid FROM post WHERE postid = $1',
    //   values: [postid],
    // };

    // const existingPostResult = await pool.query(existingPostQuery);

    // if (existingPostResult.rows.length > 0) {
    //   return res.status(409).json({ error: "Duplicate postid found" });
    // }

    const postQuery = {
      text: "INSERT INTO post ( name, title, images, description, sub_title) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      values: [name, title, images, description, sub_title]
    };

    const postResult = await pool.query(postQuery);

    res.status(201).json({
      msg: "Data inserted successfully",
      data: postResult.rows[0]
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getPosts = async (req, res) => {
  try {
    const postQuery = {
      text: "SELECT * FROM post ORDER BY post_id ASC"
    };

    const postResult = await pool.query(postQuery);

    res.status(200).json(postResult.rows);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post_id = parseInt(req.params.post_id);
    const postQuery = {
      text: "SELECT * FROM post WHERE post_id = $1",
      values: [post_id]
    };

    const postResult = await pool.query(postQuery);

    if (postResult.rows.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(postResult.rows[0]);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
