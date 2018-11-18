import { Component, OnInit } from '@angular/core';
import { Personaje } from '../classes/personaje';
import { PersonajeService } from '../services/personaje.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { EditarCaracteristicaPage } from '../editar-caracteristica/editar-caracteristica.page';

@Component({
  selector: 'app-editar-personaje',
  templateUrl: './editar-personaje.page.html',
  styleUrls: ['./editar-personaje.page.scss'],
})
export class EditarPersonajePage implements OnInit {

  private personaje: Personaje;
  private isNuevo: boolean;

  constructor(private personajeService: PersonajeService, private activatedRoute: ActivatedRoute,
    private navController: NavController, private modalController: ModalController, private alertController: AlertController) { }


  ngOnInit() {
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.personaje = this.personajeService.getPersonaje(this.activatedRoute.snapshot.paramMap.get('id'));
      this.isNuevo = false;
      if (this.personaje.caracteristicas === null) {
        this.personaje.caracteristicas = { Agi: [0, 0], Apa: [0, 0], Con: [0, 0], Des: [0, 0], Emp: [0, 0], For: [0, 0],
                                          Inte: [0, 0], Mem: [0, 0], Ref: [0, 0], Per: [0, 0], Pod: [0, 0], Vol: [0, 0] };
      }
    } else {
      this.personaje = this.personajeService.nuevoPersonaje();
      this.isNuevo = true;
    }
  }

  async editCaracteristica(c: string, v: number[]) {
    const modal = await this.modalController.create({
      component: EditarCaracteristicaPage,
      componentProps: { caracteristica: c, valores: v, nivel: this.personaje.nivel, nuevo: this.isNuevo }
    });
    await modal.present();
  }

  async guardarPersonaje() {
    this.personajeService.savePersonaje(this.personaje);
    const alert = await this.alertController.create({
      message: "Personaje Guardado.",
      buttons: [{ text: 'Ok', role: 'cancel' }]
    });
    await alert.present();
  }

}
