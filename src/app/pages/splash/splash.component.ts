import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  ErrorExceptionResult,
  TokenInfoModel,
  TokenDeviceClientInfoDtoModel,
  CoreAuthService, CoreSiteService, CoreSiteModel, WebDesignerMainIntroService, WebDesignerMainIntroModel
} from 'ntk-cms-api';
import { AccessHelper } from 'src/app/core/common/helper/accessHelper';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {
  dateModelTokenInfo: ErrorExceptionResult<TokenInfoModel>;
  dateModelCoreSite: ErrorExceptionResult<CoreSiteModel>;
  dateModelWebDesignerMainIntro: ErrorExceptionResult<WebDesignerMainIntroModel>;
  constructor(private coreAuthService: CoreAuthService,
    private router: Router,
    private coreSiteService: CoreSiteService,
    private accessHelper: AccessHelper,
    private webDesignerMainIntroService: WebDesignerMainIntroService,
    @Inject(DOCUMENT) private document: Document) {
    const splash = localStorage.getItem('splash');
    if (splash && splash.length > 0) {
      // todo: karavi this.router.navigate(['home']);
    }
    this.dateModelTokenInfo = new ErrorExceptionResult<TokenInfoModel>();
  }

  loding = true;
  ngOnInit(): void {
    // this.DataTokenDevice();
    const DeviceToken = this.coreAuthService.getDeviceToken();
    if (DeviceToken && DeviceToken.length > 0) {
      this.DataCurrentSite();
    } else {
      const ret = this.accessHelper.CheckTokenDevice().subscribe((nextToken) => {
        this.DataCurrentSite();
      });
    }
  }


  // private DataTokenDevice(): void {
  //   const domain = this.document.location.hostname;
  //   console.log('domain:', domain);
  //   const model: TokenDeviceClientInfoDtoModel = {
  //     SecurityKey: environment.cmsTokenConfig.SecurityKey,
  //     ClientMACAddress: '',
  //     NotificationId: '',
  //     OSType: environment.cmsTokenConfig.OSType,
  //     DeviceType: environment.cmsTokenConfig.DeviceType,
  //     PackageName: environment.cmsTokenConfig.PackageName,
  //     AppBuildVer: 0,
  //     AppSourceVer: '',
  //     Country: '',
  //     LocationLat: '',
  //     LocationLong: '',
  //     SimCard: '',
  //     Language: '',
  //     DeviceBrand: ''
  //   };
  //   debugger
  //   this.coreAuthService.ServiceGetTokenDevice(model).subscribe((next) => {
  //     debugger
  //     this.dateModelTokenInfo = next;
  //     this.loding = false;
  //     if (this.dateModelTokenInfo.IsSuccess) {
  //       this.DataCurrentSite();
  //     }
  //   });
  // }
  private DataCurrentSite(): void {
    debugger;
    this.DataIntro();
    this.coreSiteService.ServiceCurrectSite().subscribe((next) => {
      this.dateModelCoreSite = next;
      debugger;
      if (this.dateModelCoreSite.IsSuccess && this.dateModelCoreSite.Item.Id > 0) {
        this.DataIntro();
      }
    });
  }
  private DataIntro(): void {
    this.webDesignerMainIntroService.ServiceGetAll(null).subscribe((next) => {
      this.dateModelWebDesignerMainIntro = next;
    });
  }
  onActionStart(): void {
    localStorage.setItem('splash', '1');
    this.router.navigate(['home']);
  }
}
