import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { EditarCaracteristicaPageModule } from './editar-caracteristica/editar-caracteristica.module';
import { EditarUsuarioPageModule } from './editar-usuario/editar-usuario.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [AppRoutingModule, BrowserModule, FormsModule, EditarCaracteristicaPageModule,
            IonicModule.forRoot(), EditarUsuarioPageModule, ReactiveFormsModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
