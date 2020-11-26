import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogColumnComponent } from './blog-column/blog-column.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';



const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'list', component: BlogListComponent},
      { path: 'column', component: BlogColumnComponent},
      { path: 'details/:id', component: BlogDetailsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BlogRoutingModule { }
