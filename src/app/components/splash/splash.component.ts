import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { ErrorExceptionResult, TokenInfoModel, TokenDeviceClientInfoDtoModel, CoreAuthService } from 'ntk-cms-api';
import { AccessHelper } from 'src/app/core/common/helper/accessHelper';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {
  dateModelTokenInfo: ErrorExceptionResult<TokenInfoModel>;
  constructor(private coreAuthService: CoreAuthService, @Inject(DOCUMENT) private document: Document) {
    this.dateModelTokenInfo = new ErrorExceptionResult<TokenInfoModel>();
  }

  loding = true;
  ngOnInit(): void {

    const domain = this.document.location.hostname;
    console.log('domain:', domain);
    const model: TokenDeviceClientInfoDtoModel = {
      SecurityKey: environment.cmsTokenConfig.SecurityKey,
      ClientMACAddress: '',
      NotificationId: '',
      OSType: environment.cmsTokenConfig.OSType,
      DeviceType: environment.cmsTokenConfig.DeviceType,
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
    this.coreAuthService.ServiceGetTokenDevice(model).subscribe((next) => {
      this.dateModelTokenInfo = next
      this.loding = false;
      if(this.dateModelTokenInfo.IsSuccess)
      {
// گرفتن مشخصات سایت موجود
      }
    });

  }

}
