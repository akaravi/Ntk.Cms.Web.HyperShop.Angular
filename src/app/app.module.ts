
import { AppConfigService } from './core/services/appConfig.service';
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, Inject, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoComponent } from './components/demo/demo.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MainComponent } from './pages/main/main.component';
import { SharedModule } from './shared/shared.module';
import { environment } from 'src/environments/environment';
import { CmsStore, CoreAuthService, CoreSiteService, TokenDeviceClientInfoDtoModel, WebDesignerMainIntroService } from 'ntk-cms-api';
import { DOCUMENT, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AccessHelper } from './core/common/helper/accessHelper';
import { SplashComponent } from './pages/splash/splash.component';
import { AppRouting } from './app.routing';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { CmsStoreModule } from './core/reducers/cmsStore.module';
import { CmsToastrService } from './core/services/cmsToastr.service';
import { ToastrModule } from 'ngx-toastr';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function appInit(appConfigService: AppConfigService) {
  return () => appConfigService.load();
}
export function CreateTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
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
    CmsStoreModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxImageZoomModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ToastrModule.forRoot({
      // timeOut: 0,
      timeOut: 5000,
      enableHtml: true,
      positionClass: 'toast-bottom-right',
      // positionClass: "toast-bottom-full-width",
      preventDuplicates: true,
      closeButton: true,
      // extendedTimeOut: 0,
      extendedTimeOut: 1000,
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (CreateTranslateLoader),
        deps: [HttpClient]
      }
    }),


  ],
  exports: [

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
    { provide: LocationStrategy, useClass: HashLocationStrategy }

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(@Inject(CoreAuthService) private coreAuthService: CoreAuthService) {
    // karavi:Important For Test To Local Service
    if (environment.cmsServerConfig.configApiServerPath && environment.cmsServerConfig.configApiServerPath.length > 0) {
      this.coreAuthService.setConfig(environment.cmsServerConfig.configApiServerPath);
    }
  }
}
