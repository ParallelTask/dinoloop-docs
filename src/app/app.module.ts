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
    DocsGuideDeferrerComponent,
    DocsGuideCtrlInheritanceComponent,
    DocsGuideDinowaresFlowComponent,
    DocsGuideParamInjectionComponent,
    DocsGuideUpdateExpressDComponent,
    DocsGuideErrCtrlErrMwareDComponent,
    DocsExamplesResMsgExComponent,
    DocsBuiltInExceptionsComponent,
    DocsBuiltInParseHandlerComponent,
    DocsExamplesExpressjsComponent,
    DocsRoadMapComponent,
    DocsVersionsComponent,
    DocsBuiltInParamValidationsComponent,
    DocsBuiltInModelValidationsComponent
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
