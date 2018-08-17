import { Component } from '@angular/core';

@Component({
  selector: 'app-docs-versions',
  templateUrl: '../templates/versions.html',
  styleUrls: ['../docs.component.css']
})
export class DocsVersionsComponent { }

@Component({
  selector: 'app-docs-road-map',
  templateUrl: '../templates/road-map.html',
  styleUrls: ['../docs.component.css']
})
export class DocsRoadMapComponent { }

@Component({
  selector: 'app-docs-intro',
  templateUrl: '../templates/intro.html',
  styleUrls: ['../docs.component.css']
})
export class DocsIntroComponent { }

@Component({
  selector: 'app-docs-getting-started',
  templateUrl: '../templates/getting-started.html',
  styleUrls: ['../docs.component.css']
})
export class DocsGettingStartedComponent { }

@Component({
  selector: 'app-docs-crud-app',
  templateUrl: '../templates/crud-app.html',
  styleUrls: ['../docs.component.css']
})
export class DocsCrudAppComponent {
  package = {
    name: 'dinoloop-crud',
    version: '1.0.0',
    scripts: {
      build: 'tsc --p ./tsconfig.json',
      start: 'npm run build && node dist/app.js'
    },
    dependencies: {
      dinoloop: '^2.1.0',
      express: '^4.16.3'
    },
    devDependencies: {
      '@types/node': '^10.5.2',
      typescript: '^2.4.2'
    }
  };

  tsconfig = {
    compilerOptions: {
      target: 'es6',
      module: 'commonjs',
      moduleResolution: 'node',
      emitDecoratorMetadata: true,
      experimentalDecorators: true,
      lib: ['es2017'],
      typeRoots: ['node_modules/@types'],
      outDir: './dist'
    },
    exclude: ['node_modules', 'dist']
  };

  homeController = `
  import { ApiController, Controller, HttpGet } from 'dinoloop';

  // Sets baseUri for all action methods
  @Controller('/home')
  export class HomeController extends ApiController {

    // Responds to HttpGet request
    @HttpGet('/get')
    get(): string {
      return 'Hello World!';
    }
  }
`;

  appts = `
  import express = require('express');
  import { Dino } from 'dinoloop';
  import { HomeController } from './home.controller';

  const app = express();

  // Dino requires express instance
  // and base-uri to which dino will be mounted
  const dino = new Dino(app, '/api');

  // Dino requires express router too,
  // notice it accepts handler that resolves to express.Router
  dino.useRouter(() => express.Router());

  // Register controller
  dino.registerController(HomeController);

  // Bind dino to express,
  // Invoke it before starting the express server
  dino.bind();

  // Start your express app
  app.listen(8088, () => console.log('Server started on port 8088'));
`;
}

@Component({
  selector: 'app-docs-faq',
  templateUrl: '../templates/faq.html',
  styleUrls: ['../docs.component.css']
})
export class DocsFaqComponent { }

@Component({
  selector: 'app-docs-controllers',
  templateUrl: '../templates/controllers.html',
  styleUrls: ['../docs.component.css']
})
export class DocsControllerComponent {
  homeController = `
  import { ApiController, Controller } from 'dinoloop';

  @Controller('/home')
  export class HomeController extends ApiController { }`;

  actionMethod = `
  import { ApiController, Controller } from 'dinoloop';

  @Controller('/home')
  export class HomeController extends ApiController {

    @HttpGet('/get')
    get(): string {
      return 'HomeController';
    }

    @HttpGet('/get/user/:id')
    getUser(id: string): string {
      return id;
    }
  }`;

  responseEndMiddleware = `
  if (result === undefined) response.status(204).end();
  else response.status(200).json(result);`;
  sendsResponseUsed = `
  import { Controller, ApiController, HttpGet, SendsResponse } from 'dinoloop';

  @Controller('/home')
  export class HomeController extends ApiController {

    @SendsResponse()
    @HttpGet('/get/:img')
    get(img: string): void {
      this.response.download(img + '.jpg');
    }
  }`;
}

