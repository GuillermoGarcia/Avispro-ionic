import { Component, OnInit } from '@angular/core';
import { Personaje } from '../classes/personaje';
import { PersonajeService } from '../services/personaje.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-editar-personaje',
  templateUrl: './editar-personaje.page.html',
  styleUrls: ['./editar-personaje.page.scss'],
})
export class EditarPersonajePage implements OnInit {

  private personaje: Personaje;
  private isNuevo: boolean;

  constructor(private personajeService: PersonajeService, private activatedRoute: ActivatedRoute,
    private navController: NavController) { }


  ngOnInit() {
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.personaje = this.personajeService.getPersonaje(this.activatedRoute.snapshot.paramMap.get('id'));
      this.isNuevo = false;
    } else {
      this.personaje = this.personajeService.nuevoPersonaje();
      this.isNuevo = true;
    }
  }

  editCaracteristica(c: string, v: number[]) {
    console.log('Caracteristicas: ' + c + ' Valores:' + v[0] + ', ' + v[1]);
  }


}
