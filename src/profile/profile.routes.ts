import Express from "express";
import { getProfile, addProfile, removeProfile, patchProfile, getProfiles } from "./profile.controller"
import { verify } from "../authentication/auth.middleware"
import { profileOwner } from "./profile.middleware"

function profileRoutes(app: Express.Application) {
    app.get("/api/v0/profile/:profileId", verify, profileOwner, getProfile)
    app.get("/api/v0/profiles", verify, getProfiles)
    app.post("/api/v0/profile", verify, addProfile)
    app.delete("/api/v0/profile/:profileId" ,verify, profileOwner, removeProfile)
    app.patch("/api/v0/profile/:profileId", verify, profileOwner, patchProfile)
}
// TODO: Add routes to app.ts
export default profileRoutes;