// Dependencies
import express, { Express } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import "reflect-metadata"
import logger from "./utils/logger/src/logger";

// Database Connection
import { AppDataSource } from "./data-source";

// Routes (Import custom routes here)
// eg: Import serviceRoute from "./<service>/<RouteFile>"
import userRoutes from './user/user.routes';
import telebotRoutes from "./telebot/telebot.routes"
import profileRoutes from "./profile/profile.routes"

// Middleware
import errorHandler from "./utils/error_handling/errorHandler.middleware"
import routeLogger from "./utils/logger/src/routeLogger.middleware";
var cors = require('cors')


const app: Express = express();
const port = process.env.PORT;

var corsOptions = {
    origin: ["http://localhost:3000"],
    optionsSuccessStatus: 200 
  }

app.use(cors(corsOptions));
app.use(express.json());
app.use(routeLogger);
app.use(errorHandler);

// Initialise custom routes here
// eg: serviceRoutes(app)
userRoutes(app)
telebotRoutes(app)
profileRoutes(app)

AppDataSource.initialize().then(async () => {
    logger.log("info","Database connected")
}).catch(error => console.log(error))


app.listen(port, () => {
    logger.log("info",`Server is running on port ${port}`);
});