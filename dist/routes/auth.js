import express from "express";
import jwt from "jsonwebtoken";
import keys from "../config/keys";
import User from "../models/User";

const router = express.Router();

router.post("/", (req, res) => {
  const { credentials } = req.body;
  User.findOne({ email: credentials.email }).then(user => {
    if (user && user.isValidPassword(credentials.password)) {
      res.json({ user: user.toAuthJSON() });
    } else {
      res.status(400).json({ errors: { global: "Invalid credentials" } });
    }
  });
});

router.post("/validate_token", (req, res) => {
  jwt.verify(req.body.token, keys.JWT_SECRET, err => {
    if (err) {
      res.status(401).json({});
    } else {
      res.json({});
    }
  });
});

export default router;
//# sourceMappingURL=auth.js.map