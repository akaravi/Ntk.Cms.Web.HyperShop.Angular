import { Component, OnInit } from '@angular/core';
import { ErrorExcptionResult, FilterModel, HyperShopContentModel, HyperShopContentService } from 'ntk-cms-api';

@Component({
  selector: 'app-hypershop-content-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class HyperShopContentListComponent implements OnInit {
  filterModelContent = new FilterModel();
  filterModelCategory = new FilterModel();
  dataModelResult: ErrorExcptionResult<HyperShopContentModel> = new ErrorExcptionResult<HyperShopContentModel>();
  loadingStatus = false;

  constructor(private hyperShopContentService: HyperShopContentService) { }

  ngOnInit() {
    this.DataGetAll();
  }

  DataGetAll(): void {
    this.loadingStatus = true;
    this.filterModelContent.AccessLoad = true;
    this.hyperShopContentService.ServiceGetAll(this.filterModelContent).subscribe(
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
