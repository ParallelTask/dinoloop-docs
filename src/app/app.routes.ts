import { Route, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { DocsComponent } from './modules/docs/docs.component';
import {
    DocsIntroComponent,
    DocsGettingStartedComponent,
    DocsFaqComponent,
    DocsControllerComponent
} from './modules/docs/components/components';

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
            { path: 'faq', component: DocsFaqComponent },
            { path: 'concepts/controllers', component: DocsControllerComponent }
        ]
    }
];
