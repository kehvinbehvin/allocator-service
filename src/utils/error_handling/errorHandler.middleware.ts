import {Request, Response, NextFunction} from "express";
import {BaseError} from "./src/BaseError";
import { HTTPInternalSeverError } from "../error_handling/src/HTTPErrors"

function errorHandler (error: BaseError, req: Request, res: Response, next: NextFunction) {
    if (!error.customError) {
        error = new HTTPInternalSeverError();
    }

    const response = {
        "Error message": `${error.message}`,
    }

    return res.status(error.statusCode).json(response);
}

export default errorHandler;