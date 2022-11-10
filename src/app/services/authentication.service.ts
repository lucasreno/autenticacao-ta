import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as auth from 'firebase/auth';
import { User } from '../shared/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userData: User;

  constructor(
    public ngFireAuth: AngularFireAuth
  ) {
    this.ngFireAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified
        };
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  SignIn(email, password) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }

  GoogleAuth() {
    return this.ngFireAuth.signInWithPopup(new auth.GoogleAuthProvider);
  }
}
