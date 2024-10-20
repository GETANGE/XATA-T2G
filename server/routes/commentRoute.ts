import express from 'express';
import { 
    createComment, 
    deleteComment, 
    getAllComments, 
    getSingleComment, 
    updateComment 
} from '../controller/commentController';
import { protect, restrictTo } from '../controller/authController';
const router = express.Router();

router
    .route('/')
        .get(getAllComments)
        .post(createComment);

router.
    route('/:id')
        .get(getSingleComment)
        .patch(updateComment)
        .delete(protect,restrictTo('admin', 'leader'),deleteComment);

export default router;