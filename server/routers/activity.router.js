import express from "express";
const router = express.Router();
import activityController from "../controllers/activity.controller.js";

// POST http://localhost:5000/api/v1/activity
router.post("/", activityController.create);

// GET http://localhost:5000/api/v1/activity
router.get("/", activityController.getAll);

// GET http://localhost:5000/api/v1/activity/:id
router.get("/:id", activityController.getById); // public

// PUT http://localhost:5000/api/v1/activity/:id
router.put("/:id", activityController.update);

// DELETE http://localhost:5000/api/v1/activity/:id
router.delete("/:id", activityController.deleteById);

export default router;