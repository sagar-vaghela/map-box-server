import { Sequelize } from "sequelize";
import pool from "../db/conn.js";

export const createUser = (req, res) => {
  try {
    const { uname,pid } =
      req.body;
    if (
      !uname ||
      !pid
    ) {
      return res.status(400).json({ error: "Missing required parameters" });
    }
    pool.query(
      'INSERT INTO users (uname,pid) VALUES ($1, $2)',
      [uname,pid],
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
        res.status(200).json(results.rows[0]);
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
    const {uname, pid } =
      req.body;
    if (
      !uname ||
      !pid
    ) {
      return res.status(400).json({ error: "Missing required parameters" });
    }
    pool.query(
      'UPDATE users SET uname = $1, pid = $2 WHERE id = $3',
      [uname,pid, id],
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

// export const deleteUser = (req, res) => {
//   try {
//     const id = parseInt(req.params.id);
//     pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
//       if (error) {
//         console.error("Error deleting data:", error);
//         res.status(500).json({ error: "Internal server error" });
//       } else {
//         res.status(200).json({
//           msg: "Data deleted successfully",
//           data: results.rows[0]
//         });
//       }
//     });
//   } catch (err) {
//     console.error("Unexpected error:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };


export const deleteUser = (req, res) => {
  try {
    const id = parseInt(req.params.id);

    // Delete associated posts first
    pool.query("DELETE FROM post WHERE uid = $1", [id], (postError) => {
      if (postError) {
        console.error("Error deleting associated posts:", postError);
        res.status(500).json({ error: "Internal server error" });
      } else {
        // Now you can safely delete the user
        pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
          if (error) {
            console.error("Error deleting user:", error);
            res.status(500).json({ error: "Internal server error" });
          } else {
            res.status(200).json({
              msg: "User and associated posts deleted successfully",
              data: results.rows[0],
            });
          }
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
    pool.query(
      "SELECT * FROM users WHERE author = $1",
      [author],
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
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
