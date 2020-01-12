import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TrashPage } from './trash.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from 'src/app/components/shared.module';

const routes: Routes = [
  {
    path: '',
    component: TrashPage
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
  declarations: [TrashPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrashPageModule {}
