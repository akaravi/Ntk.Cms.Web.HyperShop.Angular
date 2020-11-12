import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageHomeComponent } from './pages/home/home.component';
import { PageAboutUsComponent } from './pages/aboutUs/aboutUs.component';
import { PageContantUsComponent } from './pages/contantUs/contantUs.component';
import { PageNewsListComponent } from './pages/newsList/newsList.component';
import { PageNewsViewComponent } from './pages/newsView/newsView.component';
import { PageHyperShopCartComponent } from './pages/hyperShopCart/hyperShopCart.component';
import { PageHyperShopListComponent } from './pages/hyperShopList/hyperShopList.component';
import { PageHyperShopViewComponent } from './pages/hyperShopView/hyperShopView.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PageHomeComponent,
    // resolve: {item: AppResolver}
  },
  {
    path: 'aboutus',
    component: PageAboutUsComponent,
  },
  {
    path: 'contactus',
    component: PageContantUsComponent,
  },
  {
    path: 'news',
    component: PageNewsListComponent,
  },
  {
    path: 'newsview',
    component: PageNewsViewComponent,
  },
  {
    path: 'hypershopcart',
    component: PageHyperShopCartComponent,
  },
  {
    path: 'hypershoplist',
    component: PageHyperShopListComponent,
  },
  {
    path: 'hypershopview',
    component: PageHyperShopViewComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
