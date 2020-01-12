import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InitialRoutePage } from './initial-route.page';
import { SharedModule } from 'src/app/components/shared.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: InitialRoutePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InitialRoutePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InitialRoutePageModule {}
