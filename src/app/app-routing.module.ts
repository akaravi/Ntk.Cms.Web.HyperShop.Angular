import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   component: LinkManagementShortLinkComponent,
  //   // resolve: {item: AppResolver}
  // },
  // {
  //   path: 'aboutus',
  //   // pathMatch: 'full',
  //   component: CoreAboutUsComponent,
  // },
  // {
  //   path: 'contactus',
  //   // pathMatch: 'full',
  //   component: CoreContactUsComponent,
  // },
  // {
  //   path: 'news',
  //   // pathMatch: 'full',
  //   component: NewsContentListComponent,
  // },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
