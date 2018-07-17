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
  if (result is undefined)) {
    response.status(204).end();
  } else {
    response.status(200).json(result);
  }`;
  sendsResponseUsed = `
    @SendsResponse()
    @HttpGet('/get/:img')
    get(img: string): void {
      this.response.download(img + '.jpg');
    }
  `;
  callbackEx = `
    @SendsResponse()
    @HttpGet('/get')
    get(): void {
      setTimeout(() => {
        this.dino.proceed('Returning from setTimeout after 2 seconds');
      }, 2000);
    }
  `;
}
