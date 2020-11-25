import { BrowserModule } from '@angular/platform-browser';
import { Inject, NgModule } from '@angular/core';
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


@NgModule({
  declarations: [
    AppComponent,
    DemoComponent,
    MainComponent



  ],
  imports: [
    NgxSpinnerModule,
    BrowserModule,
    SharedModule,
    ShopModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxImgZoomModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    CoreAuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private coreAuthService: CoreAuthService, @Inject(DOCUMENT) private document: Document) {
    // karavi:Important For Test To Local Service
    if (environment.cmsServerConfig.configApiServerPath && environment.cmsServerConfig.configApiServerPath.length > 0) {
      this.coreAuthService.setConfig(environment.cmsServerConfig.configApiServerPath);
    }
    const domain = this.document.location.hostname;
    console.log('domain:', domain);
    const DeviceToken = this.coreAuthService.getDeviceToken();
    if (!DeviceToken || DeviceToken.length === 0) {
      const model: TokenDeviceClientInfoDtoModel = {
        SecurityKey: environment.cmsTokenConfig.SecurityKey,
        ClientMACAddress: '',
        NotificationId: '',
        OSType: environment.cmsTokenConfig.OSType,
        DeviceType:  environment.cmsTokenConfig.DeviceType,
        PackageName: environment.cmsTokenConfig.PackageName,
        AppBuildVer: 0,
        AppSourceVer: '',
        Country: '',
        LocationLat: '',
        LocationLong: '',
        SimCard: '',
        Language: '',
        DeviceBrand: ''
      };
      this.coreAuthService.ServiceGetTokenDevice(model).toPromise();
    }
  }

}
