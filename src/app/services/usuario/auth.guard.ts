import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import * as firebase from 'firebase/app';
import 'firebase/auth';

import { UsuarioService } from '../usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private usuarioService: UsuarioService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged((usuario: firebase.User) => {
          if (usuario) {
            this.usuarioService.loadUsuario(usuario.uid).then(() => resolve(true) );
          } else {
            console.log('Usuario no identificado.');
            this.router.navigate(['/login']);
            resolve(false);
          }
        });
      });
    }
}
