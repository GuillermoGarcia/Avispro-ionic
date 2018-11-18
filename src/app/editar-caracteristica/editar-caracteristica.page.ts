import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-editar-caracteristica',
  templateUrl: './editar-caracteristica.page.html',
  styleUrls: ['./editar-caracteristica.page.scss'],
})
export class EditarCaracteristicaPage implements OnInit {

  caracteristica: null;
  isNuevo: boolean;
  nivel = 1;
  titulo = '';
  valores: number[];

  constructor(private navParams: NavParams, private modalController: ModalController, private alertController: AlertController) { }

  ngOnInit() {
    this.caracteristica = this.navParams.get('caracteristicas');
    this.valores = this.navParams.get('valores');
    this.nivel = this.navParams.get('nivel');
    this.isNuevo = this.navParams.get('nuevo');
    this.titulo = 'Editar ';
    switch (this.caracteristica) {
      case 'Agi': this.titulo += 'Agilidad'; break;
      case 'Apa': this.titulo += 'Apariencia'; break;
      case 'Con': this.titulo += 'Constitución'; break;
      case 'Des': this.titulo += 'Destreza'; break;
      case 'Emp': this.titulo += 'Empatía'; break;
      case 'For': this.titulo += 'Fortaleza'; break;
      case 'Inte': this.titulo += 'Inteligencia'; break;
      case 'Mem': this.titulo += 'Memoria'; break;
      case 'Per': this.titulo += 'Percepción'; break;
      case 'Pod': this.titulo += 'Poder'; break;
      case 'Ref': this.titulo += 'Reflejos'; break;
      case 'Vol': this.titulo += 'Voluntad'; break;
    }
  }

  cancelarCambios() { this.modalController.dismiss(null, 'cancel'); }

  guardarCambios() { this.modalController.dismiss(this.valores, 'save'); }

  async validador(i: number) {
    let msg = '';
    let alert: any;
    let min = 1;
    let tipoValor = 'inicial';

    if (i === 0) { min = (this.nivel + 1) * 2;
    } else { tipoValor = 'modificado'; }

    if ((this.valores[i] < min) || (this.valores[i] > 40)) {
      if (this.valores[i] < min ) {
        msg += 'El valor ' + tipoValor + ' mínimo de tus caracteristicas es de ' + min + '.';
        this.valores[i] = min;
      } else {
        if (msg !== '') { msg += '<br />'; }
        msg += 'El valor ' + tipoValor + ' máximo es de 40.';
        this.valores[i] = 40;
      }
      alert = await this.alertController.create({
        message: msg,
        buttons: [{ text: 'Ok', role: 'cancel' }]
      });
      await alert.present();
    }

  }

}
