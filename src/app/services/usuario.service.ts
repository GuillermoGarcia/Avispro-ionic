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
        // console.log('Document data:', this.usuario.personajes);
      }
    }).catch(err =>  console.log('Error getting document', err));
  }

  saveUsuario(u: Usuario) {
    firebase.firestore().doc(`/habilidad/${u.idUsuario}`).set({
      alias: (u.alias !== undefined) ? u.alias : '',
      avatar: (u.avatar !== undefined) ? u.avatar : 0,
      correo: u.correo,
      idUsuario: u.idUsuario,
      personaje: (u.personajes !== undefined) ? u.personajes : null,
    });
  }

}
