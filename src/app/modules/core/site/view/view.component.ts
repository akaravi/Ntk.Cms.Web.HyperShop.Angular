import { Component, OnInit } from '@angular/core';
import { CoreAuthService, CoreSiteModel, CoreSiteService, ErrorExcptionResult, TokenInfoModel } from 'ntk-cms-api';

@Component({
  selector: 'app-core-site-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class CoreSiteViewComponent implements OnInit {
  loadingStatus = false;
  dataModelResult: ErrorExcptionResult<CoreSiteModel> = new ErrorExcptionResult<CoreSiteModel>();
  TokenInfo: TokenInfoModel = new TokenInfoModel();

  constructor(
    public coreAuthService: CoreAuthService,
    private coreSiteService: CoreSiteService

  ) {
    this.coreAuthService.CorrectTokenInfoBSObs.subscribe((value) => {
      this.TokenInfo = value;
      this.DataGetOne();
    });

  }

  ngOnInit(): void {
    this.coreAuthService.CorrectTokenInfoBSRenew();

  }
  DataGetOne(): void {
    if (this.TokenInfo && this.TokenInfo.SiteId > 0) {

      this.loadingStatus = true;
      this.coreSiteService.ServiceGetOneById(this.TokenInfo.SiteId).subscribe(
        (next) => {

          this.dataModelResult = next;

          this.loadingStatus = false;
        },
        (error) => {
          this.loadingStatus = false;
        }
      );
    }
  }
}
