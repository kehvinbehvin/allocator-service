import Express from "express";
import { update } from "./telebot.controller"

function telebotRoutes(app: Express.Application) {
    app.post("/allocator/update", update)
}

export default telebotRoutes;