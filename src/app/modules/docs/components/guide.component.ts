import { Component } from '@angular/core';

@Component({
    selector: 'app-guide-http-codes',
    templateUrl: '../templates/http-code.html',
    styleUrls: ['../docs.component.css']
})
export class DocsGuideHttpStatusComponent {
    statusCodesEx = `
    import { HttpStatusCode, Controller, SendsResponse, HttpGet, ApiController } from 'dinoloop';

    @Controller('/home')
    export class HomeController extends ApiController {
        @SendsResponse()
        @HttpGet('/get')
        get(): void {
            this.response.status(HttpStatusCode.oK).json('Served');
        }
    }

    // Following are the list of http status codes
    continue = 100,
    switchingProtocols = 101,
    oK = 200,
    created = 201,
    accepted = 202,
    nonAuthoritativeInformation = 203,
    noContent = 204,
    resetContent = 205,
    partialContent = 206,
    multipleChoices = 300,
    ambiguous = 300,
    movedPermanently = 301,
    moved = 301,
    found = 302,
    redirect = 302,
    seeOther = 303,
    redirectMethod = 303,
    notModified = 304,
    useProxy = 305,
    unused = 306,
    temporaryRedirect = 307,
    redirectKeepVerb = 307,
    badRequest = 400,
    unauthorized = 401,
    paymentRequired = 402,
    forbidden = 403,
    notFound = 404,
    methodNotAllowed = 405,
    notAcceptable = 406,
    proxyAuthenticationRequired = 407,
    requestTimeout = 408,
    conflict = 409,
    gone = 410,
    lengthRequired = 411,
    preconditionFailed = 412,
    requestEntityTooLarge = 413,
    requestUriTooLong = 414,
    unsupportedMediaType = 415,
    requestedRangeNotSatisfiable = 416,
    expectationFailed = 417,
    upgradeRequired = 426,
    internalServerError = 500,
    notImplemented = 501,
    badGateway = 502,
    serviceUnavailable = 503,
    gatewayTimeout = 504,
    httpVersionNotSupported = 505`;
}

@Component({
    selector: 'app-guide-deferrer',
    templateUrl: '../templates/deferrer.html',
    styleUrls: ['../docs.component.css']
})
export class DocsGuideDeferrerComponent {
    deferrerEx = `
    import { Controller, ApiController, HttpGet, Async, Deferrer } from 'dinoloop';

    @Controller('/home')
    export class HomeController extends ApiController {

        async private tout(): Promise&lt;string&gt; {

            // Deferrer converts native callback operations to promise object
            const prom = Deferrer.run&lt;string&gt;((resolve, reject) => {
                setTimeout(() => {
                    // you have to resolve instead of return
                    resolve('Response after 2 sec');

                    // If you reject, it will enter catch block of exception handling
                    if(true) reject(new Error('TestThrown'));
                }, 2000);
            });

            return prom;
        }

        @Async()
        @HttpGet('/get');
        async get(): Promise&lt;string&gt; {
            const result = await tout();
            return result;
        }
    }`;
}

@Component({
    selector: 'app-guide-ctrl-inheritance',
    templateUrl: '../templates/ctrl-inheritance.html',
    styleUrls: ['../docs.component.css']
})
export class DocsGuideCtrlInheritanceComponent {
    inheritanceEx = `
    @Controller('', {
        middlewares: [AuthorizeMiddleware]
    })
    export class AuthorizeController extends ApiController{ }

    @Controller('/home')
    export class HomeController extends AuthorizeController {

        @HttpGet('/get')
        get(): string {
            return 'Home Page';
        }
    }

    @Controller('/about')
    export class AboutController extends AuthorizeController {

        @HttpGet('/get')
        get(): string {
            return 'About Page';
        }
    }

    // No Authorization
    @Controller('/contact')
    export class ContactController extends ApiController {

        @HttpGet('/get')
        get(): string {
            return 'Contact Page';
        }
    }`;
}

@Component({
    selector: 'app-guide-dinowares-flow',
    templateUrl: '../templates/dinowares-flow.html',
    styleUrls: ['../docs.component.css']
})
export class DocsGuideDinowaresFlowComponent { }

@Component({
    selector: 'app-guide-param-injection',
    templateUrl: '../templates/param-injection.html',
    styleUrls: ['../docs.component.css']
})
export class DocsGuideParamInjectionComponent {
    paramEx = `
    @Controller('/home')
    export class HomeController extends ApiController {

        @HttpGet('/get/:img')
        getImage(img: string) {
            return { imgVal: img };
        }

        @HttpGet('/user/:id/images/:photo')
        getImage(id: string, photo: string) {
            return { idVal: id, photoVal: photo };
        }

        // for POST requests, Injects http-body to first parameter
        @HttpPost('/post')
        post(body: any): any {
            return body;
        }

        // POST request With variable segments
        // params must be added from 2nd parameter
        // body will always be injected to 1st parameter
        @HttpPost('/post/:id')
        post(body: any, id: string): any {
            return {
                bodyVal: body,
                idVal: id
            };
        }

        // Wrong: body must be first parameter
        // This would not throw compilation or runtime error but http-body is injected to id.
        @HttpPost('/post/:id')
        post(id: string, body: any): any {
            return {
                bodyVal: body,
                idVal: id
            };
        }
    }`;
    parseEx = `
    @Controller('/home')
    export class HomeController extends ApiController {

        @HttpGet('/get/:id')
        getImage(@Parse(toNumber) id: number) {
            return { idVal: id };
        }
    }`;
    queryParamEx = `
    @Controller('/home')
    export class HomeController extends ApiController {

        // GET /home/get?filter=mobiles
        @HttpGet('/get')
        getImage(@QueryParam() filter: string) {
            return { filter: filter };
        }

        // GET /home/get/mobiles?minRate=1000&used=false
        @HttpGet('/get/mobiles')
        getImage(@QueryParam(toNumber) minRate: number, @QueryParam(toBoolean) used: boolean) {
            return { minRate: minRate, used: used };
        }
    }`;
}

@Component({
    selector: 'app-guide-update-express',
    templateUrl: '../templates/update-express.html',
    styleUrls: ['../docs.component.css']
})
export class DocsGuideUpdateExpressDComponent {
    installEx = `
    $ npm install @types/express@4.x --save-dev`;
    typesEx = `
    import { Request, Response, NextFunction, Express, Router } from '../../../@types/express';

    export declare type Express = Express;
    export declare type Router = Router;
    export declare type Request = Request;
    export declare type Response = Response;
    export declare type NextFunction = NextFunction;`;
}

@Component({
    selector: 'app-guide-err-ctrl-err-mware',
    templateUrl: '../templates/err-ctrl-err-mware.html',
    styleUrls: ['../docs.component.css']
})
export class DocsGuideErrCtrlErrMwareDComponent {
    errCtrlEx = `
    import { ErrorController } from 'dinoloop';

    export class ApplicationErrorController extends ErrorController {
        internalServerError(): void {
            this.response.status(500).send('Internal server error occurred');
        }
    }`;
}
