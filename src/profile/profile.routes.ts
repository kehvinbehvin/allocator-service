import Express from "express";
import { getProfile, addProfile, removeProfile, patchProfile, getProfiles } from "./profile.controller"
import { verify } from "../authentication/auth.middleware"

function profileRoutes(app: Express.Application) {
    app.get("/api/v0/profile/:id", verify, getProfile)
    app.get("/api/v0/profiles", verify, getProfiles)
    app.post("/api/v0/profile", verify, addProfile)
    app.delete("/api/v0/profile/:id" ,verify, removeProfile)
    app.patch("/api/v0/profile/:id", verify, patchProfile)
}
// TODO: Add routes to app.ts
export default profileRoutes;