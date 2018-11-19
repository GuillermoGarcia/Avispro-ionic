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

  constructor(private usuarioService: UsuarioService) { }

  private c = { Agi: [4, 1], Apa: [4, 1], Con: [4, 1], Des: [4, 1], Emp: [4, 1], For: [4, 1],
               Inte: [4, 1], Mem: [4, 1], Ref: [4, 1], Per: [4, 1], Pod: [4, 1], Vol: [4, 1]};

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
    this.personajes.splice(0, this.personajes.length);
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

  savePersonaje(p: Personaje, nuevo: boolean) {
    if (nuevo) {
      firebase.firestore().collection('personajes').add({}).then((docRef) => {
        firebase.firestore().doc(`/personajes/${docRef.id}`).set({
          avatar: (p.avatar !== '') ? p.avatar : '',
          caracteristicas: (p.caracteristicas !== undefined) ? p.caracteristicas : this.c,
          cultura: (p.cultura !== '') ? p.cultura : '',
          edad: (p.edad !== 0) ? p.edad : 0,
          habilidades: (p.habilidades !== undefined) ? p.habilidades : [],
          idPersonaje: docRef.id,
          nivel: (p.nivel !== 0) ? p.nivel : 0,
          nombre: p.nombre,
          procedencia: (p.procedencia !== '') ? p.procedencia : '',
          raza: (p.raza !== '') ? p.raza : '',
        });
        this.usuarioService.usuario.personajes.push(docRef.id);
        this.usuarioService.saveUsuario();
      }).catch((err) => console.log('Error Guardando Nuevo Personaje, ' + err));
    }
  }

}
