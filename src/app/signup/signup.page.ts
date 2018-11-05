import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public signupForm: FormGroup;
  public loading: any;

  constructor(private alertCotroller: AlertController, private authService: AuthService,
    private formBuilder: FormBuilder, private loadingController: LoadingController,
    private router: Router) {

    this.signupForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      nick: ['', Validators.compose([Validators.required])]
    });

  }

  ngOnInit() { }

  async signupUser(signupForm: FormGroup) {
    if (!signupForm.valid) {
      console.log('Es necesario rellener todo el formulario, valor actual: ', signupForm.value);
    } else {
      const email: string = signupForm.value.email;
      const password: string = signupForm.value.password;
      const nick: string = signupForm.value.nick;
      this.authService.signupUser(email, password, nick).then(() => {
          this.loading.dismiss().then(() => { this.router.navigateByUrl('home'); });
        },
        error => {
          this.loading.dismiss().then(async () => {
            const alert = await this.alertCotroller.create({
              message: error.message,
              buttons: [{ text: 'Ok', role: 'cancel' }]
            });
            await alert.present();
          });
        }
      );
      this.loading = await this.loadingController.create();
      await this.loading.present();
    }
  }
}
