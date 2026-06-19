import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
analyzeCode
}
from "../controllers/reviewController.js";


const router =
express.Router();



router.post(
"/analyze",
protect,
analyzeCode
);



export default router;