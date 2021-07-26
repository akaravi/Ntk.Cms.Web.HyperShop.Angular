import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { SplashComponent } from './pages/splash/splash.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'splash',
  //   pathMatch: 'full'
  // },
  {
    path: 'splash',
    component: SplashComponent
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/shop/shop.module').then(m => m.ShopModule)
      },
      {
        path: 'pages',
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
      },
      {
        path: 'blog',
        loadChildren: () => import('./modules/blog/blog.module').then(m => m.BlogModule)
      },
      {
        path: 'news',
        loadChildren: () => import('./modules/news/news.module').then(m => m.NewsModule)
      },
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRouting {}
