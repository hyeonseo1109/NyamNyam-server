import express from "express";
import { pool } from "../db.js";

const router = express.Router();

router.post("/like", async (req, res) => {
  const { userId, restaurantId } = req.body;

  try {
    // DB에 저장
    await pool.query(
      "INSERT INTO Places (userId, restaurantId) VALUES (?, ?)",
      [userId, restaurantId]
    );

    res.json({ message: "찜 : success" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "찜 : 서버 에러" });
  }
});

router.delete("/like", async (req, res) => {
  const {userId, restaurantId} = req.body;
  try {
    await pool.query(
      "DELETE FROM Places WHERE userId = ? AND restaurantId = ?",
      [userId, restaurantId]
    );
    res.json({ message: "찜 취소"});
  } catch (err) {
    console.error("에러:", err);
    res.status(500).json({message: "찜 취소 : 서버 에러"});
  }
});

export default router;