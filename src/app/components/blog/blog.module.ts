import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogRouting } from './blog.routing';

import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { BlogColumnComponent } from './blog-column/blog-column.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { SharedModule } from './../shared/shared.module';
import { BlogCommentService, BlogContentService, BlogContentTagService, CoreModuleTagService } from 'ntk-cms-api';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    BlogRouting

  ],
  declarations: [
    BlogDetailsComponent,
    BlogColumnComponent,
    BlogListComponent
  ],
  providers: [
    CoreModuleTagService,
    BlogContentService,
    BlogContentTagService,
    BlogCommentService
  ]
})
export class BlogModule { }
