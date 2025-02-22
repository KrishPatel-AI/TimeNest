const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { admin } = require("../utils/firebase");

// Verify Firebase Token
async function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
}

router.post("/login", async (req, res) => {
  const { email, uid } = req.body;
  const token = jwt.sign({ email, uid }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

module.exports = router;
