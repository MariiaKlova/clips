import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, setDoc, doc } from '@angular/fire/firestore';
import { authState } from '@angular/fire/auth';
import IUser from '../models/user.model'
import { Observable, delay, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public isAuthenticated$: Observable<boolean>;
  public isAuthentifacetedWithDelay$: Observable<boolean>;

  constructor(
    private auth: Auth,
    private db: Firestore
  ) { 
    this.isAuthenticated$ = authState(this.auth).pipe(
      map(user => !!user)
    ) 
    this.isAuthentifacetedWithDelay$ = this.isAuthenticated$.pipe(
      delay(1000)
    )
  }

  public async createUser(userData: IUser) {
    const userCred = await createUserWithEmailAndPassword(
      this.auth,
      userData.email as string,
      userData.password as string
    );

    if (userCred.user) {
      await setDoc(
        doc(this.db, 'users', userCred.user.uid),
        {
          ...userData,
          uid: userCred.user.uid,
          createdAt: new Date()
        }
      );
    }
    console.log(userCred);
  }
}
