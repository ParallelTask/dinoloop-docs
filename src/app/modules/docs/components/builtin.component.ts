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

@Component({
    selector: 'app-builtin-handlers',
    templateUrl: '../templates/builtin-parse-handlers.html',
    styleUrls: ['../docs.component.css']
})
export class DocsBuiltInParseHandlerComponent {
    toNumberEx = `
    @HttpGet('/get/:id')
    get(@Parse(toNumber) id: number) {
        return { data: id };
    }

    GET /get/45 => injects 45
    GET /get/45.27 => injects 45.27
    GET /get/john => throws ActionParamException`;
    toBooleanEx = `
    @HttpGet('/get/:latest')
    get(@Parse(toBoolean) latest: boolean) {
        return { data: latest };
    }`;
    toIntegerEx = `
    // There is no integer type in javascript,
    // so the inferred type will still be number
    @HttpGet('/get/:image')
    get(@Parse(toInteger) image: number) {
        return { data: image };
    }

    GET /get/45 => injects 45
    GET /get/45.27 => throws ActionParamException
    GET /get/john => throws ActionParamException`;
    toParseParamMiddlewareEx = `
    class ActionParamExceptionMiddleware extends ErrorMiddleware {
        invoke(err, request, response, next): void {
            if (err instanceof ActionParamException) {
                response.status(HttpStatusCode.badRequest)
                .json('Value:' + err.value + ', Message: ' + err.message);
            } else next(err);
        }
    }`;
    registerParseParamEx = `
    class CustomActionParamMiddleware extends ErrorMiddleware {
        invoke(err, request, response, next): void {
            if (err instanceof ActionParamException) {
                ... Write logic
            } else next(err);
        }
    }

    // Register at application-level
    dino.serverError(CustomActionParamMiddleware);

    // or Register at controller-level
    @Controller('/home',{
        exceptions: [CustomActionParamMiddleware]
    })
    export class HomeController extends ApiController {

        @HttpGet('get/:id')
        get(@Parse(toInteger) id: number): number {
            return id;
        }
    }`;
    parseHandlerEx = `
    export const toNumber: IParseHandler = (props: IParseProps) => {
        // DataUtility is a utility written by dinoloop authors
        const val = DataUtility.toNumber(props.value);

        if (!(val.isValid)) {
            throw new ActionParamException(
                props.value,
                props.key,
                props.action,
                props.controller.constructor.name,
                'Expected number'
            );
        }

        // return 10;
        // Adding above statement will always inject 10, no matter what you get in request.
        // This also achieves values transformation behavior.

        return val.value;
    }`;
    parseHandlerWithoutDataEx = `
    const toJPG: IParseHandler = (props: IParseProps) => {
        return props.value + '.jpg';
    }

    @HttpGet('/image/:img')
    getImage(@Parse(toJPG) img: string) {
        return { data: img };
    }`;
    parseHandlerWithDataEx = `
    const imgTypeConversion: IParseHandler = (props: IParseProps) => {
        return props.value + props.data;
    }

    @HttpGet('/image/jpg/:img')
    getJPGImage(@Parse(imgTypeConversion, '.jpg') img: string) {
        return { data: img };
    }

    @HttpGet('/image/png/:img')
    getPNGImage(@Parse(imgTypeConversion, '.png') img: string) {
        return { data: img };
    }`;
}

@Component({
    selector: 'app-builtin-param-validations',
    templateUrl: '../templates/param-validations.html',
    styleUrls: ['../docs.component.css']
})
export class DocsBuiltInParamValidationsComponent {
    parseHandlerEx = `
    export const toMaxTen: IParseHandler = (props: IParseProps, model: DinoModel) => {

        if(isNumber(props.value) && props.value <= 10) return props.value;

        // Since model is invalid, set the value to false
        model.isValid = false;

        // Add the parameter value via key-value pair
        model.values.push({
            key: props.key,
            value: props.value
        });

        // Add the validation errors via key-value pair
        model.errors.push({
            key: props.key,
            value: ['Should be Number', 'Maximum value allowed is 10']
        });

        return props.value; // or some undefined or null value
    };

    export const toUUID: IParseHandler =  (props: IParseProps, model: DinoModel) => {
        if(isUUID(props.value)) return props.value;

        // Since model is invalid, set the value to false
        model.isValid = false;

        // Add the parameter value via key-value pair
        model.values.push({
            key: props.key,
            value: props.value
        });

        // Add the validation errors via key-value pair
        model.errors.push({
            key: props.key,
            value: ['Should be UUID']
        });

        return props.value; // or some undefined or null value
    }`;
    controllerEx = `
    @Controller('/home')
    export class HomeController extends ApiController {

        @HttpGet('/user/:id')
        get(@Parse(toMaxTen) id: number, @QueryParam(toUUID) img: string): any {

            const values = this.model.values;
            const errors = this.model.errors;

            // Access 'id' params value and errors
            const idValue = values.filter(x => x.key === 'id')[0].value;
            const idError = errors.filter(x => x.key === 'id')[0].value;

            // Access 'img' params value and errors
            const imgValue = values.filter(x => x.key === 'img')[0].value;
            const imgError = errors.filter(x => x.key === 'img')[0].value;

            if(this.model.isValid) // do required logic
            else {
                return {
                    message: 'Should return validation errors for request',
                    errors: this.model.errors,
                    values: this.model.values
                };
            }
        }
    }

    GET /home/user/101?img=12za`;
}

@Component({
    selector: 'app-builtin-model-validations',
    templateUrl: '../templates/model-validations.html',
    styleUrls: ['../docs.component.css']
})
export class DocsBuiltInModelValidationsComponent {
    joiEx = `
    $ npm install joi --save;`;
    parseHandlerEx = `
    const Joi = require('joi');
    import { IParseHandler, IParseProps, DinoModel } from 'dinoloop';

    // Create schema validations as per Joi documentation
    const schema = Joi.object().keys({
        name: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string().alphanum().min(8).required()
    });

    export const userModel: IParseHandler = (props: IParseProps, model: DinoModel) => {
        const results = Joi.validate(props.value, schema);

        // No errors in model
        if(results.error === null) return props.value;

        // Since model is invalid, set the value to false
        model.isValid = false;

        // Add the parameter value via key-value pair
        model.values.push({
            key: props.key,
            value: props.value
        });

        // Add the validation errors via key-value pair
        model.errors.push({
            key: props.key,
            // Grab the validation errors as mentioned in Joi docs
            value: results.error.details.map(x => x.message)
        });
    }`;
    controllerEx = `
    @Controller('/user')
    export class UserController extends ApiController {

        @HttpPost('/create')
        create(@Parse(userModel) user: User) {
            return {
                isValid. this.model.isValid,
                values: this.model.values,
                errors: this.model.errors
            };
        }
    }`;
    controllerParseEx = `
    import { User } from '/path/to/user';

    @Controller('/user')
    export class UserController extends ApiController {

        // Provide the User type as custom data
        @HttpPost('/create')
        create(@Parse(modelBinder, User) user: User) {
            return {
                isValid. this.model.isValid,
                values: this.model.values,
                errors: this.model.errors
            };
        }
    }`;
    parseHandlerModelEx = `
    const Joi = require('joi');
    import { IParseHandler, IParseProps, DinoModel } from 'dinoloop';

    // user schema validations
    const userSchema = Joi.object().keys({
        name: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string().alphanum().min(8).required()
    });

    // product schema validations
    const productSchema = Joi.object().keys({
        id: Joi.string().alphanum().min(3).max(30).required(),
        price: Joi.string().required()
    });

    export const modelBinder: IParseHandler = (props: IParseProps, model: DinoModel) => {

        let schema;

        if(props.data.constructor.name === 'User') schema = userSchema;
        if(props.data.constructor.name === 'Product') schema = productSchema;

        const results = Joi.validate(props.value, schema);

        // No errors in model
        if(results.error === null) return props.value;

        // Since model is invalid, set the value to false
        model.isValid = false;

        // Add the parameter value via key-value pair
        model.values.push({
            key: props.key,
            value: props.value
        });

        // Add the validation errors via key-value pair
        model.errors.push({
            key: props.key,
            // Grab the validation errors as mentioned in Joi docs
            value: results.error.details.map(x => x.message)
        });
    }`;
}
