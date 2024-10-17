import { NextFunction, Request, Response } from 'express';
import { getXataClient } from '../xata';
import AppError from '../utils/AppError';

const xata = getXataClient();

export const getAllusers = async (req: Request, res: Response, next:NextFunction)=>{
    try {
        const users = await xata.db.Users.getMany();

        if(users.length < 1){
            return next(new AppError('No users found', 404));
        }

        res.status(200).json({
            status:'success',
            data: users
        })
    } catch (error) {
        console.log(error);
        return next(new AppError('Failed to get users', 500));
    }
}

export const getSingleUser = async (req: Request, res: Response, next:NextFunction)=>{
    try {
        const user = await xata.db.Users.read(req.params.id);

        if(!user){
            return next(new AppError("User not found", 401));
        }

        res.status(200).json({
            status:'success',
            data: user
        })
    } catch (error) {
        return next(new AppError('Failed to get a single user', 500));
    }
}