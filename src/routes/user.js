import { Sequelize } from "sequelize";
import pool from "../db/conn.js";

export const createUser = (req, res) => {
  const { author, title, subtitle, description, publishdate, images } =
    req.body;
  pool.query(
    // "INSERT INTO users (author, post, subtitle, description) VALUES ($1, $2, $3,$4)",
    'INSERT INTO users (author, title, subtitle, "description",publishdate,images) VALUES ($1, $2, $3, $4,$5,$6)',
    [author, title, subtitle, description, publishdate, images],
    (error, results) => {
      if (error) {
        console.log("error :>> ", error);
        throw error;
      }
      res.status(201).json({
        msg: "data inserted successfully",
        data: results.rows[0]
      });
    }
  );
};

export const getUsers = (req, res) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

export const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

export const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { author, title, subtitle, description, publishdate, images } =
    req.body;
  pool.query(
    // "UPDATE users SET author = $1, post = $2, subtitle = $3, description = $4 WHERE id = $5",
    'UPDATE users SET author = $1, title = $2, subtitle = $3, "description" = $4,publishdate = $5,images = $6 WHERE id = $7',
    [author, title, subtitle, description, publishdate, images, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json({
        msg: "data updated successfully",
        data: results.rows[0]
      });
    }
  );
};

export const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json({
      msg: "data deleted successfully",
      data: results.rows[0]
    });
  });
};

export const getUserPostsByAuthor = (req, res) => {
    const author = req.params.author; 
    pool.query("SELECT * FROM users WHERE author = $1", [author], (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    });
  };
  
