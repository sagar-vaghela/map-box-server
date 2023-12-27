import { Sequelize } from "sequelize";
import pool from "../db/conn.js";

export const createUser = (req, res) => {
  try {
    const { author, title, subtitle, description, publishdate, images } =
      req.body;
    pool.query(
      'INSERT INTO users (author, title, subtitle, "description",publishdate,images) VALUES ($1, $2, $3, $4,$5,$6)',
      [author, title, subtitle, description, publishdate, images],
      (error, results) => {
        if (error) {
          console.error("Error inserting data:", error);
          res.status(500).json({ error: "Internal server error" });
        } else {
          res.status(201).json({
            msg: "Data inserted successfully",
            data: results.rows[0]
          });
        }
      }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const getUsers = (req, res) => {
  try {
    pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
      if (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.status(200).json(results.rows);
      }
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const getUserById = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
      if (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.status(200).json(results.rows);
      }
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateUser = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { author, title, subtitle, description, publishdate, images } = req.body;
    pool.query(
      'UPDATE users SET author = $1, title = $2, subtitle = $3, "description" = $4, publishdate = $5, images = $6 WHERE id = $7',
      [author, title, subtitle, description, publishdate, images, id],
      (error, results) => {
        if (error) {
          console.error("Error updating data:", error);
          res.status(500).json({ error: "Internal server error" });
        } else {
          res.status(200).json({
            msg: "Data updated successfully",
            data: results.rows[0]
          });
        }
      }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteUser = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
      if (error) {
        console.error("Error deleting data:", error);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.status(200).json({
          msg: "Data deleted successfully",
          data: results.rows[0]
        });
      }
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserPostsByAuthor = (req, res) => {
  try {
    const author = req.params.author;
    pool.query("SELECT * FROM users WHERE author = $1", [author], (error, results) => {
      if (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.status(200).json(results.rows);
      }
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
  
