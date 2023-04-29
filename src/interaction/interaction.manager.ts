import { AppDataSource } from "../data-source"
import { Interaction } from "../interaction/entity/Interaction"
import { Profile } from "../profile/entity/Profile"
import { isProfileOwner } from "../profile/profile.manager"
import interactionLogger from "./interaction.logger";
import { HTTPInternalSeverError, HTTPNotFoundError } from "../utils/error_handling/src/HTTPErrors"
import { In } from "typeorm";

const interactionRepository = AppDataSource.getRepository(Interaction);
const profileRepository = AppDataSource.getRepository(Profile)

export async function getProfileInteractionById(interactionId: number): Promise<Interaction> {
    try {
        const interaction = await interactionRepository.findOne({
            where: {
                id: interactionId,
                deleted: false
            }
        })

        if (!interaction) {
            throw new HTTPNotFoundError(`Interaction id ${interactionId} does not exist`);
        }

        return interaction

    } catch (error: any) {
        interactionLogger.log("error",`${error}`);
        throw new HTTPInternalSeverError("Error when getting interaction");
    }
}

export async function getProfileInteractions(profile: Profile): Promise<Interaction[]> {
    try {
        const interactions = await interactionRepository.findBy({
            id: In(profile.interactions),
            deleted: false
        })

        return interactions

    } catch (error: any) {
        interactionLogger.log("error",`${error}`);
        throw new HTTPInternalSeverError("Error when getting interactions");
    }
}

export async function createProfileInteraction(interactionData: Interaction): Promise<Interaction> {
    try {
        const interaction = new Interaction();

        const updatedInteraction = await setInteractionData(interaction, interactionData);

        return await interactionRepository.save(updatedInteraction);

    } catch (error: any) {
        interactionLogger.log("error",`${error}`);
        throw new HTTPInternalSeverError("Error when updating profile");
    }
}

export async function deleteProfileInteraction(interaction: Interaction): Promise<Interaction> {
    try {
        interaction.deleted = true;
        return await interactionRepository.save(interaction);

    } catch (error: any) {
        interactionLogger.log("error",`${error}`);
        throw new HTTPInternalSeverError("Error when updating profile");
    }
}

export async function updatedProfileInteraction(interaction: Interaction, interactionData: Interaction) {
    try {
        const updatedInteraction = await setInteractionData(interaction, interactionData)

        return await interactionRepository.save(updatedInteraction);

    } catch (error: any) {
        interactionLogger.log("error",`${error}`);
        throw new HTTPInternalSeverError("Error when updating profile");
    }
}

export async function setInteractionOwner(interaction: Interaction, profile: Profile): Promise<Interaction> {
    try {
        interaction.profile = profile
        interactionLogger.log("debug", profile)
        await interactionRepository.save(interaction);

        return interaction

    } catch (error: any) {
        interactionLogger.log("error",`${error}`)
        throw new HTTPInternalSeverError("Error when setting interaction owner");
    }
}

export async function isInteractionOwner(interactionId: number, profileId: number, userId: number) {

    if (!isProfileOwner(profileId, userId)) {
        return false
    }

    const profile = await interactionRepository.findOne({
        where: {
            profile: {
                id: profileId
            },
            id: interactionId
        }
    })

    return profile !== null

}

async function setInteractionData(interaction: Interaction, interactionData: Interaction) {
    try {
        if (interactionData.details) {
            interaction.details = interactionData.details
        }

        return interaction
    } catch (error: any) {
        interactionLogger.log("error",`${error}`)
        throw new HTTPInternalSeverError("Error when setting data in interaction");
    }
}