import { Component } from '@angular/core';

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
      dinoloop: '^1.0.0',
      express: '^4.16.3'
    },
    devDependencies: {
      '@types/node': '^10.5.2',
      typescript: '^2.4.2'
    }
  };

  tsconfig = {
    compilerOptions: {
      target: 'es5',
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
  if (result is undefined)) response.status(204).end();
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
  callbackEx = `
  import { Controller, ApiController, HttpGet, SendsResponse } from 'dinoloop';

  @Controller('/home')
  export class HomeController extends ApiController {

    @SendsResponse()
    @HttpGet('/get')
    get(): void {
      setTimeout(() => {
        this.dino.proceed('Returning from setTimeout after 2 seconds');
      }, 2000);
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
  import { Controller, ApiController, HttpGet, Async } from 'dinoloop';

  @Controller('/home')
  export class HomeController extends ApiController {

    private tout(): Promise&lt;string&gt; {

      // Deferrer is dinoloop wrapper to convert callback to promise object
      return Deferrer.run&lt;string&gt;((resolve, reject) => {

        // Native setTimeout js method
        setTimeout(() => {
          // you have to resolve instead of return
          resolve('Response after 2 sec');
        }, 2000);
      });
    }

    // Async methods must be decorated with @Async
    @Async()
    @HttpGet('/get');
    async get(): Promise&lt;string&gt; {
      const result = await tout();
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
  del(): string {
    return 'HttpDelete';
  }`;
  httpGetEx = `
  @HttpGet('/get');
  get(): string {
    return 'HttpGet';
  }`;
  httpHeadEx = `
  @HttpHead('/head');
  head(): string {
    return 'HttpHead';
  }`;
  httpPostEx = `
  // Injects http-body to first parameter
  @HttpPost('/post');
  post(body: any): any {
    return body;
  }

  // With named-segments, params must be added from 2nd parameter
  // body will always be first parameter
  @HttpPost('/post/:id')
  post(body: any, id: string): any {
    return {
     bodyVal: body,
     idVal: id
    };
  }

  // Wrong: body must be first parameter.
  // This would not throw compilation or runtime error but http-body is injected to id.
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
  // 1. NOT RECOMMENDED
  // Responds to GET and POST.
  @HttpGet('/name')
  @HttpPost('/name)
  name(): string {
    return 'Hello World!';
  }

  // 2. Recommended way
  // Responds to GET
  @HttpGet('/name')
  getName(): string {
    return 'GetName';
  }

  // Responds to POST
  @HttpPost('/name')
  postName(): string {
    return 'PostName';
  }`;
  withoutMiddlewaresEx = `
  import { Controller, ApiController, HttpGet } from 'dinoloop';

  @Controller('/home')
  export class HomeController extends ApiController {

    HttpGet('/get');
    get(): string {
      return 'Hello world!';
    }
  }`;
  withMiddlewaresEx = `
  import cors = require('cors');
  import { Controller, ApiController, HttpGet } from 'dinoloop';

  @Controller('/orders', {
    use: [
      // enable cors for this controller - it's an express-ware
      cors(),

      // or have a custom express-ware
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

    @HttpGet('/get');
    get(): string {
      return 'Successfully placed your orders. Yay!';
    }

    @HttpGet('/get/:id');
    getById(id: string): string {
      throw new InvalidOrderException();
    }
  }`;
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
        db.close();
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
        // If you have err handlers on express they might handle or
        // simply crash container
        this.next(this.error);
      } else {
        // If error is not critical and it is recoverable
        this.response.status(500).send('Internal server error occurred');
      }
    }
  }`;
}
