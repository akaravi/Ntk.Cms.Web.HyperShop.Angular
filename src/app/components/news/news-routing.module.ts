import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsColumnComponent } from './news-column/news-column.component';
import { NewsDetailsComponent } from './news-details/news-details.component';



const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'news-list', component: NewsListComponent},
      { path: 'news-column', component: NewsColumnComponent},
      { path: 'news-details', component: NewsDetailsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class NewsRoutingModule { }
