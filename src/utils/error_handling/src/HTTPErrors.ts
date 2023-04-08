import httpStatusCodes from '../configs/httpStatusCodes';
import { BaseError } from './BaseError';

export class HTTPAccessDeniedError extends BaseError {
    constructor (
        message: string = 'Access denied',
        statusCode: number = httpStatusCodes.ACCESS_DENIED,
        isOperational: boolean = true
    ) {
        super("Access denied", statusCode, isOperational, message)
    }
}

export class HTTPBadRequestError extends BaseError {
    constructor (
        message: string = 'Bad Request',
        statusCode: number = httpStatusCodes.BAD_REQUEST,
        isOperational: boolean = true
    ) {
        super("Bad Request", statusCode, isOperational, message)
    }
}

export class HTTPInternalSeverError extends BaseError {
    constructor (
        message: string = 'Internal server error',
        statusCode: number = httpStatusCodes.INTERNAL_SERVER_ERROR,
        isOperational: boolean = true
    ) {
        super("Internal server error", statusCode, isOperational, message)
    }
}

export class HTTPNotFoundError extends BaseError {
    constructor (
        message: string = 'Not Found',
        statusCode: number = httpStatusCodes.NOT_FOUND,
        isOperational: boolean = true
    ) {
        super("Not Found", statusCode, isOperational, message)
    }
}