import Express from "express";
import { getInteraction, getInteractions, addInteraction, removeInteraction, patchInteraction } from "./interaction.controller"
import { verify } from "../authentication/auth.middleware"

function interactionRoutes(app: Express.Application) {
    app.get("/api/v0/interaction/:id", verify, getInteraction)
    app.get("/api/v0/interactions", verify, getInteractions)
    app.post("/api/v0/interaction", verify, addInteraction)
    app.delete("/api/v0/interaction/:id" ,verify, removeInteraction)
    app.patch("/api/v0/interaction/:id", verify, patchInteraction)
}
// TODO: Add routes to app.ts
export default interactionRoutes;