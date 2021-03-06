import express from "express";
import User from "../models/User";
import keys from "../config/keys";
import parseErrors from "../utils/parseErrors";

const router = express.Router();

router.post("/", (req, res) => {
  const { email, password, fullname } = req.body.user;
  const user = new User({ email, fullname });
  user.setPassword(password);
  user.save().then(userRecord => {
    res.json({ user: userRecord.toAuthJSON() });
  }).catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
});

export default router;
//# sourceMappingURL=users.js.map