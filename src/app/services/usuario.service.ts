import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

import { Usuario } from '../classes/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario: Usuario = {idUsuario: '', correo: '', alias: '', personajes: []};

  constructor() { }

  loadUsuario(uid: string): Promise<any> {
    return firebase.firestore().doc(`/usuarios/${uid}`).get().then( doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        this.usuario.idUsuario = doc.get('idUsuario');
        this.usuario.correo = doc.get('correo');
        this.usuario.alias = doc.get('alias');
        this.usuario.personajes = doc.get('personajes');
        this.usuario.avatar =  (doc.get('avatar') !== undefined) ? doc.get('avatar') : '';
        // console.log('Document User Data:', this.usuario);
      }
    }).catch(err =>  console.log('Error getting document', err));
  }

  saveUsuario() {
    firebase.firestore().doc(`/usuarios/${this.usuario.idUsuario}`).set({
      alias: (this.usuario.alias !== undefined) ? this.usuario.alias : '',
      avatar: (this.usuario.avatar !== undefined) ? this.usuario.avatar : 0,
      correo: this.usuario.correo,
      idUsuario: this.usuario.idUsuario,
      personajes: (this.usuario.personajes !== undefined) ? this.usuario.personajes : null,
    });
  }

}
