import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CoreSiteService } from 'ntk-cms-api';
import { CmsStoreService } from '../../reducers/cmsStore.service';
import { CmsToastrService } from '../../services/cmsToastr.service';

@Injectable({
  providedIn: 'root',
})
export class PublicHelper {
  constructor(
    private router: Router,
    private coreSiteService: CoreSiteService,
    private cmsStoreService: CmsStoreService,
    private cmsToastrService: CmsToastrService,
  ) { }


  LocaleDate(model): string {
    const d = new Date(model);
    return d.toLocaleDateString('fa-Ir');
  }

  Truncate(value: string, limit: number = 20, trail: string = '...'): string {
    value=value+'';
    return value.length > limit ? value.substring(0, limit) + trail : value;
  }

  RecordStatus(model): string {
    return (this.RecordStatus)[model];
  }
  DataCurrentSite(): any {
    return this.coreSiteService.ServiceCurrectSite().subscribe((next) => {
      this.cmsStoreService.setState({ coreSiteModelState: next.Item });
      return next;
    },
      (error) => {
        this.cmsToastrService.typeError(error);
      });
  }
}
