import { NextFunction, Request, Response } from 'express';
import { getXataClient } from './../src/xata';
import AppError from '../utils/AppError';
import redisClient from '../App';

const xata = getXataClient();

// Get all projects from the database.
export const getAllProject= async (req:Request, res:Response, next:NextFunction)=>{
    try {
        const key = 'projects:all';

        const cachedProjects = await redisClient.get(key);

        if(cachedProjects){
            const parsedProjects = JSON.parse(cachedProjects);

            res.status(200).json({
                results:parsedProjects.length,
                status:'success',
                data:parsedProjects
            })
            return;
        }

        const projects = await xata.db.Project.select([
            '*',
            'adminId.adminId.name',
            'adminId.adminId.role',
            'name', 
            'adminId.description'
        ]).getMany();

        if(projects.length < 1){
            return next(new AppError('No posts found', 404));
        }

        await redisClient.setEx(key, 60, JSON.stringify(projects));

        res.status(200).json({
            results:projects.length,
            status: 'success',
            data: projects
        })
    } catch (error) {
        console.log(error);
        return next(new AppError('Failed to get posts', 500));
    }
}

export const getSingleProject= async (req:Request, res:Response, next:NextFunction)=>{
    try {
        const key = 'project'+req.params.id.toLowerCase();

        const cachedProject = await redisClient.get(key);

        if(cachedProject) {
            res.status(200).json({
                status:'success',
                data: JSON.parse(cachedProject)
            });
            return;
        }

        const project = await xata.db.Project.read(req.params.id);

        if(!project){
            return next(new AppError("Project not found", 401));
        }

        await redisClient.setEx(key, 3600, JSON.stringify(project));

        res.status(200).json({
            status:'success',
            data: project
        })
        
    } catch (error) {
        return next(new AppError('Failed to get a single post', 500));
    }
}

export const updateProject = async(req:Request, res:Response, next:NextFunction)=>{
    try{
        const project = await xata.db.Project.read(req.params.id);

        if(!project){
            return next(new AppError("Project not found", 404));
        }

        const updatedProject = await xata.db.Project.update(req.params.id, req.body);

        res.status(200).json({
            status:'success',
            data: updatedProject
        })
    }catch(err){
        console.log(err);
        return next(new AppError('Failed to update project', 500));
    }
}

export const deleteProject = async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const project = await xata.db.Project.read(req.params.id);

        if(!project){
            return next(new AppError("Project not found", 404));
        }

        await xata.db.Project.delete(req.params.id);

        res.status(204).json({
            status:'success',
            message: 'Project deleted successfully'
        })
    } catch (error) {
        return next(new AppError("Error deleting project", 401))
    }
}

export const createProject = async(req:Request, res:Response, next:NextFunction)=>{
    try {
        if(!req.body){
            return next(new AppError("No data provided", 400));
        }
        const project = await xata.db.Project.create(req.body);

        if(!project){
            return next(new AppError("Failed to create a project", 401));
        }

        res.status(201).json({
            status:'success',
            data: project
        })
    } catch (error) {
        console.log(error)
        return next(new AppError("Error creating project", 401));
    }
}