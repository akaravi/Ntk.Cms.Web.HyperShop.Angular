import { Component, OnInit } from '@angular/core';
import { ErrorExceptionResult, TokenInfoModel } from 'ntk-cms-api';
import { AccessHelper } from 'src/app/core/common/helper/accessHelper';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {
  dateModelTokenInfo: ErrorExceptionResult<TokenInfoModel>;
  constructor(private accessHelper: AccessHelper) {
    this.dateModelTokenInfo = new ErrorExceptionResult<TokenInfoModel>();
  }

  loding = true;
  ngOnInit(): void {
    this.dateModelTokenInfo = this.accessHelper.CheckTokenDevice();
    this.loding = false;
  }

}
