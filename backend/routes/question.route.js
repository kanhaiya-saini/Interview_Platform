import  express from "express";
import { getQuestion, evaluate } from "../controllers/question.controller.js";
import isAuthenticated from "../middlewares/isAthenticated.js";

const router = express.Router();

router.post("/get-question", isAuthenticated, getQuestion);
router.post("/evaluate", isAuthenticated, evaluate);

export default router;