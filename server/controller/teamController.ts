import { NextFunction, Request, Response } from 'express';
import { getXataClient } from '../src/xata';
import AppError from '../utils/AppError';
import redisClient from '../App';

const xata = getXataClient();

export const getAllTeams = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const key = 'teams:all';

        const cachedTeams = await redisClient.get(key);

        if(cachedTeams){
            const parsedTeams= JSON.parse(cachedTeams);

            res.status(200).json({
                results:parsedTeams.length,
                status:'success',
                data: parsedTeams
            });
            return;
        }

        const teams = await xata.db.Teams.select([
            '*', 
            'adminId.name', 
            'adminId.email', 
            'adminId.role'
        ]).getMany();

        if (teams.length < 1) {
            return next(new AppError('No teams found', 404));
        }

        await redisClient.setEx(key, 60, JSON.stringify(teams));

        res.status(200).json({
            results:teams.length,
            status:'success',
            data: teams
        });
    } catch (error) {
        console.error(error);
        return next(new AppError('Failed to get teams', 500));
    }
}

export const getSingleTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const key = 'team'+req.params.id.toLowerCase();

        const cachedTeam = await redisClient.get(key);

        if(cachedTeam) {
            res.status(200).json({
                status:'success',
                data: JSON.parse(cachedTeam)
            });
            return;
        }
        const team = await xata.db.Teams.read(req.params.id);

        if (!team) {
            return next(new AppError('Team not found', 404));
        }

        await redisClient.setEx(key, 3600, JSON.stringify(team));

        res.status(200).json({
            status:'success',
            data: team
        });
    } catch (error) {
        console.error(error);
        return next(new AppError('Failed to get a single team', 500));
    }
}

export const createTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(!req.body){
            return next(new AppError('Please provide team details', 400));
        }

        const newTeam = await xata.db.Teams.create(req.body);

        res.status(201).json({
            status:'success',
            data: newTeam
        });
    } catch (error) {
        console.error(error);
        return next(new AppError('Failed to create team', 500));
    }
}

export const updateTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(!req.body){
            return next(new AppError('Please provide team details', 400));
        }

        const updatedTeam = await xata.db.Teams.update(req.params.id, req.body);

        if(!updatedTeam){
            return next(new AppError('Team not found', 404));
        }

        res.status(200).json({
            status:'success',
            data: updatedTeam
        });
    } catch (error) {
        console.error(error);
        return next(new AppError('Failed to update team', 500));
    }
}

export const deleteTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const team = await xata.db.Teams.read(req.params.id);

        if(!team){
            return next(new AppError('Team not found', 404));
        }

        await xata.db.Teams.delete(req.params.id);

        res.status(204).json({
            status:'success',
            message: 'Team deleted successfully'
        });
    } catch (error) {
        console.error(error);
        return next(new AppError('Error deleting team', 500));
    }
}