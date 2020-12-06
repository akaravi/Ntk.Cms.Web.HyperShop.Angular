
import { AppConfigService } from './core/services/core/appConfig.service';
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, Inject, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoComponent } from './components/demo/demo.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxImgZoomModule } from 'ngx-img-zoom';


import { MainComponent } from './components/main/main.component';

import { AppRoutingModule } from './app-routing.module';
import { ShopModule } from './components/shop/shop.module';
import { SharedModule } from './components/shared/shared.module';
import { environment } from 'src/environments/environment';
import { CoreAuthService, TokenDeviceClientInfoDtoModel } from 'ntk-cms-api';
import { DOCUMENT } from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AccessHelper } from './core/common/helper/accessHelper';
import { SplashComponent } from './components/splash/splash.component';

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
    NgxSpinnerModule,
    BrowserModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxImgZoomModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),

  ],
  exports:[

  ],
  providers: [
    CoreAuthService,
    AccessHelper,
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInit,
      multi: true,
      deps: [AppConfigService]
    },


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
