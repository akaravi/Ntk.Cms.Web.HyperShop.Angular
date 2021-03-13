import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.sass']
})
export class BannersComponent implements OnInit {
  @Input('banners') banners: Array<any> = [];
  constructor() { }

  ngOnInit(): void {
  }

  public getBanner(index): any {
    return this.banners[index];
  }

  public getBgImage(index): any {
    let bgImage = {
      'background-image': index != null ? "url(" + this.banners[index].image + ")" : "url(https://via.placeholder.com/600x400/ff0000/fff/)"
    };
    return bgImage;
  }
}
