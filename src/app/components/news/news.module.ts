import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsRouting} from './news.routing';

import { NewsDetailsComponent } from './news-details/news-details.component';
import { NewsColumnComponent } from './news-column/news-column.component';
import { NewsListComponent } from './news-list/news-list.component';
import { SharedModule } from './../shared/shared.module';
import { CoreModuleTagService, NewsCommentService, NewsContentService, NewsContentTagService } from 'ntk-cms-api';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    NewsRouting

  ],
  declarations: [
    NewsDetailsComponent,
    NewsColumnComponent,
    NewsListComponent
  ],
  providers: [
    CoreModuleTagService,
    NewsContentService,
    NewsContentTagService,
    NewsCommentService
  ]
})
export class NewsModule { }
