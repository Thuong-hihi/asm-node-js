import { Router } from 'express'
import{ getAllCategory,getOneCategory,addCategory,updateCategory,deleteCategory} from '../controllers/category'
import { checkPermission } from '../middleware/permission'
const router = Router()



router.get("/", getAllCategory);
router.get("/:id", getOneCategory);
router.post("/add", checkPermission, addCategory);
router.put("/update/:id", checkPermission, updateCategory);
router.delete("/delete/:id", checkPermission, deleteCategory);

export default router;
