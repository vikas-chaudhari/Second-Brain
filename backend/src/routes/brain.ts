import { Router } from "express";
import { checkAuth } from "../middleware/user";
const router = Router();

// ================== will implement these two routes later ==============================

router.post("/share", checkAuth, (req, res) => {});

router.get("/:shareLink", checkAuth, (req, res) => {});

// =======================================================================================

export const brainRouter = router;
