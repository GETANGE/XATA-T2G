import express from 'express';
import { 
    getAllTasks, 
    createTask, 
    getSingleTask, 
    updateTask, 
    deleteTask 
} from '../controller/taskController';
import { protect, restrictTo } from '../controller/authController';
const router = express.Router();

router
    .route('/')
        .get(getAllTasks)
        .post(createTask);

router
    .route('/:id')
        .get(getSingleTask)
        .patch(protect,updateTask)
        .delete(protect,restrictTo('admin','leader'),deleteTask);
export default router;