import { Component } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';

import { UsuarioService } from '../services/usuario.service';
import { PersonajeService } from '../services/personaje.service';
import { HabilidadService } from '../services/habilidad.service';
import { EditarUsuarioPage } from '../editar-usuario/editar-usuario.page';
import { Personaje } from '../classes/personaje';

// import * as h from '../../assets/avispro-b193e-habilidad-export.json';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  alias: string;
  personajes: Personaje[];

  constructor( private usuarioService: UsuarioService, private personajeService: PersonajeService,
    private habilidadService: HabilidadService, private navController: NavController,
    private modalController: ModalController) { this.alias = usuarioService.usuario.alias; }

  async editarUsuario() {
    const modal = await this.modalController.create({
      component: EditarUsuarioPage,
      componentProps: {}
    });
    await modal.present();
  }

  goEdit(id: string) {
    this.navController.navigateForward('/editar-personaje/' + id, true);
  }

  ionViewWillEnter() {
    this.personajeService.loadPersonaje();
    this.personajes = this.personajeService.personajes;
  }

  logout() { this.usuarioService.logout(); }

}
