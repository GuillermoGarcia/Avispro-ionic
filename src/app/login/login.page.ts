import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { Usuario } from '../classes/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup;
  public loading: HTMLIonLoadingElement;
  public usuario: Usuario;

  constructor( public loadingController: LoadingController, public alertController: AlertController,
    private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    });

  }

  ngOnInit() {
  }

  async loginUser(loginForm: FormGroup): Promise<void> {
    if (!loginForm.valid) {
      console.log('Formulario no valido, valores actuales:', loginForm.value);
    } else {
      const email = loginForm.value.email;
      const password = loginForm.value.password;
      this.authService.loginUser(email, password).then((newUserCredential) => {
        const uid = newUserCredential.user.uid;
        firebase.firestore().doc(`/usuarios/${uid}`).get().then( doc => {
          if (!doc.exists) {
            console.log('No such document!');
          } else {
            this.usuario.idUsuario = doc.data().idUsuario;
            this.usuario.correo = doc.data().correo;
            this.usuario.alias = doc.data().alias;
            console.log('Document data:', this.usuario);
          }
        }).catch(err =>  console.log('Error getting document', err));
        this.loading.dismiss().then(() => {
          this.router.navigateByUrl('home');
        });
      }, error => {
        this.loading.dismiss().then(async () => {
          const alert = await this.alertController.create({
            message: error.message,
            buttons: [{ text: 'Ok', role: 'cancel' }]
          });
          await alert.present();
        });
      });
      this.loading = await this.loadingController.create();
      await this.loading.present();
    }
  }

}
