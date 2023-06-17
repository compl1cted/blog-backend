export class HttpError extends Error {
    Status: number;
    Errors: any[];
    constructor(status: number, message: string, errors: any[] = []) {
        super(message);
        this.Status = status;
        this.Errors = errors;
    }

    static UnauthorizedError(error?: any) {
        return new HttpError(401, "Unauthorized Error!", error);
    }

    static BadRequest(message: string, errors: any[] = []) {
        return new HttpError(400, message, errors);
    }

    static ServerError(message: string, errors: any[] = []) {
        new HttpError(500, message, errors);
    }
}