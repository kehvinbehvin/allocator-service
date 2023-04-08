import { Request, Response, NextFunction } from 'express';
import teleBotLogger from './telebot.logger';
import httpStatusCodes from "../utils/error_handling/configs/httpStatusCodes"

export async function update(req: Request, res: Response, next: NextFunction) {
    try {
        
        const response = {
            "Message": "User added",
        }

        teleBotLogger.log("debug", req.body);

        return res.json().status(httpStatusCodes.OK);
    } catch (error: any) {
        teleBotLogger.log("error", error);
        return next(error);
    }
}