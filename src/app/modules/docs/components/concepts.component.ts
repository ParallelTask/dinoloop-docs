import { Component } from '@angular/core';

@Component({
    selector: 'app-docs-dino-prop',
    templateUrl: '../templates/dino-properties.html',
    styleUrls: ['../docs.component.css']
})
export class DocsConceptsDinoPropComponent {
    constructorEx = `
    const app = express();
    const dino = new Dino(app, '/api');`;
    bindEx = `
    const app = express();
    const dino = new Dino(app, '/api');
    dino.registerController(HomeController);
    dino.requestStart(AuthorizeMiddleware);
    dino.bind();`;
    diEx = `
    import { Container } from 'inversify';

    const AppContainer = new Container();
    container.bind(IAboutService).to(AboutService);
    container.bind(IAppConfigService).to(AppConfigService);
    container.bind(HomeController).toSelf();
    container.bind(ApplicationErrorController).toSelf();

    dino.dependencyResolver<Container>(AppContainer, (injector, type) => {
        // Resolve objects from inversify container
        return injector.resolve(type);
    });`;
    injectionEx = `
    import { ReflectiveInjector } from 'injection-js';
    import * as clone from 'lodash.clone';

    dino.dependencyResolver<ReflectiveInjector>(Container, (injector, type) => {
        // always gives same reference since it resolves to singleton
        const i = injector.get(type);

        // clone it, so that you get different reference object
        // you don't need deep clone, lodash.clone works!
        if (i instanceof ApiController) {
            return clone(i);
        }

        // You can hack this trick for other type of objects too.

        return i;
    });
    `;
    expressMountEx = `
    const app = express();
    const router = express.Router();

    // Create middleware on /admin
    app.use('/admin', (req, res, next) => {
        console.log('admin mounted path middleware');
        next();
    });

    // Create routes/endpoints
    router.get('/home', function (req, res) {
        res.send('hello, user!')
    });

    // Use /admin middleware
    app.use('/admin', router);`;
    errCtrlEx = `
    class ApplicationErrorController extends ErrorController {
        internalServerError(): void {
            this.res.status(HttpStatusCode.internalServerError).json('InternalError');
        }
    }

    dino.registerApplicationError&lt;ApplicationErrorController&gt;(ApplicationErrorController);
    // or
    dino.registerApplicationError(ApplicationErrorController);`;
    ctrlEx = `
    dino.registerController&lt;HomeController&gt;(HomeController);
    // or
    dino.registerController(HomeController)`;
    requestStartEx = `
    dino.requestStart&lt;LogRequestStart&gt;(LogRequestStart);
    dino.requestStart&lt;OtherRequestStart&gt;(OtherRequestStart);`;
    requestEndEx = `
    dino.requestEnd&lt;LogRequestEnd&gt;(LogRequestEnd);
    dino.requestEnd&lt;OtherRequestEnd&gt;(OtherRequestEnd);`;
    serverErrorEx = `
    dino.serverError&lt;FormatException&gt;(FormatException);
    dino.serverError&lt;MongoException&gt;(MongoException);`;
    routerEx = `
    dino.useRouter(() => express.Router());`;
}

