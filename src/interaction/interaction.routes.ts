import Express from "express";
import { getInteraction, getInteractions, addInteraction, removeInteraction, patchInteraction } from "./interaction.controller"
import { interactionOwner } from "./interaction.middleware"
import { profileOwner } from "../profile/profile.middleware"
import { verify } from "../authentication/auth.middleware"

function interactionRoutes(app: Express.Application) {
    app.get("/api/v0/interaction/:profileId/:interactionId", verify, interactionOwner, getInteraction)
    app.get("/api/v0/interactions/:profileId", verify, profileOwner, getInteractions)
    app.post("/api/v0/interaction/:profileId", verify, profileOwner, addInteraction)
    app.delete("/api/v0/interaction/:profileId/:interactionId" ,verify, interactionOwner, removeInteraction)
    app.patch("/api/v0/interaction/:profileId/:interactionId", verify, interactionOwner, patchInteraction)
}
// TODO: Add routes to app.ts
export default interactionRoutes;