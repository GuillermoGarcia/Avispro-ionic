import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsuarioService } from '../services/usuario.service';

import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.page.html',
  styleUrls: ['./editar-usuario.page.scss'],
})
export class EditarUsuarioPage implements OnInit {

  private correoValido = true;
  private actualContrasenaValida = true;
  private nuevaContrasenaValida = true;
  private repetidaContrasenaValida = true;
  private correo: string;
  private actualContrasena: string;
  private nuevaContrasena: string;
  private nuevaContrasenaR: string;
  private nick: string;

  constructor(private authService: AuthService, private modalController: ModalController, private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.correo = this.usuarioService.usuario.correo;
    this.nick = this.usuarioService.usuario.alias;
   }

  cancelar() { this.modalController.dismiss(null, 'cancel'); }

  checkEmail(){
    const reg= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.correoValido = (this.correo.match(reg) !== null);
  }

  checkNewPass() {
    this.nuevaContrasenaValida = (this.nuevaContrasena.length >= 6);
  }

  checkRepeatPass() {
    this.repetidaContrasenaValida = (this.nuevaContrasena === this.nuevaContrasenaR);
  }

  saveUser() {
    this.authService.loginUser(this.correo, this.actualContrasena).then((newUserCredential) => {
      this.actualContrasenaValida = (newUserCredential.user.uid === this.usuarioService.usuario.idUsuario);
    }, error => {
      this.actualContrasenaValida = false;
    });
    if (this.actualContrasenaValida && this.correoValido && this.nuevaContrasenaValida && this.repetidaContrasenaValida) {
      this.usuarioService.usuario.alias = this.nick;
      this.usuarioService.usuario.correo = this.correo;
      this.usuarioService.updatePassword(this.actualContrasena, this.nuevaContrasena);
      this.usuarioService.saveUsuario();
      this.modalController.dismiss();
    }
  }

}
