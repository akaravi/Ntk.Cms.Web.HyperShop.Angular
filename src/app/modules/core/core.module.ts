import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreComponent } from './core.component';
import { CoreAuthService, CoreSiteService } from 'ntk-cms-api';
import { CoreSiteViewComponent } from './site/view/view.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CoreComponent,
  ],
  providers: [
    CoreAuthService,
    CoreSiteService
  ]
})
export class CoreModule { }
