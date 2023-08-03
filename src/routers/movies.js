import { Router } from 'express'
import { addMoviePage, createMovie, deleteMovie, getAllMovies, getMovieById, search, updateMovie } from '../controllers/movies'
import { checkPermission } from '../middleware/permission'
import multer from 'multer'

const router = Router()

const upload = multer({ dest: "public/uploads"});

router.get("/", getAllMovies)

router.get("/add", addMoviePage)

router.post("/add", upload.single("avatar"),checkPermission, createMovie)

router.put("/update/:id",checkPermission, updateMovie) 

router.delete("/delete/:id",checkPermission,deleteMovie)
router.get("/search",search)
// Dynamic routing
router.get("/:id", getMovieById)

export default router