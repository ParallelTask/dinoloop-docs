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
        // always give same reference since it resolves to singleton
        const i = injector.get(type);

        // clone it, so that you get different reference object
        // you don't need deep clone, lodash.clone works!
        if (i instanceof ApiController) {
            return clone(i);
        }

        // You can do it for other type of instances too.

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
