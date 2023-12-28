import { Sequelize } from "sequelize";
import pool from "../db/conn.js";

// export const createComments = (req, res) => {
//     try {
//         const { comments_id,pid, uid, comment } = req.body;
//         if (!comments_id,!pid || !uid || !comment) {
//         return res.status(400).json({ error: "Missing required parameters" });
//         }
//         pool.query(
//         'INSERT INTO comments (comments_id,pid, uid, comment) VALUES ($1, $2, $3,$4)',
//         [comments_id,pid, uid, comment],
//         (error, results) => {
//             if (error) {
//             console.error("Error inserting data:", error);
//             res.status(500).json({ error: "Internal server error" });
//             } else {
//             res.status(201).json({
//                 msg: "Data inserted successfully",
//                 data: results.rows[0]
//             });
//             }
//         }
//         );
//     } catch (err) {
//         console.error("Unexpected error:", err);
//         res.status(500).json({ error: "Internal server error" });
//     }
// };

// export const createComments = (req, res) => {
//   try {
//     const { pid, uid, comment, uname, time } = req.body;
//     console.log('req.body :>> ', req.body);
//     if (!pid || !uid || !comment || !uname || !time) {
//       return res.status(400).json({ error: "Missing required parameters" });
//     }

//     pool.query(
//       "INSERT INTO comments (pid, uid, comment,uname,time) VALUES ($1, $2, $3,$4,$5)",
//       [pid, uid, comment, uname, time],
//       (error, results) => {
//         console.log('results :>> ', results);
//         if (error) {
//           console.error("Error inserting data:", error);
//           res.status(500).json({ error: "Internal server error" });
//         } else {
//             const insertedData = results.rows[0];
//             console.log('insertedData :>> ', insertedData);
//           res.status(201).json({
//             msg: "Data inserted successfully",
//             // data: results.rows[0]
//             data: req.body
//           });
//         }
//       }
//     );
//   } catch (err) {
//     console.error("Unexpected error:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

export const createComments = (req, res) => {
    try {
      const { pid, uid, comment, uname, time } = req.body;
      console.log('req.body :>> ', req.body);
      if (!pid || !uid || !comment || !uname || !time) {
        return res.status(400).json({ error: "Missing required parameters" });
      }
  
      // Check if the 'pid' value exists in the 'post' table
      pool.query(
        "SELECT * FROM post WHERE post_id = $1",
        [pid],
        (selectError, selectResults) => {
          if (selectError) {
            console.error("Error checking 'pid' value:", selectError);
            res.status(500).json({ error: "Internal server error" });
          } else if (selectResults.rows.length === 0) {
            console.error("Invalid 'pid' value or post not found");
            res.status(400).json({ error: "Invalid 'pid' value or post not found" });
          } else {
            // 'pid' value is valid, proceed with the insert
            pool.query(
              "INSERT INTO comments (pid, uid, comment, uname, time) VALUES ($1, $2, $3, $4, $5)",
              [pid, uid, comment, uname, time],
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
      console.error("Unexpected error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  

export const getComments = (req, res) => {
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
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCommentsById = (req, res) => {
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
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserData = (req, res) => {
  try {
    const uid = req.params.uid;
    pool.query(
      "SELECT * FROM comments WHERE uid = $1",
      [uid],
      (error, results) => {
        if (error) {
          console.error("Error fetching user data:", error);
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


export const getCommentsByPostId = (req, res) => {
  try {
    const pid = parseInt(req.params.pid);

    // Check if the 'pid' value exists in the 'post' table
    pool.query(
      "SELECT * FROM post WHERE post_id = $1",
      [pid],
      (selectError, selectResults) => {
        if (selectError) {
          console.error("Error checking 'pid' value:", selectError);
          res.status(500).json({ error: "Internal server error" });
        } else if (selectResults.rows.length === 0) {
          console.error("Invalid 'pid' value or post not found");
          res.status(400).json({ error: "Invalid 'pid' value or post not found" });
        } else {
          // 'pid' value is valid, proceed with the comments retrieval
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
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

