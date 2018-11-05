import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  public resetPasswordForm: FormGroup;

  constructor(private authService: AuthService, private alertCtrl: AlertController,
    private formBuilder: FormBuilder, private router: Router) {

    this.resetPasswordForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });

  }

  ngOnInit() { }

  resetPassword(resetPasswordForm: FormGroup): void {
    if (!resetPasswordForm.valid) {
      console.log('Formulario no valido, valor actual:', resetPasswordForm.value);
    } else {
      const email: string = resetPasswordForm.value.email;
      this.authService.resetPassword(email).then(
        async () => {
          const alert = await this.alertCtrl.create({
            message: 'Comprueba tu correo electrónico donde debes recibir un enlace para recuperar la contraseña',
            buttons: [{
              text: 'Ok', role: 'cancel', handler: () => { this.router.navigateByUrl('login'); }
            }]
          });
          await alert.present();
        },
        async error => {
          const errorAlert = await this.alertCtrl.create({
            message: error.message,
            buttons: [{ text: 'Ok', role: 'cancel' }]
          });
          await errorAlert.present();
        }
      );
    }
  }
}
