import  express  from "express";

import { 
    createTeam, 
    deleteTeam, 
    getAllTeams, 
    getSingleTeam, 
    updateTeam 
} from "../controller/teamController";
import { protect, restrictTo } from "../controller/authController";


const router = express.Router();

router
    .route('/')
        .get(getAllTeams)
        .post(createTeam);

router
    .route('/:id')
        .get(getSingleTeam)
        .patch(protect,restrictTo('admin', 'leader'),updateTeam)
        .delete(protect, restrictTo('admin','leader'),deleteTeam);
export default router;