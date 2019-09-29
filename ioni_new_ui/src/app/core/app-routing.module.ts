import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: '../pages/home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: '../pages/list/list.module#ListPageModule'
  },

  {
    path: 'login/:type',
    loadChildren: '../pages/item-details-login/item-details-login.module#ItemDetailsLoginPageModule'
  },

  {
    path: 'splash-screens/:type',
    loadChildren: '../pages/item-details-splash-screen/item-details-splash-screen.module#ItemDetailsSplashScreenPageModule'
  },

  {
    path: 'profile/:type',
    loadChildren: '../pages/item-details-profile/item-details-profile.module#ItemDetailsProfilePageModule'
  },

  {
    path: 'swipe-to-dismiss/:type',
    loadChildren: '../pages/item-details-swipe-to-dismiss/item-details-swipe-to-dismiss.module#ItemDetailsSwipeToDismissPageModule'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes,  { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
