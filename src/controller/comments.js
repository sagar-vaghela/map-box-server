import { Sequelize } from "sequelize";
import pool from "../db/conn.js";
import { errorHandler } from "../middleware/middleware.js";

export const createComments = (req, res, next) => {
  try {
    const { pid, comment, uname, time } = req.body;
    if (!pid || !comment || !uname || !time) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    pool.query(
      "SELECT * FROM post WHERE post_id = $1",
      [pid],
      (selectError, selectResults) => {
        if (selectError) {
          console.error("Error checking 'pid' value:", selectError);
          res.status(500).json({ error: "Internal server error" });
        } else if (selectResults.rows.length === 0) {
          console.error("Invalid 'pid' value or post not found");
          res
            .status(400)
            .json({ error: "Invalid 'pid' value or post not found" });
        } else {
          pool.query(
            "INSERT INTO comments (pid, comment, uname, time) VALUES ($1, $2, $3, $4)",
            [pid, comment, uname, time],
            (error, results) => {
              if (error) {
                console.error("Error inserting data:", error);
                res.status(500).json({ error: "Internal server error" });
              } else {
                const insertedData = results.rows[0];
                res.status(201).json({
                  msg: "Data inserted successfully",
                  data: req.body
                });
              }
            }
          );
        }
      }
    );
  } catch (err) {
    // res.status(500).json({ error: "Internal server error" });
    errorHandler(err, req, res, next);
  }
};

export const getComments = (req, res, next) => {
  try {
    pool.query(
      "SELECT * FROM comments ORDER BY comments_id ASC",
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

export const getCommentsById = (req, res, next) => {
  try {
    const comments_id = parseInt(req.params.comments_id);
    pool.query(
      "SELECT * FROM comments WHERE comments_id = $1",
      [comments_id],
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

export const getCommentsByPostId = (req, res, next) => {
  try {
    const pid = parseInt(req.params.pid);

    pool.query(
      "SELECT * FROM post WHERE post_id = $1",
      [pid],
      (selectError, selectResults) => {
        if (selectError) {
          console.error("Error checking 'pid' value:", selectError);
          res.status(500).json({ error: "Internal server error" });
        } else if (selectResults.rows.length === 0) {
          console.error("Invalid 'pid' value or post not found");
          res
            .status(400)
            .json({ error: "Invalid 'pid' value or post not found" });
        } else {
          pool.query(
            "SELECT * FROM comments WHERE pid = $1 ORDER BY comments_id ASC",
            [pid],
            (error, results) => {
              if (error) {
                console.error("Error fetching comments data:", error);
                res.status(500).json({ error: "Internal server error" });
              } else {
                res.status(200).json(results.rows);
              }
            }
          );
        }
      }
    );
  } catch (err) {
    // res.status(500).json({ error: "Internal server error" });
    errorHandler(err, req, res, next);
  }
};

export const getPostsWithCommentCount = async (req, res, next) => {
  try {
    const query = {
      text: `
        SELECT
          p.post_id,
          p.title AS post_title,
          COUNT(c.comments_id) AS comment_count
        FROM
          post p
        LEFT JOIN
          comments c ON p.post_id = c.pid
        GROUP BY
          p.post_id, p.title
        ORDER BY
          p.post_id ASC;
      `,
    };

    const result = await pool.query(query);

    res.status(200).json(result.rows);
  } catch (err) {
    // res.status(500).json({ error: "Internal server error" });
    errorHandler(err, req, res, next);
  }
};


