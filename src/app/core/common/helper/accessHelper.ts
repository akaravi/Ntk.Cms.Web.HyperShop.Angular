import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { CoreAuthService, ErrorExceptionResult, TokenDeviceClientInfoDtoModel } from 'ntk-cms-api';
import { environment } from 'src/environments/environment';
import { CmsStoreService } from '../../reducers/cmsStore.service';
import { CmsToastrService } from '../../services/cmsToastr.service';

@Injectable({
  providedIn: 'root',
})
export class AccessHelper {
  constructor(
    private coreAuthService: CoreAuthService,
    private cmsStoreService: CmsStoreService,
    private cmsToastrService: CmsToastrService,
    @Inject(DOCUMENT) private document: Document
  ) { }
  CheckTokenDevice(): any {
    const domain = this.document.location.hostname;
    console.log('domain:', domain);
    const DeviceToken = this.coreAuthService.getDeviceToken();
    if (DeviceToken && DeviceToken.length > 0) {
      return;
    }
    // const model: TokenDeviceClientInfoDtoModel = {
    //   SecurityKey: environment.cmsTokenConfig.SecurityKey,
    //   ClientMACAddress: '',
    //   NotificationId: '',
    //   OSType: environment.cmsTokenConfig.OSType,
    //   DeviceType: environment.cmsTokenConfig.DeviceType,
    //   PackageName: environment.cmsTokenConfig.PackageName,
    //   AppBuildVer: 0,
    //   AppSourceVer: '',
    //   Country: '',
    //   LocationLat: '',
    //   LocationLong: '',
    //   SimCard: '',
    //   Language: '',
    //   DeviceBrand: ''
    // };
    // return this.coreAuthService.ServiceGetTokenDevice(model).subscribe({
    //   next: (ret) => {
    //     this.cmsStoreService.setState({ tokenInfoModelState: ret.item });
    //     return ret;
    //   },
    //   error: (er) => {
    //     this.cmsToastrService.typeError(er);
    //   }
    // });

  }

  AccessDeleteRow(model: ErrorExceptionResult<any>): boolean {
    if (!model) { return false; }
    if (!model.access) { return false; }
    return model.access.accessDeleteRow;
  }
  AccessWatchRow(model: ErrorExceptionResult<any>): boolean {
    if (!model) { return false; }
    if (!model.access) { return false; }
    return false; // return model?.access?.AccessWatchRow;
  }
  AccessEditRow(model: ErrorExceptionResult<any>): boolean {
    if (!model) { return false; }
    if (!model.access) { return false; }
    return model.access.accessEditRow;
  }
  AccessAddRow(model: ErrorExceptionResult<any>): boolean {
    if (!model) { return false; }
    if (!model.access) { return false; }
    return model.access.accessAddRow;
  }
  AccessRowInPanelDemo(model: ErrorExceptionResult<any>): boolean {
    if (!model) { return false; }
    if (!model.access) { return false; }
    return model.access.accessRowInPanelDemo;
  }
  AccessRowWatchInSharingCategory(model: ErrorExceptionResult<any>): boolean {
    if (!model) { return false; }
    if (!model.access) { return false; }
    return model.access.accessRowWatchInSharingCategory;
  }
  AccessWatchRowOtherSiteId(model: ErrorExceptionResult<any>): boolean {
    if (!model) { return false; }
    if (!model.access) { return false; }
    return false;
  }
  AccessWatchRowOtherCreatedBy(model: ErrorExceptionResult<any>): boolean {
    if (!model) { return false; }
    if (!model.access) { return false; }
    return model.access.accessWatchRowOtherCreatedBy;
  }
  AccessEditRowOtherSiteId(model: ErrorExceptionResult<any>): boolean {
    if (!model) { return false; }
    if (!model.access) { return false; }
    return model.access.accessEditRowOtherSiteId;
  }
  AccessEditRowOtherCreatedBy(model: ErrorExceptionResult<any>): boolean {
    if (!model) { return false; }
    if (!model.access) { return false; }
    return model.access.accessEditRowOtherCreatedBy;
  }
  AccessDeleteRowOtherCreatedBy(model: ErrorExceptionResult<any>): boolean {
    if (!model) { return false; }
    if (!model.access) { return false; }
    return model.access.accessDeleteRowOtherCreatedBy;
  }
}
