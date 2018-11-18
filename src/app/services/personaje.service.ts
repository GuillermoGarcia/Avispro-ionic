import { Injectable } from '@angular/core';

import { Personaje } from '../classes/personaje';
import { UsuarioService } from './usuario.service';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class PersonajeService {

  public personajes: Personaje[] = [];

  constructor(private usuarioService: UsuarioService) { this.loadPersonaje().then(() => console.log() ); }

  private c = { Agi: [0, 0], Apa: [0, 0], Con: [0, 0], Des: [0, 0], Emp: [0, 0], For: [0, 0],
               Inte: [0, 0], Mem: [0, 0], Ref: [0, 0], Per: [0, 0], Pod: [0, 0], Vol: [0, 0]};

  nuevoPersonaje(): Personaje {
    const p = {
      avatar: '',
      caracteristicas:  this.c,
      cultura: '',
      edad:  0,
      habilidades:  [],
      idPersonaje: '',
      nivel: 1,
      nombre: '',
      procedencia: '',
      raza: ''
    };
    return p;
  }

  getPersonaje(id: string): Personaje {
    return this.personajes.find(p => p.idPersonaje === id);
  }

  loadPersonaje(): Promise<any> {
    return new Promise( (resolve, reject) => {
      this.usuarioService.usuario.personajes.forEach((element, key) => {
        firebase.firestore().doc(`/personajes/${element}`).get().then( doc => {
          if (!doc.exists) {
            console.log('No such document!');
            resolve(false);
          } else {
            this.personajes.push({
              avatar: doc.get('avatar'),
              caracteristicas: doc.get('caracteristicas'),
              cultura: doc.get('cultura'),
              edad: doc.get('edad'),
              habilidades: doc.get('habilidades'),
              idPersonaje: element,
              nivel: doc.get('nivel'),
              nombre: doc.get('nombre'),
              procedencia: doc.get('procedencia'),
              raza: doc.get('raza')
            });
          }
          if (this.usuarioService.usuario.personajes.length === (key + 1) ) { resolve(true); }
        }).catch(err =>  console.log('Error getting document', err));
      });
    });
  }

  savePersonaje(p: Personaje) {
    firebase.firestore().doc(`/personajes/${p.idPersonaje}`).set({
      avatar: (p.avatar !== '') ? p.avatar : '',
      caracteristicas: (p.caracteristicas !== undefined) ? p.caracteristicas : this.c,
      cultura: (p.cultura !== '') ? p.cultura : '',
      edad: (p.edad !== 0) ? p.edad : 0,
      habilidades: (p.habilidades !== undefined) ? p.habilidades : [],
      idPersonaje: p.idPersonaje,
      nivel: (p.nivel !== 0) ? p.nivel : 0,
      nombre: p.nombre,
      procedencia: (p.procedencia !== '') ? p.procedencia : '',
      raza: (p.raza !== '') ? p.raza : '',
    });
  }

}
