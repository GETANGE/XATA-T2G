import express from 'express';

import { createProject, deleteProject, getAllProject, getSingleProject, updateProject } from '../controller/projectContoller';

const router = express.Router();

router
    .route('/')
        .get(getAllProject)
        .post(createProject);

router.
    route('/:id')
        .get(getSingleProject)
        .patch(updateProject)
        .delete(deleteProject);

export default router;