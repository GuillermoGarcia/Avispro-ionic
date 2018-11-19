import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  loginUser(email: string, password: string): Promise<any> { return firebase.auth().signInWithEmailAndPassword(email, password); }

  logoutUser(): Promise<void> { return firebase.auth().signOut(); }

  resetPassword(email: string): Promise<void> { return firebase.auth().sendPasswordResetEmail(email); }

  signupUser(email: string, password: string, alias: String): Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(newUserCredential => {
      const uid = newUserCredential.user.uid;
      firebase.firestore().doc(`/usuarios/${uid}`).set({ 'idUsuario': uid, 'correo': email, 'alias': alias });
    }).catch(error => {
      console.error(error);
      throw new Error(error);
    });
  }

  updatePassword(op: string, np: string) {
    firebase.auth().currentUser
      .reauthenticateAndRetrieveDataWithCredential(firebase.auth.EmailAuthProvider.credential(firebase.auth().currentUser.email, op))
      .then(() => {
        firebase.auth().currentUser.updatePassword(np)
        .then(() => console.log('Nueva Contraseña: ' + np))
        .catch((error) => console.log('Error al cambiar de contraseña'));
      })
      .catch((error) => console.log('Error al cambiar de contraseña'));
  }


}
