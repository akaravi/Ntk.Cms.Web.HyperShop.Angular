import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { SwiperConfigInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';
import { CoreSiteModel } from 'ntk-cms-api';

@Component({
  selector: 'app-main-carousel',
  templateUrl: './main-carousel.component.html',
  styleUrls: ['./main-carousel.component.sass']
})
export class MainCarouselComponent implements OnInit , AfterViewInit {
  @Input()
  optionCoreSiteModel=new CoreSiteModel();
  @Input('slides') slides: Array<any> = [];

  public config: SwiperConfigInterface = {};

  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true
  };

  constructor() { }

  ngOnInit() :void { }

  ngAfterViewInit():void {
    this.config = {
      slidesPerView: 1,
      spaceBetween: 0,
      keyboard: true,
      navigation: true,
      pagination: this.pagination,
      grabCursor: true,
      loop: false,
      preloadImages: false,
      lazy: true,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false
      },
      speed: 500,
      effect: 'slide'
    }
  }




}
