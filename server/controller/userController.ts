import { NextFunction, Request, Response } from 'express';
import { getXataClient } from '../src/xata';
import AppError from '../utils/AppError';
import redisClient from '../App';

const xata = getXataClient();

export const getAllusers = async (req: Request, res: Response, next:NextFunction)=>{
    try {
        const key_2 = 'users:all';

        const cachedUsers = await redisClient.get(key_2);

        if(cachedUsers){
            const parsedUsers = JSON.parse(cachedUsers);

            res.status(200).json({
                results: parsedUsers.length,
                status: 'success',
                data: parsedUsers
            });
            return;  // return early to avoid unnecessary database call
        }

        const users = await xata.db.Users.getMany();

        if(users.length < 1){
            return next(new AppError('No users found', 404));
        }

        await redisClient.setEx(key_2, 60, JSON.stringify(users));

        res.status(200).json({
            results: users.length,
            status: 'success',
            data: users
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        return next(new AppError('Failed to get users', 500));
    }
};


export const getSingleUser = async (req: Request, res: Response, next:NextFunction)=>{
    try {
        const key = 'user'+req.params.id.toLowerCase();

        const cachedUser = await redisClient.get(key);

        if(cachedUser){
            res.status(200).json({
                results:cachedUser.length,
                status:'success',
                data: JSON.parse(cachedUser)
            });
            return;
        }
        const user = await xata.db.Users.read(req.params.id);

        if(!user){
            return next(new AppError("User not found", 401));
        }

        await redisClient.setEx(key, 3600, JSON.stringify(user));

        res.status(200).json({
            status:'success',
            data: user
        })
    } catch (error) {
        return next(new AppError('Failed to get a single user', 500));
    }
}

export const deleteUser = async (req: any, res: Response, next: NextFunction) => {
    const { id } = req.params; 

    try {
        const user = await xata.db.Users.read(id); 

        if (!user) {
            return next(new AppError('User not found', 404));
        }

        await xata.db.Users.delete(id);

        res.status(204).json({
            status:'success',
            message: 'User deleted successfully'
        });
    } catch (error) {
        console.error(error);
        return next(new AppError('Error deleting user', 500));
    }
};

// deleting user Account

// activating user Account