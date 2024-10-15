import { NextFunction, Request, Response } from 'express';
import { getXataClient } from './../xata';
import AppError from '../utils/AppError';

const xata = getXataClient();

// Get all posts from the database.
export const getAllPosts= async (req:Request, res:Response, next:NextFunction)=>{
    try {
        const posts = await xata.db.Posts.getMany();

        if(posts.length < 1){
            return next(new AppError('No posts found', 404));
        }

        res.status(200).json({
            status: 'success',
            data: posts
        })
    } catch (error) {
        console.log(error);
        return next(new AppError('Failed to get posts', 500));
    }
}

// export const getSinglePost= async (req:Request, res:Response, next:NextFunction)=>{
//     try {
        
//     } catch (error) {
//         return next(new AppError('Failed to get a single post', 500));
//     }
// }

/**
 * COMPLETE THIS CRUD STAFF  ----Kibe
 */