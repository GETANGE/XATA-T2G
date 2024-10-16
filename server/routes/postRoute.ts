import express from 'express';

import { getAllPosts } from '../controller/postContoller';

const router = express.Router();

router
    .route('/')
        .get(getAllPosts)
        .post();

router.
    route('/:id')
        // .get(getSinglePost)
        .patch()
        .delete();

export default router;