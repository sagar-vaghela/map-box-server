import { Sequelize } from "sequelize";
import pool from "../db/conn.js";
import { errorHandler } from "../middleware/middleware.js";

export const createUser = (req, res, next) => {
  try {
    const { uname,image } = req.body;
    if (!uname || !image) {
      return res.status(400).json({ error: "Missing required parameters" });
    }
    pool.query(
      "INSERT INTO users (uname,image) VALUES ($1,$2)",
      [uname,image],
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
    // res.status(500).json({ error: "Internal server error" });
    errorHandler(err, req, res, next);
  }
};

export const getUsers = (req, res, next) => {
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
    // res.status(500).json({ error: "Internal server error" });
    errorHandler(err, req, res, next);
  }
};

export const getUserById = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
      if (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.status(200).json(results.rows[0]);
      }
    });
  } catch (err) {
    // res.status(500).json({ error: "Internal server error" });
    errorHandler(err, req, res, next);
  }
};

export const getUserPostsByName = (req, res, next) => {
  try {
    const uname = req.params.uname;
    pool.query(
      "SELECT * FROM users WHERE uname = $1",
      [uname],
      (error, results) => {
        if (error) {
          console.error("Error fetching data:", error);
          res.status(500).json({ error: "Internal server error" });
        } else {
          res.status(200).json(results.rows);
        }
      }
    );
  } catch (err) {
    // res.status(500).json({ error: "Internal server error" });
    errorHandler(err, req, res, next);
  }
};

