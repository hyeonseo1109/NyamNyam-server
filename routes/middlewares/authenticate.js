import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];

  // Authorization 헤더가 없거나 Bearer 토큰이 아닌 경우
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "토큰 없음" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // JWT 검증
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // req.user에 디코딩된 유저 정보 저장
    req.user = decoded;

    next(); // 다음 미들웨어/라우터 실행
  } catch (err) {
    console.error("JWT 인증 에러:", err.message);
    return res.status(403).json({ message: "토큰이 유효하지 않음" });
  }
}

export default authenticate;
