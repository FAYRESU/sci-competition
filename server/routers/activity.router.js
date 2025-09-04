import express from "express";
const router = express.Router();
import activityControllers from "../controllers/activity.controller";
import { verifyToken, isAdmin, isManager } from "../middleware/authJwt";
router.get("/activities", activityControllers.getAllActivities);
router.get("/activities/:id", activityControllers.getActivitiesById);
router.post("/activities", activityControllers.createActivity);
router.put("/activities/:id", activityControllers.updateActivity);
router.delete("/activities/:id", activityControllers.deleteActivity);
router.get("/activities/search", activityControllers.searchActivities);


export default router;
