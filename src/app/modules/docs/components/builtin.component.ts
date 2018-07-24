import { Component } from '@angular/core';

@Component({
    selector: 'app-builtin-exceptions',
    templateUrl: '../templates/builtin-exceptions.html',
    styleUrls: ['../docs.component.css']
})
export class DocsBuiltInExceptionsComponent {
    routeNotFoundEx = `
    import { HttpStatusCode, ErrorMiddleware, RouteNotFoundException } from 'dinoloop';
    import { Request, Response, NextFunction } from 'express';

    export class RouteNotFoundErrorMiddleware extends ErrorMiddleware {

        invoke(err: Error, request: Request, response: Response, next: NextFunction): void {
            if (err instanceof RouteNotFoundException) {
                response
                    .status(HttpStatusCode.notFound)
                    .json(err.requestUrl + ' - Link has been moved or broken');
            } else next(err);
        }
    }

    // app.ts: Register with dino
    dino.serverError(RouteNotFoundErrorMiddleware);`;
    customExceptionEx = `
    export abstract class CustomException extends Error {
        innerException: Error;
        type: string;
        constructor(message: string, ex?: Error) {
            super(message);
            this.innerException = ex;
            Object.setPrototypeOf(this, new.target.prototype);
        }
    }

    // Extend CustomException
    export class InvalidOrderExceptions extends CustomException {
        constructor(msg: string, innerEx?: Error) {
            super(msg, innerEx);
        }
    }

    const ex = new InvalidOrderException();
    ex instanceof InvalidOrderException; // true`;
}
