import { NextFunction, Request, Response } from 'express';
import { getXataClient } from './../src/xata';
import AppError from '../utils/AppError';
import redisClient from './../App'

const xata = getXataClient();

export const getAllComments = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const key= "comments:all";

        const cachedComments = await redisClient.get(key);

        if(cachedComments) {
            const parsedComments = JSON.parse(cachedComments);

            res.status(200).json({
                results: parsedComments.length,
                status:'success',
                data: parsedComments
            });
            return;
        }

        const comments = await xata.db.comments.select([
            'userId.name',
            'taskId.description',
            '*'
        ]).getMany();

        if (!comments || comments.length < 1) {
            return next(new AppError('No comments found', 404));
        }

        await redisClient.setEx(key, 60, JSON.stringify(comments));

        res.status(200).json({
            status: 'success',
            data: comments
        });
    } catch (error) {
        console.error(error);
        return next(new AppError('Failed to get comments', 500));
    }
}



export const getSingleComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const key = 'comment:' + req.params.id.toLowerCase();

        const cachedValue = await redisClient.get(key);

        if (cachedValue) {
            console.log('Cache hit for: ' + key);
            res.status(200).json({
                status: 'success',
                data: JSON.parse(cachedValue)
            });
            return;
        } else {
            console.log('Cache miss for: ' + key);
            
            const comment = await xata.db.comments.read(req.params.id);

            if (!comment) {
                return next(new AppError("Comment not found", 404));
            }

            await redisClient.setEx(key, 3600, JSON.stringify(comment));

            res.status(200).json({
                status: 'success',
                data: comment
            });
        }
    } catch (error) {
        console.error('Error fetching comment:', error);
        return next(new AppError('Failed to get a single comment', 500));
    }
};

export const createComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(!req.body){
            return next(new AppError('Please provide comment details', 400));
        }

        const newComment = await xata.db.comments.create(req.body);

        res.status(201).json({
            status:'success',
            data: newComment
        });
    } catch (error) {
        console.error(error);
        return next(new AppError('Failed to create comment', 500));
    }
}

export const updateComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const comment = await xata.db.comments.read(req.params.id);

        if(!comment){
            return next(new AppError("Comment not found", 404));
        }

        if(!req.body){
            return next(new AppError('Please provide comment details', 400));
        }

        const updatedComment = await xata.db.comments.update(req.params.id, req.body);

        res.status(200).json({
            status:'success',
            data: updatedComment
        });
    } catch (error) {
        console.error(error);
        return next(new AppError('Failed to update comment', 500));
    }
}

export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const comment = await xata.db.comments.read(req.params.id);

        if(!comment){
            return next(new AppError('Comment not found', 404));
        }

        await xata.db.comments.delete(req.params.id);

        res.status(204).json({
            status:'success',
            message: 'Comment deleted'
        });
    } catch (error) {
        console.error(error);
        return next(new AppError('Failed to delete comment', 500));
    }
}