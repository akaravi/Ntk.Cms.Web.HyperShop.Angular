import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductLeftSidebarComponent } from './products/product-left-sidebar/product-left-sidebar.component';
import { HomeTwoComponent } from './home-two/home-two.component';
import { HomeThreeComponent } from './home-three/home-three.component';
import { HomeFourComponent } from './home-four/home-four.component';
import { HomeFiveComponent } from './home-five/home-five.component';


// Routes
const routes: Routes = [
  { path: '', component: HomeThreeComponent },

  { path: 'home/one', component: HomeComponent },
  { path: 'home/two', component: HomeTwoComponent },
  { path: 'home/three', component: HomeThreeComponent },
  { path: 'home/four', component: HomeFourComponent },
  { path: 'home/five', component: HomeFiveComponent },
  { path: 'products/:category', component: ProductLeftSidebarComponent },
  { path: 'product/:id', component: ProductDetailsComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRouting{ }
