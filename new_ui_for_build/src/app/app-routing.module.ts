import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)},
  // {
  //   path: 'login',
  //   loadChildren: './pages/item-details-login/item-details-login.module#ItemDetailsLoginPageModule'
  // },

  // {
  //   path: 'register',
  //   loadChildren: './pages/register/register.module#RegisterPageModule'
  // },

  // {
  //   path: 'splash-screens/:type',
  //   loadChildren: './pages/item-details-splash-screen/item-details-splash-screen.module#ItemDetailsSplashScreenPageModule'
  // },

  // {
  //   path: 'profile/:type',
  //   loadChildren: './pages/item-details-profile/item-details-profile.module#ItemDetailsProfilePageModule'
  // },

  {
    path: 'swipe-to-dismiss/:type',
    loadChildren: './pages/item-details-swipe-to-dismiss/item-details-swipe-to-dismiss.module#ItemDetailsSwipeToDismissPageModule'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
