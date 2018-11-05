import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { Usuario } from '../classes/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor() { }

  saveUsuario(uid: string) {
    firebase.firestore().doc(`/usuarios/${uid}`).get().then( doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        // this.usuario = doc.data();
        console.log('Document data:', doc.data());
      }
    }).catch(err =>  console.log('Error getting document', err));
  }


}
