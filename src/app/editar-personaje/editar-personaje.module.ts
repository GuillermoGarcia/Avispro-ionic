import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditarPersonajePage } from './editar-personaje.page';

const routes: Routes = [
  {
    path: '',
    component: EditarPersonajePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditarPersonajePage]
})
export class EditarPersonajePageModule {}
