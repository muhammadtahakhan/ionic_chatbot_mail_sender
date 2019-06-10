import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: '', loadChildren: './home/home.module#HomePageModule' },
  { path: 'user-account', loadChildren: './user-account/user-account.module#UserAccountPageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'compose-email', loadChildren: './compose-email/compose-email.module#ComposeEmailPageModule' },
  { path: 'read-email', loadChildren: './read-email/read-email.module#ReadEmailPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
 
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'inbox', loadChildren: './inbox/inbox.module#InboxPageModule' },
  { path: 'outbox', loadChildren: './outbox/outbox.module#OutboxPageModule' },
  { path: 'senditem', loadChildren: './senditem/senditem.module#SenditemPageModule' },
  { path: 'contact', loadChildren: './contact/contact.module#ContactPageModule' },  { path: 'welcome', loadChildren: './welcome/welcome.module#WelcomePageModule' },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
