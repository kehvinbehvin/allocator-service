import profileLogger from "./profile.logger"
import { Request, Response, NextFunction } from 'express';
import { getProfileById, createProfile, deleteProfile, updateProfile, setProfileOwner, getUserProfiles } from "./profile.manager"
import httpStatusCodes from "../utils/error_handling/configs/httpStatusCodes"
import { HTTPBadRequestError } from "../utils/error_handling/src/HTTPErrors"
import { completeKeys, isWhiteListed } from "../utils/utils"
import { getUserById } from "../user/user.manager";

export async function getProfile(req: Request, res: Response, next: NextFunction) {
    try {
        const profileId = req.params.profileId;
        const profile = await getProfileById(Number(profileId));
        if (!profile) {
            profileLogger.log("info",`Error retrieving profile id: ${profileId}`);

            const response = {
                "Message": "Profile not found",
                "Profile id": `${profileId}`,
            }
    
            return res.json(response).status(httpStatusCodes.NOT_FOUND);
        }

        return res.json(profile).status(httpStatusCodes.OK)

    } catch (error: any) {
        profileLogger.log("error", error);
        return next(error);
    }
}

export async function getProfiles(req: Request, res: Response, next: NextFunction) {
    try {
        const currentUser = await getUserById(res.locals.currentUserId);
        const profiles = await getUserProfiles(currentUser);

        return res.json(profiles).status(httpStatusCodes.OK)

    } catch (error: any) {
        profileLogger.log("error", error);
        return next(error);
    }
}

export async function addProfile(req: Request, res: Response, next: NextFunction) {
    try {
        const profileData = req.body;
        const currentUser = await getUserById(res.locals.currentUserId)

        const keyFields = ["firstName", "lastName"];
        
        profileLogger.log("debug", {
            "message": req.body
        })

        if (!completeKeys(keyFields,profileData)) {
            return next(new HTTPBadRequestError("Incomplete data"));
        }

        const profile = await createProfile(profileData);
        await setProfileOwner(profile, currentUser)

        profileLogger.log("info",`${profile.id} created`);

        const response = {
            "Message": "Profile created successfully",
            "Profile id": `${profile.id}`,
        }

        return res.json(response).status(httpStatusCodes.OK);


    } catch (error: any) {
        profileLogger.log("error", error);
        return next(error);
    }
}

export async function removeProfile(req: Request, res: Response, next: NextFunction) {
    try {
        const profileId = req.params.profileId;
        const profile = await getProfileById(Number(profileId));
        if (!profile) {
            profileLogger.log("info",`Error retrieving profile id: ${profileId}`);

            const response = {
                "Message": "Profile not found",
                "Profile id": `${profileId}`,
            }
    
            return res.json(response).status(httpStatusCodes.NOT_FOUND);
        }

        const deletedProfile = await deleteProfile(profile);

        profileLogger.log("info",`${deletedProfile.id} deleted`);

        const response = {
            "Message": "Profile removed successfully",
            "Profile id": `${deletedProfile.id}`,
        }

        return res.json(response).status(httpStatusCodes.OK);

    } catch (error: any) {
        profileLogger.log("error", error);
        return next(error);
    }
}

export async function patchProfile(req: Request, res: Response, next: NextFunction) {
    try {
        const profileData = req.body;

        const keyFields = ["firstName", "lastName", "relationship"];

        const invalidKeys = isWhiteListed(keyFields, profileData);
    
        if (invalidKeys.length > 0) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({
                "Invalid keys": invalidKeys
            })
        }
    
        const profileId = req.params.profileId;
        const profile = await getProfileById(Number(profileId));
        const updatedProfile = await updateProfile(profile, profileData);

        profileLogger.log("info",`Updated profile id: ${updatedProfile.id}`)

        const response = {
            "Message": "Profile patched successfully",
            "Profile id": `${updatedProfile.id}`,
        }
    
        return res.json(response).status(httpStatusCodes.OK);
        
    } catch (error: any) {
        profileLogger.log("error", error);
        return next(error);
    }
}