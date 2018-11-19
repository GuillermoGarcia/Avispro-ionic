import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsuarioService } from '../services/usuario.service';
import { AuthGuard } from '../services/usuario/auth.guard';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.page.html',
  styleUrls: ['./editar-usuario.page.scss'],
})
export class EditarUsuarioPage implements OnInit {

  private datosValidos = false;
  private correoValido = true;
  private correo: string;
  private actualContrasena: string;
  private nuevaContrasena: string;
  private nuevaContrasenaR: string;
  private nick: string;

  constructor(private modalController: ModalController, private authGuard: AuthGuard,
    private usuarioService: UsuarioService) { }

  ngOnInit() { }

  cancelar() { this.modalController.dismiss(null, 'cancel'); }

  checkEmail(){
    const reg= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.correoValido = (this.correo.match(reg) !== null);
  }

  saveUser(){

  }

}
