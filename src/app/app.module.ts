import { BrowserModule } from '@angular/platform-browser';
import { Component, Inject, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { SharedModule } from './shared/shared.module';
import { CoreAuthService, EnumDeviceType, EnumOperatingSystemType,  TokenDeviceClientInfoDtoModel } from 'ntk-cms-api';
import { DOCUMENT } from '@angular/common';
import { PageAboutUsComponent } from './pages/aboutUs/aboutUs.component';
import { PageContantUsComponent } from './pages/contantUs/contantUs.component';
import { PageHomeComponent } from './pages/home/home.component';
import { PageHyperShopCartComponent } from './pages/hyperShopCart/hyperShopCart.component';
import { PageHyperShopListComponent } from './pages/hyperShopList/hyperShopList.component';
import { PageHyperShopViewComponent } from './pages/hyperShopView/hyperShopView.component';
import { PageNewsListComponent } from './pages/newsList/newsList.component';
import { PageNewsViewComponent } from './pages/newsView/newsView.component';
import { NewsModule } from './modules/news/news.module';
import { NewsContentListComponent } from './modules/news/content/list/list.component';


@NgModule({
  declarations: [
    AppComponent,
    PageHomeComponent,
    PageAboutUsComponent,
    PageContantUsComponent,
    PageNewsListComponent,
    PageNewsViewComponent,
    PageHyperShopCartComponent,
    PageHyperShopListComponent,
    PageHyperShopViewComponent,
    NewsContentListComponent,
  ],
  imports: [
    Component ,
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ToastrModule.forRoot(),
    SharedModule,
    NewsModule
  ],
  providers: [
    ToastrService,
    CoreAuthService,
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
        OSType: EnumOperatingSystemType.none,
        DeviceType: EnumDeviceType.WebSite,
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
