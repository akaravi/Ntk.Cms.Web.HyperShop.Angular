
import { AppConfigService } from './core/services/appConfig.service';
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, Inject, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoComponent } from './components/demo/demo.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MainComponent } from './components/main/main.component';
import { SharedModule } from './shared/shared.module';
import { environment } from 'src/environments/environment';
import { CoreAuthService, CoreSiteService, TokenDeviceClientInfoDtoModel, WebDesignerMainIntroService } from 'ntk-cms-api';
import { DOCUMENT, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AccessHelper } from './core/common/helper/accessHelper';
import { SplashComponent } from './pages/splash/splash.component';
import { AppRouting } from './app.routing';
import { NgxImageZoomModule } from 'ngx-image-zoom';

export function appInit(appConfigService: AppConfigService) {
  return () => appConfigService.load();
}

@NgModule({
  declarations: [
    AppComponent,
    DemoComponent,
    MainComponent,
    SplashComponent
  ],
  imports: [
    AppRouting,
    BrowserModule,
    HttpClientModule,
    NgxSpinnerModule,
    SharedModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxImageZoomModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),

  ],
  exports:[

  ],
  providers: [
    CoreAuthService,
    CoreSiteService,
    WebDesignerMainIntroService,
    AccessHelper,
    AppConfigService,

    {
      provide: APP_INITIALIZER,
      useFactory: appInit,
      multi: true,
      deps: [AppConfigService]
    },
    {provide: LocationStrategy, useClass: HashLocationStrategy}

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private coreAuthService: CoreAuthService, @Inject(DOCUMENT) private document: Document, private accessHelper: AccessHelper) {
    // karavi:Important For Test To Local Service
    if (environment.cmsServerConfig.configApiServerPath && environment.cmsServerConfig.configApiServerPath.length > 0) {
      this.coreAuthService.setConfig(environment.cmsServerConfig.configApiServerPath);
    }
  }
}
