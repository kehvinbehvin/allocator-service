
import { Request, Response, NextFunction } from "express";
import { isInteractionOwner } from "../interaction/interaction.manager";
import { HTTPAccessDeniedError, HTTPBadRequestError } from "../utils/error_handling/src/HTTPErrors"

async function interactionOwner(req: Request, res: Response, next: NextFunction) {
    const currentUserId = res.locals.currentUserId
        
    const profileId = req.params.profileId;
    if (!profileId) {
        return next(new HTTPBadRequestError("Bad request"));
    }

    const interactionId = req.params.interactionId
    if (!await isInteractionOwner(Number(interactionId), Number(profileId), currentUserId)) {
        return next(new HTTPAccessDeniedError("Access denied"));
    } 

    return next();
}

export { interactionOwner }