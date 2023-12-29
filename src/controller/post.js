import { Sequelize } from "sequelize";
import pool from "../db/conn.js";
import { errorHandler } from "../middleware/middleware.js";

export const createPost = async (req, res) => {
  try {
    const { name, title, images, description, sub_title } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

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
    // res.status(500).json({ error: "Internal server error" });
    errorHandler(err, req, res, next);
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
    // res.status(500).json({ error: "Internal server error" });
    errorHandler(err, req, res, next);
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
    // res.status(500).json({ error: "Internal server error" });
    errorHandler(err, req, res, next);
  }
};

export const getPostByName = async (req, res) => {
  try {
    const name = req.params.name;
    const postQuery = {
      text: "SELECT * FROM post WHERE name = $1",
      values: [name]
    };

    const postResult = await pool.query(postQuery);

    if (postResult.rows.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(postResult.rows[0]);
  } catch (err) {
    // res.status(500).json({ error: "Internal server error" });
    errorHandler(err, req, res, next);
  }
};
