import {
    NgModule
} from '@angular/core';
import {
    RouterModule,
    DefaultUrlSerializer,
    UrlTree,
    UrlSerializer
} from '@angular/router';
import { AppRouteStates } from './app.routes';

export class LowerCaseUrlSerializer extends DefaultUrlSerializer {
    parse(url: string): UrlTree {
        return super.parse(url.toLowerCase());
    }
}

@NgModule({
    imports: [RouterModule.forRoot(AppRouteStates, { useHash: true })],
    exports: [RouterModule],
    providers: [{
        provide: UrlSerializer,
        useClass: LowerCaseUrlSerializer
    }]
})
export class AppRouterModule { }
