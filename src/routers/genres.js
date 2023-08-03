import { Router } from 'express'
import {  creatGenres, deleteGenres, getAllGenres, getGenresById, updateGenres } from '../controllers/genres'

const router = Router()

router.get("/", getAllGenres)

router.post("/add", creatGenres)

router.put("/update/:id", updateGenres) 

router.delete("/delete/:id",deleteGenres)

// Dynamic routing
router.get("/:id", getGenresById)

export default router