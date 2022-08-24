import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  ErrorExceptionResult,
  TokenInfoModel,
  CoreAuthService, CoreSiteService, CoreSiteModel, WebDesignerMainIntroService, WebDesignerMainIntroModel
} from 'ntk-cms-api';
import { AccessHelper } from 'src/app/core/common/helper/accessHelper';
import { CmsStoreService } from 'src/app/core/reducers/cmsStore.service';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';

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
    private cmsToastrService: CmsToastrService,
    private cmsStoreService: CmsStoreService,
    @Inject(DOCUMENT) private document: Document) {
    const splash = localStorage.getItem('splash');
    if (splash && splash.length > 0) {
      // todo: karavi this.router.navigate(['home']);
    }
    this.dateModelTokenInfo = new ErrorExceptionResult<TokenInfoModel>();
  }

  loadingCurrentSite = true;
  loadingIntro = true;
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
  //     this.loading = false;
  //     if (this.dateModelTokenInfo.IsSuccess) {
  //       this.DataCurrentSite();
  //     }
  //   });
  // }
  DataCurrentSite(): void {
    this.loadingCurrentSite=true;
    this.coreSiteService.ServiceCurrectSite().subscribe((next) => {
      this.loadingCurrentSite=false;
      this.dateModelCoreSite = next;
      this.cmsStoreService.setState({ coreSiteModelState: next.item });
      if (this.dateModelCoreSite.isSuccess && this.dateModelCoreSite.item.id > 0) {
        this.DataIntro();
      }
    },
    (error) => {
      this.cmsToastrService.typeError(error);
      this.loadingCurrentSite=false;
    });
  }
  private DataIntro(): void {
    this.loadingIntro=true;
    this.webDesignerMainIntroService.ServiceGetAll(null).subscribe((next) => {
      this.dateModelWebDesignerMainIntro = next;
      this.loadingIntro=false;
    },
    (error) => {
      this.cmsToastrService.typeError(error);
      this.loadingIntro=false;
    });
  }
  onActionStart(): void {
    localStorage.setItem('splash', '1');
    this.router.navigate(['/home']);
  }
}
