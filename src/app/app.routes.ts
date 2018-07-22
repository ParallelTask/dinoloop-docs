import { Route, Routes } from '@angular/router';
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
    DocsConceptsErrCtrlComponent
} from './modules/docs/components/components';
import {
    DocsConceptsDinoPropComponent,
    DocsAppMiddlewareComponent,
    DocsConceptsCtrlMiddlewareComponent
} from './modules/docs/components/concepts.component';
import {
    DocsGuideHttpStatusComponent, DocsGuideDeferrerComponent
} from './modules/docs/components/guide.component';

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
            { path: 'concepts/controllers', component: DocsControllerComponent },
            { path: 'concepts/decorators', component: DocsConceptsDecoratorComponent },
            { path: 'concepts/api-controller', component: DocsConceptsApiCtrlComponent },
            { path: 'concepts/error-controller', component: DocsConceptsErrCtrlComponent },
            { path: 'concepts/dino-properties', component: DocsConceptsDinoPropComponent },
            { path: 'middlewares/app-middlewares', component: DocsAppMiddlewareComponent },
            { path: 'middlewares/controller-middlewares', component: DocsConceptsCtrlMiddlewareComponent },
            { path: 'guide/http-codes', component: DocsGuideHttpStatusComponent },
            { path: 'guide/deferrer', component: DocsGuideDeferrerComponent }
        ]
    }
];