@Component({
    selector: 'app-docs-app-mware',
    templateUrl: '../templates/app-middlewares.html',
    styleUrls: ['../docs.component.css']
})
export class DocsAppMiddlewareComponent {
    requestStartEx = `
    import { RequestStartMiddleware } from 'dinoloop';
    import { Request, Response, NextFunction } from 'express';

    export class RequestLogMiddleware extends RequestStartMiddleware {

        invoke(request: Request, response: Response, next: NextFunction): void {
            ... logic to validate headers or log the request
            // invalid headers
            if(invalid) next(new Error('InvalidHeadersException');

            // pass on to next middleware
            else next();
        }
    }`;
    requestStartDIEx = `
    import { RequestStartMiddleware } from 'dinoloop';
    import { Request, Response, NextFunction } from 'express';

    export class RequestLogMiddleware extends RequestStartMiddleware {

        constructor(authService: IAuthService) { }

        invoke(request: Request, response: Response, next: NextFunction): void {
            authService.validate();
            next();
        }
    }`;
    requestStartAsyncEx = `
    import { RequestStartMiddlewareAsync } from 'dinoloop';
    import { Request, Response, NextFunction } from 'express';

    export class RequestLogMiddlewareAsync extends RequestStartMiddlewareAsync {
        async invoke(request: Request, response: Response, next: NextFunction): Promise&lt;void&gt; {
            await ...operation;
            // invalid headers
            if(invalid) next(new InvalidHeadersException());
            else next();
        }
    }`;
    requestEndEx = `
    import { RequestEndMiddleware } from 'dinoloop';
    import { Request, Response, NextFunction } from 'express';

    export class JsonResult extends RequestEndMiddleware {

        invoke(request: Request, response: Response, next: NextFunction, result: any): void {

            // It is super easy to have common response
            response.json({
                status: 200,
                data: result,
                errors: []
            });
        }
    }`;
    requestEndAsyncEx = `
    import { RequestEndMiddlewareAsync } from 'dinoloop';
    import { Request, Response, NextFunction } from 'express';

    export class JsonResultAsync extends RequestEndMiddlewareAsync {
        async invoke(request: Request, response: Response, next: NextFunction, result: any): Promise&lt;void&gt; {
            await ...operation;
            response.json({
                status: 200,
                data: result,
                errors: []
            });
        }
    }`;
    serverErrorEx = `
    import { ErrorMiddleware } from 'dinoloop';
    import { Request, Response, NextFunction } from 'express';

    export class InvalidHeaderMiddleware extends ErrorMiddleware {

        invoke(err: Error, request: Request, response: Response, next: NextFunction): void {

            // handle it
            if(err instanceof InvalidHeaderException) {
                logToDb(err);
                this.response.json('InvalidRequest');
            } else {
                // pass on to next error middleware
                next(err);
            }
        }
    }`;
    serverErrorAsyncEx = `
    import { ErrorMiddlewareAsync } from 'dinoloop';
    import { Request, Response, NextFunction } from 'express';

    export class InvalidHeaderMiddlewareAsync extends ErrorMiddlewareAsync {

        async invoke(err: Error, request: Request, response: Response, next: NextFunction): Promise<void> {
            // handle it
            if(err instanceof InvalidHeaderException) {
                await logToDb(err);
                this.response.json('InvalidRequest');
            } else {
                // pass on to next error middleware
                next(err);
            }
        }
    }`;
    appMwareEx = `
    // This is how you register RequestStartMiddleware and RequestStartMiddlewareAsync
    dino.requestStart(RequestLogMiddleware);
    dino.requestStart(RequestLogMiddlewareAsync);

    // This is how you register RequestEndMiddleware and RequestEndMiddlewareAsync
    dino.requestEnd(JsonResult);
    dino.requestEnd(JsonResultAsync);

    // This is how you register ErrorMiddleware and ErrorMiddlewareAsync
    dino.serverError(InvalidHeaderMiddleware);
    dino.serverError(InvalidHeaderMiddlewareAsync);`;
}

