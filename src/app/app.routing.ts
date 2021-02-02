import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/shop/home/home.component';
import { DemoComponent } from './components/demo/demo.component';
import { SplashComponent } from './components/splash/splash.component';


const appRoutes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    component: SplashComponent
  },
  {
    path: 'home',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./components/shop/shop.module').then(m => m.ShopModule)
      },
      {
        path: 'pages',
        loadChildren: () => import('./components/pages/pages.module').then(m => m.PagesModule)

      },
      {
        path: 'blog',
        loadChildren: () => import('./components/blog/blog.module').then(m => m.BlogModule)
      },
      {
        path: 'news',
        loadChildren: () => import('./components/news/news.module').then(m => m.NewsModule)
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRouting { }
