import express from "express";
import { pool } from "../../db.js";
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();

router.post("/like", authenticate, async (req, res) => {
  console.log("받은 바디:", req.body);
  console.log("토큰에서 꺼낸 유저 정보:", req.user); 
  const { restaurantId } = req.body;
  const userId = req.user.sub; 

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

router.delete("/like", authenticate, async (req, res) => {
  const { restaurantId } = req.body;
  const userId = req.user.sub; 
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