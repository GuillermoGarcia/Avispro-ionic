import { Injectable } from '@angular/core';
import { Habilidad } from '../classes/habilidad';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class HabilidadService {

  habilidades: Habilidad[];

  constructor() { }

  loadHabilidad(h: Array<string>): Promise<any> {
    return new Promise( (resolve, reject) => {
      h.forEach(e => {
        firebase.firestore().doc(`/habilidadPersonaje/${e}`).get().then( doc => {
          if (!doc.exists) {
            console.log('No such document!');
            resolve(false);
          } else {
            this.habilidades.push({
              nombre: doc.get('nombre'),
              descripcion: (doc.get('descripcion') !== undefined) ? doc.get('descripcion') : '',
              idHabilidad: doc.get('nombre'),
              bonusPrincipal: (doc.get('bonusPrincipal') !== undefined) ? doc.get('bonusPrincipal') : null,
              bonusSecundario: (doc.get('bonusSecundario') !== undefined) ? doc.get('bonusSecundario') : null,
              tipo: doc.get('tipo'),
              combate: (doc.get('combate') !== undefined) ? doc.get('combate') : false
            });
            resolve(true);
          }
        });
      });
    });
  }

  saveHabilidad(h: any) {
    firebase.firestore().doc(`/habilidad/${h.nombre}`).set({
      nombre: h.nombre,
      descripcion: (h.descripcion !== undefined) ? h.descripcion : '',
      idHabilidad: h.nombre,
      bonusPrincipal: (h.bonusPrincipal !== undefined) ? h.bonusPrincipal : null,
      bonusSecundario: (h.bonusSecundario !== undefined) ? h.bonusSecundario : null,
      tipo: h.tipo,
      combate: (h.combate !== undefined) ? h.combate : false,
    });
  }
}
