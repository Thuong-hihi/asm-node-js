import express from "express";
import {  createCasts, deleteCasts, getAllCasts, getCastsById, updateCasts } from '../controllers/cast'

const router = express.Router();

router.get("/", getAllCasts)

router.post("/add", createCasts)

router.put("/update/:id", updateCasts) 

router.delete("/delete/:id", deleteCasts)

// Dynamic routing
router.get("/:id", getCastsById)

export default router

