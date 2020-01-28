import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)},
  {
    path: 'login',
    loadChildren: './pages/item-details-login/item-details-login.module#ItemDetailsLoginPageModule'
  },

  {
    path: 'register',
    loadChildren: './pages/register/register.module#RegisterPageModule'
  },

  // {
  //   path: 'splash-screens/:type',
  //   loadChildren: './pages/item-details-splash-screen/item-details-splash-screen.module#ItemDetailsSplashScreenPageModule'
  // },

  {
    path: 'profile/:type',
    loadChildren: './pages/item-details-profile/item-details-profile.module#ItemDetailsProfilePageModule'
  },

  // {
  //   path: 'swipe-to-dismiss/:type',
  //   loadChildren: './pages/item-details-swipe-to-dismiss/item-details-swipe-to-dismiss.module#ItemDetailsSwipeToDismissPageModule'
  // },
  { path: 'compose-email', loadChildren: './pages/compose/compose.module#ComposePageModule' },
  { path: 'inbox', loadChildren: './pages/inbox/inbox.module#InboxPageModule' },
  { path: 'outbox', loadChildren: './pages/outbox/outbox.module#OutboxPageModule' },
  { path: 'email-detail', loadChildren: './pages/email-detail/email-detail.module#EmailDetailPageModule' },
  { path: 'setting', loadChildren: './pages/setting/setting.module#SettingPageModule' },
  { path: 'welcome', loadChildren: './pages/welcome/welcome.module#WelcomePageModule' },
  { path: 'initial-route', loadChildren: './pages/initial-route/initial-route.module#InitialRoutePageModule' },
  { path: 'trash', loadChildren: './pages/trash/trash.module#TrashPageModule' },
  { path: 'reset-password', loadChildren: './pages/reset-password/reset-password.module#ResetPasswordPageModule' },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
