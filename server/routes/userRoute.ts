import express from 'express';
import { 
    getAllusers, 
    getSingleUser, 
    deleteUser 
} from '../controller/userController';

import { 
    createUser, 
    loginUser, 
    restrictTo, 
    protect 
} from '../controller/authController';

const router = express.Router();

router.get('/users', getAllusers)
router.post('/register', createUser)
router.post('/login', loginUser)

router.get('/users/:id', getSingleUser)
router.delete('/delete/:id', protect, restrictTo('admin'), deleteUser);

export default router;