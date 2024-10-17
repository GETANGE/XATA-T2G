import express from 'express';
import { getAllusers, getSingleUser } from '../controller/userController';
import { createUser, loginUser } from '../controller/authController';

const router = express.Router();

router.route('/users').get(getAllusers)
router.route('/signup').post(createUser)
router.route('/login').post(loginUser)

router.route('/user/:id').get(getSingleUser)

export default router;