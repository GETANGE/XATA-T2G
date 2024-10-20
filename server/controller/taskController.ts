import { NextFunction, Request, Response } from 'express';
import { getXataClient } from '../src/xata';
import AppError from '../utils/AppError';
import redisClient from '../App';

const xata = getXataClient();

export const getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const key = 'tasks:all';

        const cachedTasks = await redisClient.get(key);

        if(cachedTasks){
            const parsedTasks= JSON.parse(cachedTasks);

            res.status(200).json({
                results:parsedTasks.length,
                status:'success',
                data: parsedTasks
            });
            return;
        }

        const tasks = await xata.db.Task.select([
            '*', 
            'assignedToo.name',
            'projectId.adminId.adminId.name',
        ]).getMany();

        if (tasks.length < 1) {
            return next(new AppError('No tasks found', 404));
        }

        await redisClient.setEx(key, 60, JSON.stringify(tasks));

        res.status(200).json({
            results:tasks.length,
            status:'success',
            data: tasks
        });
    } catch (error) {
        console.error(error);
        return next(new AppError('Failed to get tasks', 500));
    }
}

export const getSingleTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const key = 'task'+req.params.id.toLowerCase();

        const cachedTask = await redisClient.get(key);

        if(cachedTask) {
            res.status(200).json({
                status:'success',
                data: JSON.parse(cachedTask)
            });
            return;
        }

        const task = await xata.db.Task.read(req.params.id);

        if(!task){
            return next(new AppError("Task not found", 404));
        }

        await redisClient.setEx(key, 3600, JSON.stringify(task));

        res.status(200).json({
            status:'success',
            data: task
        });
    } catch (error) {
        console.error(error);
        return next(new AppError('Failed to get a single task', 500));
    }
}

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(!req.body){
            return next(new AppError('Please provide task details', 400));
        }

        const newTask = await xata.db.Task.create(req.body);

        res.status(201).json({
            status:'success',
            data: newTask
        });
    } catch (error) {
        console.error(error);
        return next(new AppError('Failed to create task', 500));
    }
}

export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const task = await xata.db.Task.read(req.params.id);

        if(!task){
            return next(new AppError("Task not found", 404));
        }

        if(!req.body){
            return next(new AppError('Please provide task details', 400));
        }

        const updatedTask = await xata.db.Task.update(req.params.id, req.body);

        res.status(200).json({
            status:'success',
            data: updatedTask
        });
    } catch (error) {
        console.error(error);
        return next(new AppError('Failed to update task', 500));
    }
}

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const task = await xata.db.Task.read(req.params.id);

        if(!task){
            return next(new AppError("Task not found", 404));
        }

        await xata.db.Task.delete(req.params.id);

        res.status(204).json({
            status:'success',
            message: "Task deleted successfully"
        });
    } catch (error) {
        console.error(error);
        return next(new AppError('Failed to delete task', 500));
    }
}