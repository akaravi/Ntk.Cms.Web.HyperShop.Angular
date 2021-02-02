import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsColumnComponent } from './news-column/news-column.component';
import { NewsDetailsComponent } from './news-details/news-details.component';



const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: NewsListComponent},
      { path: 'list', component: NewsListComponent},
      { path: 'list/:id', component: NewsListComponent},
      { path: 'listtag/:tag', component: NewsListComponent},
      { path: 'column/:', component: NewsColumnComponent},
      { path: 'column/:id', component: NewsColumnComponent},
      { path: 'columntag/:tag', component: NewsColumnComponent},
      { path: 'details/:id', component: NewsDetailsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class NewsRouting { }
