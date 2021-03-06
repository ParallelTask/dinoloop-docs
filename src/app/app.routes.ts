import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { DocsComponent } from './modules/docs/docs.component';
import {
    DocsIntroComponent,
    DocsGettingStartedComponent,
    DocsFaqComponent,
    DocsControllerComponent,
    DocsCrudAppComponent,
    DocsConceptsDecoratorComponent,
    DocsConceptsApiCtrlComponent,
    DocsConceptsErrCtrlComponent,
    DocsRoadMapComponent,
    DocsVersionsComponent
} from './modules/docs/components/components';
import {
    DocsConceptsDinoPropComponent,
    DocsAppMiddlewareComponent,
    DocsConceptsCtrlMiddlewareComponent
} from './modules/docs/components/concepts.component';
import {
    DocsGuideHttpStatusComponent,
    DocsGuideDeferrerComponent,
    DocsGuideCtrlInheritanceComponent,
    DocsGuideDinowaresFlowComponent,
    DocsGuideParamInjectionComponent,
    DocsGuideUpdateExpressDComponent,
    DocsGuideErrCtrlErrMwareDComponent
} from './modules/docs/components/guide.component';
import {
    DocsExamplesResMsgExComponent,
    DocsExamplesExpressjsComponent
} from './modules/docs/components/examples.component';
import {
    DocsBuiltInExceptionsComponent,
    DocsBuiltInParseHandlerComponent,
    DocsBuiltInParamValidationsComponent,
    DocsBuiltInModelValidationsComponent
} from './modules/docs/components/builtin.component';

export const AppRouteStates: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'docs',
        component: DocsComponent,
        children: [
            { path: '', redirectTo: 'intro', pathMatch: 'full' },
            { path: 'intro', component: DocsIntroComponent },
            { path: 'getting-started', component: DocsGettingStartedComponent },
            { path: 'todo-app', component: DocsCrudAppComponent },
            { path: 'faq', component: DocsFaqComponent },
            { path: 'releases', component: DocsRoadMapComponent },
            { path: 'versions', component: DocsVersionsComponent },
            { path: 'concepts/controllers', component: DocsControllerComponent },
            { path: 'concepts/decorators', component: DocsConceptsDecoratorComponent },
            { path: 'concepts/api-controller', component: DocsConceptsApiCtrlComponent },
            { path: 'concepts/error-controller', component: DocsConceptsErrCtrlComponent },
            { path: 'concepts/dino-properties', component: DocsConceptsDinoPropComponent },
            { path: 'middlewares/app-middlewares', component: DocsAppMiddlewareComponent },
            { path: 'middlewares/controller-middlewares', component: DocsConceptsCtrlMiddlewareComponent },
            { path: 'guide/http-codes', component: DocsGuideHttpStatusComponent },
            { path: 'guide/deferrer', component: DocsGuideDeferrerComponent },
            { path: 'guide/ctrl-inheritance', component: DocsGuideCtrlInheritanceComponent },
            { path: 'guide/dinowares-flow', component: DocsGuideDinowaresFlowComponent },
            { path: 'guide/param-injection', component: DocsGuideParamInjectionComponent },
            { path: 'guide/update-expressd', component: DocsGuideUpdateExpressDComponent },
            { path: 'guide/errctrl-errmware', component: DocsGuideErrCtrlErrMwareDComponent },
            { path: 'examples/using-expressjs', component: DocsExamplesExpressjsComponent },
            { path: 'examples/response-msg-exception', component: DocsExamplesResMsgExComponent },
            { path: 'builtin/exceptions', component: DocsBuiltInExceptionsComponent },
            { path: 'builtin/parse-handlers', component: DocsBuiltInParseHandlerComponent },
            { path: 'builtin/param-validations', component: DocsBuiltInParamValidationsComponent },
            { path: 'builtin/model-validations', component: DocsBuiltInModelValidationsComponent }
        ]
    }
];
