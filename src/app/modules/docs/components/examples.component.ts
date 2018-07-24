import { Component } from '@angular/core';

@Component({
    selector: 'app-ex-exjs-dinoloop',
    templateUrl: '../templates/expressjs-with-dinoloop.html',
    styleUrls: ['../docs.component.css']
})
export class DocsExamplesExpressjsComponent {
    controllerAddEx = `
    import { ApiController, Controller, HttpGet } from 'dinoloop';

    @Controller('/home')
    export class HomeController extends ApiController {

        @HttpGet('/get')
        get(): string {
            return 'Hello World!';
        }
    }`;
    mountDinoloopEx = `
    const app = express();
    app.use(bodyParser.json());

    // Dino requires express instance and base-uri to which dino will be mounted
    const dino = new Dino(app, '/api');

    // Dino requires express router too
    dino.useRouter(() => express.Router());

    // Register controller
    dino.registerController(HomeController);

    // Bind dino to express
    dino.bind();

    // These are your normal express endpoints
    app.get('/home', (req, res, next) => {
        res.status(200).json('Hello World!');
    });

    app.get('/about', (req, res, next) => {
        res.status(200).json('Hello World!');
    });

    // Start your express app
    app.listen(8088, () => console.log('Server started on port 8088'));`;
}

@Component({
    selector: 'app-ex-res-msg-ex',
    templateUrl: '../templates/response-msg-exception.html',
    styleUrls: ['../docs.component.css']
})
export class DocsExamplesResMsgExComponent {
    httpResponseEx = `
    import {
        RequestEndMiddleware,
        Controller,
        ApiController,
        HttpGet,
        HttpStatusCode
    } from 'dinoloop';
    import { Request, Response, NextFunction } from 'express';

    class HttpResponseMessage&lt;T&gt; {
        statusCode: HttpStatusCode;
        content: T;
        // you can also add headers if you want to
    }

    class JsonResult extends RequestEndMiddleware {
        invoke(
            request: Request,
            response: Response,
            next: NextFunction,
            result: any): void {

                // you can set statusCode from result object
                if(result instanceof HttpResponseMessage){
                    response.status(result.statusCode).json(result.content);
                } else{
                    // for other result types, status Ok
                    response.status(HttpStatusCode.Ok).json(result);
                }
        }
    }

    @Controller('/home')
    export class HomeController extends ApiController {

        @HttpGet('/name')
        name(): HttpResponseMessage&lt;string&gt; {
            const response = new HttpResponseMessage&lt;string&gt;();
            response.statusCode = HttpStatusCode.Ok;
            response.content = 'Hello World!';
            return response;
        }

        @HttpGet('/list')
        list(): HttpResponseMessage&lt;string&gt; {
            const response = new HttpResponseMessage&lt;string&gt;()
            response.statusCode = HttpStatusCode.Unauthorized;
            response.content = 'Unauthorized';
            return response;
        }
    }`;
    httpExceptionEx = `
    import {
        ErrorMiddleware,
        Controller,
        ApiController,
        HttpGet,
        HttpStatusCode
    } from 'dinoloop';
    import { Request, Response, NextFunction } from 'express';

    class HttpResponseException&lt;T&gt; extends CustomException {
        statusCode: HttpStatusCode;
        content: T;
        // you can also add headers if you want to
    }

    class HttpException extends ErrorMiddleware {

        invoke(
            err: Error,
            request: Request,
            response: Response,
            next: NextFunction): void {

                // you can set statusCode from err object
                if(err instanceof HttpResponseException){
                    logToDatabase();
                    response.status(err.statusCode).json(err.content);
                } else{
                    // for other exceptions invoke .next() or end response
                    next(err);
                }
        }
    }


    @Controller('/home')
    export class HomeController extends ApiController {

        @HttpGet('/name')
        name(): HttpResponseMessage&lt;string&gt; {

            if(true) {
                const httpException = new HttpResponseException&lt;string&gt;();
                httpException.statusCode = HttpStatusCode.BadRequest;
                httpException.content = 'Invalid Request!';
                throw httpException;
            }

            const response = new HttpResponseMessage&lt;string&gt;();
            response.statusCode = HttpStatusCode.Ok;
            response.content = 'Hello World!';
            return response;
        }
    }`;
}