@Component({
  selector: 'app-docs-attributes',
  templateUrl: '../templates/decorators.html',
  styleUrls: ['../docs.component.css']
})
export class DocsConceptsDecoratorComponent {
  asyncEx = `
  import { Controller, ApiController, HttpGet, Async, Deferrer } from 'dinoloop';

  @Controller('/home')
  export class HomeController extends ApiController {

    async private tout(): Promise&lt;string&gt; {

      // Deferrer is dinoloop wrapper to convert callback to promise object
      const prom = Deferrer.run&lt;string&gt;((resolve, reject) => {
        setTimeout(() => {
          // you have to resolve instead of return
          resolve('Response after 2 sec');
        }, 2000);
      });

      return prom;
    }

    // Async endpoints must be decorated with @Async
    @Async()
    @HttpGet('/get');
    async get(): Promise&lt;string&gt; {
      const result = await this.tout();
      return result;
    }
  }`;
  httpAllEx = `
  @HttpAll('/all');
  all(): string {
    return 'HttpAll';
  }`;
  httpDeleteEx = `
  @HttpDelete('/del');
  del(): void {
    return;
  }`;
  httpGetEx = `
  @HttpGet('/get');
  get(): string {
    return 'HttpGet';
  }`;
  httpHeadEx = `
  @HttpHead('/head');
  head(): void {
    return;
  }`;
  httpPostEx = `
  // Injects http-body to first parameter
  @HttpPost('/post');
  post(body: any): any {
    return body;
  }

  // If you have variable-segments in HttpPost route,
  // variable-segment params must be added from 2nd parameter
  // body will always be injected to first parameter
  @HttpPost('/post/:id')
  post(body: any, id: string): any {
    return {
     bodyVal: body,
     idVal: id
    };
  }

  // Wrong: body must be first parameter.
  // This would not throw compilation or mapping error but silently injects http-body to id.
  @HttpPost('/post/:id')
  post(id: string, body: any): any {
    return {
     bodyVal: body,
     idVal: id
    };
  }`;
  httpPatchEx = `
  @HttpPatch('/patch');
  patch(): string {
    return 'HttpPatch';
  }`;
  httpPutEx = `
  @HttpPut('/put');
  put(): string {
    return 'HttpPut';
  }`;
  sendsResponseEx = `
  @SendsResponse()
  @HttpGet('/download')
  download(): void {
    // .download() is the expressjs method
    this.response.download('path/to/file/');
  }

  @SendsResponse()
  @HttpGet('/get')
  get(): void {
    // Send response after 2 seconds.
    setTimeout(() => {
      this.response
        .status(HttpStatusCode.ok)
        .json('Response sent after 2 seconds!');
    }, 2000);
  }`;
  multipleVerbsEx = `
  // Responds to GET and POST.
  @HttpGet('/name')
  @HttpPost('/name)
  name(): string {
    return 'Hello World!';
  }`;
  withoutMiddlewaresEx = `
  import { Controller, ApiController, HttpGet } from 'dinoloop';

  @Controller('/home')
  export class HomeController extends ApiController {

    HttpGet('/get')
    get(): string {
      return 'Hello world!';
    }
  }`;
  withMiddlewaresEx = `
  import cors = require('cors');
  import { Controller, ApiController, HttpGet } from 'dinoloop';

  @Controller('/orders', {
    use: [
      // enable cors for this controller - it's an expressjs middleware
      cors(),

      // or have an inline expressjs middleware
      (req, res, next) => {
        ... add logic
        next();
      }
    ],
    middlewares: [
      // Authorization logic
      AuthorizeMiddlewareAsync
    ],
    filters: [
      // Log request and response of endpoint
      LogActionFilter
    ],
    results: [
      // Override JSON with XML response
      XMLResult
    ],
    exceptions: [
      // Handle invalid order exceptions
      InvalidOrderException
    ]
  })
  export class OrdersController extends ApiController {

    @HttpGet('/get')
    get(): string {
      return 'Successfully placed your orders. Yay!';
    }

    @HttpGet('/get/:id')
    getById(id: string): string {
      throw new InvalidOrderException();
    }
  }`;
  withoutParseEx = `
  @HttpGet('/get/:id');
  get(id: string): any {
    return { data: id };
  }

  // The value is of string type
  GET /get/45
  { "data": "45" }`;
  parseEx = `
  import { HttpGet, Parse, toNumber } from 'dinoloop';

  @HttpGet('/get/:id');
  get(@Parse(toNumber) id: number): any {
    return { data: id };
  }

  // The value is of number type (no quotes)
  GET /get/45
  { "data": 45 }`;
  queryParamEx = `
  @HttpGet('/user/:id');
  get(@Parse(toNumber) id: number, @QueryParam() search: string): any {
    return { id: id, search: search };
  }

  GET /user/45?search=photos`;
}

@Component({
  selector: 'app-docs-api-ctrl',
  templateUrl: '../templates/api-controller.html',
  styleUrls: ['../docs.component.css']
})
export class DocsConceptsApiCtrlComponent {
  callbackEx = `
  import { Controller, ApiController, HttpGet, SendsResponse } from 'dinoloop';

  @Controller('/home')
  export class HomeController extends ApiController {

    @SendsResponse()
    @HttpGet('/end')
    end(): void {
      // This is how you end the response using express.Response object
      this.response.status(200).json('Ended Response');
    }

    @SendsResponse()
    @HttpGet('/get')
    get(): void {

      const req = this.request; // complete access to express.request object
      const res = this.response; // complete access to express.response object
      const next = this.next; // complete access to express.next handler

      setTimeout(() => {
        // proceeds the result to next middleware in the dinoloop chain
        this.dino.proceed('Returning from setTimeout after 2 seconds');
      }, 2000);
    }
  }`;
  dinoThrowEx = `
  import { UserException, Controller, HttpGet, ApiController, ExceptionFilter } from 'dinoloop';

  // Create MongoConnectException
  class MongoConnectException extends UserException {
    constructor(msg: string, innerEx?: Error){
      super(msg, innerEx);
    }
  }

  // Create MongoConnectExceptionFilter
  class MongoConnectExceptionFilter extends ExceptionFilter {
    invoke(err: Error, request: Request, response: Response, next: NextFunction): void {

      if(err instanceof MongoConnectException) {
        ... logToDB();
        this.response.status(500).json('ServerBusy');
      } else {
        // pass on to next error middleware
        next(err);
      }
    }
  }

  @Controller('/home', {
    exceptions: [MongoConnectExceptionFilter]
  })
  export class HomeController extends ApiController {

    @HttpGet('/get')
    get(): void {
      MongoClient.connect("XXXX", (err, db) => {
        if (err) this.dino.throw(new MongoConnectException());
        ...;
      });
    }
  }`;
}

@Component({
  selector: 'app-docs-error-ctrl',
  templateUrl: '../templates/error-controller.html',
  styleUrls: ['../docs.component.css']
})
export class DocsConceptsErrCtrlComponent {
  internalErrorEx = `
  export class ApplicationError extends ErrorController {

    internalServerError(): void {
      logToDatabase(this.error);

      // Need to crash container?
      if(this.error instanceof SystemFaultedException) {
        // This error is now gone out of dino's control.
        // If you have err handlers on expressjs they might handle or
        // simply crash container
        this.next(this.error);
      } else {
        // If error is not critical and it is recoverable
        this.response.status(500).send('Internal server error occurred');
      }
    }
  }`;
}
