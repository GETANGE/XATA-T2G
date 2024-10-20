import express from 'express';

import { 
    createProject, 
    deleteProject, 
    getAllProject, 
    getSingleProject, 
    updateProject 
} from '../controller/projectContoller';

import { 
    protect, 
    restrictTo 
} from '../controller/authController';

const router = express.Router();

router
    .route('/')
        .get(getAllProject)
        .post(createProject);

router.
    route('/:id')
        .get(getSingleProject)
        .patch(protect,restrictTo('admin','leader'),updateProject)
        .delete(protect,restrictTo('admin','leader'),deleteProject);

export default router;