@Component({
    selector: 'app-docs-ctrl-mware',
    templateUrl: '../templates/ctrl-middlewares.html',
    styleUrls: ['../docs.component.css']
})
export class DocsConceptsCtrlMiddlewareComponent {
    useEx = `
    @Controller('/home',{
        use: [
            // native express middlewares
            cors(),
            bodyParser(),

            // or just have your custom express middleware
            // do not forget to invoke next()
            (req, res, next) => {
                ... add logic
                next();
            }
        ]
    })
    export class HomeController extends ApiController {
        ... add action methods
    }`;
    dinowareEx = `
    import { Middleware } from 'dinoloop';
    import { Request, Response, NextFunction } from 'express';

    export class LogMiddleware extends Middleware {

        invoke(request: Request, response: Response, next: NextFunction): void {
            ... add logic
            // pass on to next middleware
            next();
        }
    }

    @Controller('/home', {
        middlewares: [LogMiddleware]
    })
    export class HomeController extends ApiController {
        ... add action methods
    }`;
    dinowareDataEx = `
    import { Middleware } from 'dinoloop';
    import { Request, Response, NextFunction } from 'express';

    export class LogMiddleware extends Middleware {

        invoke(request: Request, response: Response, next: NextFunction, data?: any): void {
            // If user holds admin role
            if(data.role === request.locals.role){
                next();
            } else {
                // InvalidRoleException is your custom error/exception
                next(new InvalidRoleException());
            }
        }
    }

    @Controller('/home', {
        middlewares: [
            {
                useClass: LogMiddleware,
                data: { role: 'admin' }
            }
        ]
    })
    export class HomeController extends ApiController {
        ... add action methods
    }`;
    dinowareAsyncEx = `
    import { MiddlewareAsync } from 'dinoloop';
    import { Request, Response, NextFunction } from 'express';

    export class LogMiddlewareAsync extends MiddlewareAsync {

        async invoke(request: Request, response: Response, next: NextFunction): Promise&lt;void&gt; {
            await ...operation;
            next();
        }
    }

    @Controller('/home', {
        middlewares: [LogMiddlewareAsync]
    })
    export class HomeController extends ApiController {
        ... add action methods
    }`;
    filterEx = `
    import { ActionFilter } from 'dinoloop';
    import { Request, Response, NextFunction } from 'express';

    export class LogFilter extends ActionFilter {

        beforeExecution(request: Request, response: Response, next: NextFunction): void {
            ... log request headers
            // proceed to action method
            next();
        }

        afterExecution(request: Request, response: Response, next: NextFunction, result: any): void {
            ... log(result)
            // proceed to next middleware
            next();
        }
    }

    @Controller('/home',{
        filters: [LogFilter]
    })
    ... add action methods`;
    filterAsyncEx = `
    import { ActionFilterAsync } from 'dinoloop';
    import { Request, Response, NextFunction } from 'express';

    export class LogFilterAsync extends ActionFilterAsync {
        async beforeExecution(
            request: Request,
            response: Response,
            next: NextFunction,
            data?: any): Promise&lt;void&gt; {
                ... log request headers
                // proceed to action method
                next();
        }

        async afterExecution(
            request: Request,
            response: Response,
            next: NextFunction,
            result: any,
            data?:any): Promise&lt;void&gt; {
                ... log(result)
                // proceed to next middleware
                next();
        }
    }

    @Controller('/home',{
        filters: [
            {
                useClass: LogFilterAsync,
                data: { role: 'admin' }
            }
        ]
    })
    ... add action methods`;
    resultEx = `
    import { ResultFilter } from 'dinoloop';
    import { Request, Response, NextFunction } from 'express';

    export class XmlResultFilter extends ResultFilter  {

        invoke(request: Request, response: Response, next: NextFunction, result: any): void {
            // return Xml response instead of Json
            // add this result filter to controllers that needs XML response.
            response.send(xml(result));
        }
    }

    @Controller('/home', {
        result: [XmlResultFilter]
    })
    export class HomeController extends ApiController {}
    ... add action methods`;
    resultAsyncEx = `
    import { ResultFilterAsync } from 'dinoloop';
    import { Request, Response, NextFunction } from 'express';

    export class XmlFilterAsync extends ResultFilterAsync  {

        async invoke(
            request: Request,
            response: Response,
            next: NextFunction,
            result: any,
            data?: any): Promise&lt;void&gt; {
                await ...;
                response.send(xml(result));
        }
    }

    @Controller('/home', {
        result: [
            {
                useClass: XmlFilterAsync,
                data: {}
            }
        ]
    })
    export class HomeController extends ApiController {}
    ... add action methods`;
    exceptionEx = `
    import { ExceptionFilter } from 'dinoloop';
    import { Request, Response, NextFunction } from 'express';

    export class InvalidOrderExceptionFilter extends ExceptionFilter {

        invoke(err: Error, request: Request, response: Response, next: NextFunction): void {

            if(err instanceof InvalidOrderException) {
                ... perform some operation
                this.response.json('InvalidRequest');
            } else {
                // pass on to next error middleware
                next(err);
            }
        }
    }

    @Controller('/orders',{
        exceptions: [InvalidOrderExceptionFilter]
    })
    export class OrdersController extends ApiController {
        @HttpGet('/throw')
        thr(): void {
            throw new InvalidOrderException('It is an invalid orderId');
        }
    }`;
    exceptionAsyncEx = `
    import { ExceptionFilterAsync } from 'dinoloop';
    import { Request, Response, NextFunction } from 'express';

    export class InvalidOrderExceptionFilterAsync extends ExceptionFilterAsync {

        async invoke(err: Error, request: Request, response: Response, next: NextFunction): Promise&lt;void&gt; {

            if(err instanceof InvalidOrderException) {
                ... perform some operation
                this.response.json('InvalidRequest');
            } else {
                // pass on to next error middleware
                next(err);
            }
        }
    }

    @Controller('/orders',{
        exceptions: [InvalidOrderExceptionFilter]
    })
    ... add action methods`;
}
