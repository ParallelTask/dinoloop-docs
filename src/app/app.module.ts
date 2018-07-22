import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { CommonModule } from '@angular/common';
import { AppRouterModule } from './app.router.module';
import { HeaderComponent } from './modules/core/header/header.component';
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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    DocsComponent,
    DocsIntroComponent,
    DocsGettingStartedComponent,
    DocsFaqComponent,
    DocsControllerComponent,
    DocsCrudAppComponent,
    DocsConceptsDecoratorComponent,
    DocsConceptsApiCtrlComponent,
    DocsConceptsErrCtrlComponent,
    DocsConceptsDinoPropComponent,
    DocsAppMiddlewareComponent,
    DocsConceptsCtrlMiddlewareComponent,
    DocsGuideHttpStatusComponent,
    DocsGuideDeferrerComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRouterModule
  ],
  entryComponents: [
    HomeComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
