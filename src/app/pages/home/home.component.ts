import { Component, OnInit } from '@angular/core';
import { CoreAuthService } from 'ntk-cms-api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class PageHomeComponent implements OnInit {

  constructor(
    public coreAuthService: CoreAuthService,
  ) { }

  ngOnInit() {
  }

}
