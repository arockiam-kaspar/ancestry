import express from "express";
const router = express.Router();

// Item Model
import Item from "../models/item";
router.get('/', (req, res) => {
  Item.find().sort({ date: -1 }).then(items => res.json(items));
});

export default router;
//# sourceMappingURL=items.js.map