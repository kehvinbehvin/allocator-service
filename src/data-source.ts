import "reflect-metadata"
import { DataSource } from "typeorm"

// Import custom schemas here
// eg: import { User } from "./<service>/<schemaFile>"
import { User } from "./user/entity/User"

import dotenv from 'dotenv';
dotenv.config();

const {
    DB_HOST_POSTGRES, 
    DB_PORT_POSTGRES, 
    DB_DATABASE_POSTGRES, 
    DB_USERNAME_POSTGRES, 
    DB_PASSWORD_POSTGRES,
    NODE_ENV,
    DATABASE_URL
    } = process.env

function getDataSource() {
    if (NODE_ENV === "development") {
        return new DataSource({
            type: "postgres",
            host: DB_HOST_POSTGRES,
            port: Number(DB_PORT_POSTGRES),
            username: DB_USERNAME_POSTGRES,
            password: DB_PASSWORD_POSTGRES,
            database: DB_DATABASE_POSTGRES,
            synchronize: true,
            logging: true,
            entities: [],
            subscribers: [],
            migrations: [],
        })
    } else {
        return new DataSource({
            type: "postgres",
            url: DATABASE_URL,
            synchronize: true,
            logging: true,
            entities: [User],
            migrations: [],
            subscribers: [],
            ssl: {
                ca: process.env.SSL_CERT
            },
        })
    }
}

const AppDataSource = getDataSource()

export { AppDataSource }