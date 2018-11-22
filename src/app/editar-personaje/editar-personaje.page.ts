import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController, AlertController} from '@ionic/angular';

import { Personaje } from '../classes/personaje';
import { PersonajeService } from '../services/personaje.service';
import { EditarCaracteristicaPage } from '../editar-caracteristica/editar-caracteristica.page';

@Component({
  selector: 'app-editar-personaje',
  templateUrl: './editar-personaje.page.html',
  styleUrls: ['./editar-personaje.page.scss'],
})
export class EditarPersonajePage implements OnInit {

  private id: number;
  private personaje: Personaje;
  private isNuevo: boolean;  

  constructor(private personajeService: PersonajeService, private activatedRoute: ActivatedRoute,
    private navController: NavController, private modalController: ModalController,
    private alertController: AlertController, public ngZone: NgZone) { }


  ngOnInit() {
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10);
      this.personaje = this.personajeService.getPersonaje('' + this.id);
      this.isNuevo = false;
      if (this.personaje.caracteristicas === null) {
        this.personaje.caracteristicas =
          { Agi: [4, 1], Apa: [4, 1], Con: [4, 1], Des: [4, 1], Emp: [4, 1], For: [4, 1],
           Inte: [4, 1], Mem: [4, 1], Ref: [4, 1], Per: [4, 1], Pod: [4, 1], Vol: [4, 1] };
      }
    } else {
      this.personaje = this.personajeService.nuevoPersonaje();
      this.isNuevo = true;
    }
  }

  actualizarMinimoCaracteristicas(){
    if (this.isNuevo) {      
      const min = (this.personaje.nivel + 1) * 2;
      this.personaje.caracteristicas =
        { Agi: [min, 1], Apa: [min, 1], Con: [min, 1], Des: [min, 1], Emp: [min, 1], For: [min, 1],
         Inte: [min, 1], Mem: [min, 1], Ref: [min, 1], Per: [min, 1], Pod: [min, 1], Vol: [min, 1] };
    }
  }

  async editCaracteristica(c: string, v: number[]) {
    const modal = await this.modalController.create({
      component: EditarCaracteristicaPage,
      componentProps: { caracteristica: c, valores: v, nivel: this.personaje.nivel, nuevo: this.isNuevo }
    });
    await modal.present();
  }

  eliminarPersonaje() {
    this.personajeService.deletePersonaje(this.id);
    this.navController.goBack();
  }

  async guardarPersonaje() {
    let msg = '';
    if (this.validarPersonaje() === '') {
      this.personajeService.savePersonaje(this.personaje, this.isNuevo);
      msg = 'Personaje Guardado.';
    } else {
      msg = this.validarPersonaje();
    }
    const alert = await this.alertController.create({
      message: msg,
      buttons: [{ text: 'Ok', role: 'cancel',
        handler: () => { this.navController.goBack(); } }]
    });
    await alert.present();

  }

  validaCaracteristica(c: number[]): boolean {
    return (c[0] >= ((this.personaje.nivel + 1) * 2)) && (c[0] <= 40) && (c[1] >= 1) && (c[1] <= 40);
  }

  validarPersonaje(): string {
    let msg = '';
    if (this.personaje.nombre === '') {
      msg += 'El nombre del Personaje es necesario.<br />';
    }
    if (this.personaje.raza === '') {
      msg += 'La raza del Personaje es necesaria.<br />';
    }
    if (!(this.validaCaracteristica(this.personaje.caracteristicas.Agi) && this.validaCaracteristica(this.personaje.caracteristicas.Con) &&
        this.validaCaracteristica(this.personaje.caracteristicas.Des) && this.validaCaracteristica(this.personaje.caracteristicas.Emp) &&
        this.validaCaracteristica(this.personaje.caracteristicas.For) && this.validaCaracteristica(this.personaje.caracteristicas.Inte) &&
        this.validaCaracteristica(this.personaje.caracteristicas.Mem) && this.validaCaracteristica(this.personaje.caracteristicas.Per) &&
        this.validaCaracteristica(this.personaje.caracteristicas.Pod) && this.validaCaracteristica(this.personaje.caracteristicas.Ref) &&
        this.validaCaracteristica(this.personaje.caracteristicas.Vol))) {
      msg += 'Las Caracteristicas deben tener valores validos.';
    }
    return msg;
  }

}
