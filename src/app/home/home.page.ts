import { Component } from '@angular/core';

import { UsuarioService } from '../services/usuario.service';
import { PersonajeService } from '../services/personaje.service';
import { HabilidadService } from '../services/habilidad.service';
import { NavController } from '@ionic/angular';

// import * as h from '../../assets/avispro-b193e-habilidad-export.json';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {



  constructor( private usuarioService: UsuarioService, private personajeService: PersonajeService,
    private habilidadService: HabilidadService, private navController: NavController) {
    // h.habilidades.forEach(e => {
    //   habilidadService.saveHabilidad(e);
    // });
  }

  goEdit(id: string) {
    this.navController.navigateForward('/editar-personaje/' + id, true);
  }

}
