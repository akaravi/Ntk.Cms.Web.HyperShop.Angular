import { BrowserModule } from '@angular/platform-browser';
import { Inject, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { SharedModule } from './shared/shared.module';
import { CoreAuthService, EnumDeviceType, EnumOperatingSystemType, TokenDeviceClientInfoDtoModel } from 'ntk-cms-api';
import { DOCUMENT } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ToastrModule.forRoot(),
    SharedModule
  ],
  providers: [
    ToastrService,
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
        OSType: EnumOperatingSystemType.none,
        DeviceType: EnumDeviceType.WebSite,
        PackageName: '',
      };


      this.coreAuthService.ServiceGetTokenDevice(model).toPromise();
    }
  }

}
