
import { Request, Response, NextFunction } from "express";
import { isProfileOwner } from "../profile/profile.manager";
import { HTTPAccessDeniedError, HTTPBadRequestError } from "../utils/error_handling/src/HTTPErrors"

async function profileOwner(req: Request, res: Response, next: NextFunction) {
    const currentUserId = res.locals.currentUserId
        
    const profileId = req.params.profileId;

    if (!profileId) {
        return next(new HTTPBadRequestError("Bad request"));
    }

    if (!await isProfileOwner(Number(profileId), currentUserId)) {
        return next(new HTTPAccessDeniedError("Access denied"));
    } 
    
    return next()
}

export { profileOwner }