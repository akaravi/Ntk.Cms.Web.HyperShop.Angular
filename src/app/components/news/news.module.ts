import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsRoutingModule } from './news-routing.module';

import { NewsDetailsComponent } from './news-details/news-details.component';
import { NewsColumnComponent } from './news-column/news-column.component';
import { NewsListComponent } from './news-list/news-list.component';
import { SharedModule } from './../shared/shared.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    NewsRoutingModule

  ],
  declarations: [
    NewsDetailsComponent,
    NewsColumnComponent,
    NewsListComponent
  ]
})
export class NewsModule { }
