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
