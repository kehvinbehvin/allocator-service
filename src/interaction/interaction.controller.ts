import interactionLogger from "./interaction.logger"
import { Request, Response, NextFunction } from 'express';
import { getProfileInteractionById, getProfileInteractions, createProfileInteraction, deleteProfileInteraction, setInteractionOwner, updatedProfileInteraction } from "./interaction.manager"
import httpStatusCodes from "../utils/error_handling/configs/httpStatusCodes"
import { HTTPBadRequestError } from "../utils/error_handling/src/HTTPErrors"
import { completeKeys, isWhiteListed } from "../utils/utils"
import { getProfileById } from "../profile/profile.manager";

export async function getInteraction(req: Request, res: Response, next: NextFunction) {
    try {
        const interactionId = req.params.interactionId;
        const interaction = await getProfileInteractionById(Number(interactionId));
        if (!interaction) {
            interactionLogger.log("info",`Error retrieving interaction id: ${interactionId}`);

            const response = {
                "Message": "Interaction not found",
                "Interaction id": `${interactionId}`,
            }
    
            return res.json(response).status(httpStatusCodes.NOT_FOUND);
        }

        return res.json(interaction).status(httpStatusCodes.OK)

    } catch (error: any) {
        interactionLogger.log("error", error);
        return next(error);
    }
}

export async function getInteractions(req: Request, res: Response, next: NextFunction) {
    try {
        const profileId = req.params.profileId;
        const profile = await getProfileById(Number(profileId));
        const interactions = await getProfileInteractions(profile);

        return res.json(interactions).status(httpStatusCodes.OK)

    } catch (error: any) {
        interactionLogger.log("error", error);
        return next(error);
    }
}

export async function addInteraction(req: Request, res: Response, next: NextFunction) {
    try {
        const interactionData = req.body;
        const profileId = req.params.profileId;
        const profile = await getProfileById(Number(profileId));

        const keyFields = ["details"];
        
        interactionLogger.log("debug", {
            "message": req.body
        })

        if (!completeKeys(keyFields, interactionData)) {
            return next(new HTTPBadRequestError("Incomplete data"));
        }

        const interaction = await createProfileInteraction(interactionData);
        await setInteractionOwner(interaction, profile)

        interactionLogger.log("info",`${interactionLogger.id} created`);

        const response = {
            "Message": "Interaction created successfully",
            "Interaction id": `${interaction.id}`,
        }

        return res.json(response).status(httpStatusCodes.OK);


    } catch (error: any) {
        interactionLogger.log("error", error);
        return next(error);
    }
}

export async function removeInteraction(req: Request, res: Response, next: NextFunction) {
    try {
        const interactionId = req.params.interactionId;
        const interaction = await getProfileInteractionById(Number(interactionId));
        if (!interaction) {
            interactionLogger.log("info",`Error retrieving interaction id: ${interactionId}`);

            const response = {
                "Message": "Interaction not found",
                "Interaction id": `${interactionId}`,
            }
    
            return res.json(response).status(httpStatusCodes.NOT_FOUND);
        }

        const deletedInteraction = await deleteProfileInteraction(interaction);

        interactionLogger.log("info",`${deletedInteraction.id} deleted`);

        const response = {
            "Message": "Interaction removed successfully",
            "Interaction id": `${deletedInteraction.id}`,
        }

        return res.json(response).status(httpStatusCodes.OK);

    } catch (error: any) {
        interactionLogger.log("error", error);
        return next(error);
    }
}

export async function patchInteraction(req: Request, res: Response, next: NextFunction) {
    try {
        const interactionData = req.body;

        const keyFields = ["details"];

        const invalidKeys = isWhiteListed(keyFields, interactionData);
    
        if (invalidKeys.length > 0) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({
                "Invalid keys": invalidKeys
            })
        }
    
        const interactionId = req.params.interactionId;
        const interaction = await getProfileInteractionById(Number(interactionId));
        const updatedInteraction = await updatedProfileInteraction(interaction, interactionData);

        interactionLogger.log("info",`Updated interaction id: ${updatedInteraction.id}`)

        const response = {
            "Message": "Interaction patched successfully",
            "Interaction id": `${updatedInteraction.id}`,
        }
    
        return res.json(response).status(httpStatusCodes.OK);
        
    } catch (error: any) {
        interactionLogger.log("error", error);
        return next(error);
    }
}