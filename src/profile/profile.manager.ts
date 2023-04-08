import { AppDataSource } from "../data-source"
import { Profile } from "../profile/entity/Profile"
import profileLogger from "./profile.logger"
import { User } from "../user/entity/User"
import { HTTPBadRequestError, HTTPInternalSeverError, HTTPNotFoundError } from "../utils/error_handling/src/HTTPErrors"

const profileRepository = AppDataSource.getRepository(Profile);

export async function getProfileById(id: number): Promise<Profile> {
    try {
        const profile = await profileRepository.findOne({
            where: {
                id: id,
                deleted: false,
            },
            loadRelationIds: true
        })
    
        if (!profile) {
            throw new HTTPNotFoundError(`Profile id ${id} does not exist`);
        }
    
        return profile
    } catch(error: any) {
        profileLogger.log("error",`${error}`);
        throw new HTTPInternalSeverError("Error when finding profile by id");
    }
} 

export async function getUserProfiles(user: User): Promise<Profile[]> {
    try {
        const profiles = await profileRepository.find({
            where: {
                user: {
                    id: user.id,
                    deleted: false,
                },
                deleted: false,
            },
            loadRelationIds: true
        })

        return profiles
    } catch (error: any) {
        profileLogger.log("error",`${error}`);
        throw new HTTPInternalSeverError("Error when finding profiles owned by user");
    }
}

export async function createProfile(profileData: Profile): Promise<Profile> {
    try {
        const profile = new Profile()

        const updatedProfile = await setProfileData(profile, profileData);
        const savedProfile = await profileRepository.save(updatedProfile);

        return savedProfile;

    } catch (error: any) {
        profileLogger.log("error",`${error}`);
        throw new HTTPInternalSeverError("");
    }
}

export async function deleteProfile(profileData: Profile): Promise<Profile> {
    try {
        profileData.deleted = true;
        const deletedProfile = await profileRepository.save(profileData);

        return deletedProfile;
    } catch (error: any) {
        profileLogger.log("error",`${error}`);
        throw new HTTPInternalSeverError("");
    }
}

export async function updateProfile(profile: Profile, editedProfile: Profile): Promise<Profile> {
    try {
        const updatedProfile = await setProfileData(profile, editedProfile);
        const savedProfile = await profileRepository.save(updatedProfile);

        return savedProfile;
        
    } catch (error: any) {
        profileLogger.log("error",`${error}`);
        throw new HTTPInternalSeverError("Error when updating profile");
    }
}

async function setProfileData(profile: Profile, editedProfile: Profile): Promise<Profile> {
    try {
        if (editedProfile.firstName) {
            profile.firstName = editedProfile.firstName
        }
    
        if (editedProfile.lastName) {
            profile.lastName = editedProfile.lastName
        }

        if (editedProfile.relationship) {
            profile.relationship = editedProfile.relationship
        }

        return profile
        
    } catch (error: any) {
        profileLogger.log("error",`${error}`);
        throw new HTTPBadRequestError("Error when setting profile data");
    }
}

export async function setProfileOwner(profile: Profile, user: User): Promise<Profile> {
    try { 
        profile.user = user
        return await profileRepository.save(profile)
    } catch (error: any) {
        profileLogger.log("error",`${error}`);
        throw new HTTPBadRequestError("Error when setting profile owner");
    }
}