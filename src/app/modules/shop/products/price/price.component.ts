import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CoreSiteModel } from 'ntk-cms-api';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.sass']
})
export class PriceComponent implements OnInit {
  @Input()
  optionCoreSiteModel=new CoreSiteModel();

  public priceFrom = 750;
  public priceTo = 1599;
  // Using Output EventEmitter
  @Output() priceFilters = new EventEmitter();

  // define min, max and range
  public min = 100;
  public max = 1000;
  public range = [100,1000];

  constructor() { }

  ngOnInit() {  }

  // rangeChanged
  priceChanged(event:any) {
    setInterval(() => {
      this.priceFilters.emit(event);
    }, 1000);
  }

  priceFilter() {
    this.priceFilters.emit({
      priceFrom: this.priceFrom,
      priceTo: this.priceTo
    });
  }
}
