import { Component, Input, OnInit } from '@angular/core';
import { CoreSiteModel } from 'ntk-cms-api';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent implements OnInit {
  @Input()
  optionCoreSiteModel=new CoreSiteModel()
  constructor() { }

  ngOnInit() {
  }

}
