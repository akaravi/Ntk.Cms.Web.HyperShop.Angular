import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorExcptionResult, HyperShopContentModel, HyperShopContentService } from 'ntk-cms-api';

@Component({
  selector: 'app-hypershop-content-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class HyperShopContentViewComponent implements OnInit {

  Id = '';
  dataModelResult: ErrorExcptionResult<HyperShopContentModel> = new ErrorExcptionResult<HyperShopContentModel>();
  loadingStatus = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private hyperShopContentService: HyperShopContentService
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.Id = params.id || '';
    });
    this.DataGetOne();
  }
  DataGetOne() {
    this.loadingStatus = true;
    this.hyperShopContentService.ServiceGetOne(this.Id).subscribe(
      (next) => {
        if (next.IsSuccess) {
          this.dataModelResult = next;
        }
        this.loadingStatus = false;
      },
      (error) => {
        this.loadingStatus = false;
      }
    );
  }

}
