import express from "express";
import {
  getGroups,
  createGroup,
  eachGroup,
  updateGroup,
  deleteGroup,
} from "../controllers/groupController.js";

const router = express.Router();

router.get("/", getGroups);
router.post("/", createGroup);
router.get("/:id", eachGroup);
router.patch("/:id", updateGroup);
router.delete("/:id", deleteGroup);

export default router;
