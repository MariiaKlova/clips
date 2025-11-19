import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, setDoc, doc } from '@angular/fire/firestore';
import { authState } from '@angular/fire/auth';
import { updateProfile } from 'firebase/auth';
import IUser from '../models/user.model'
import { Observable, delay, map, filter, switchMap, of} from 'rxjs';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public isAuthenticated$: Observable<boolean>;
  public isAuthenticatedWithDelay$: Observable<boolean>;
  public redirect = false;

  constructor(
    private auth: Auth,
    private db: Firestore,
    private router: Router,
    private route: ActivatedRoute

  ) {
    this.isAuthenticated$ = authState(this.auth).pipe(
      map(user => !!user)
    )
    this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(
      delay(1000)
    )
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(e => this.route.firstChild),   
      switchMap(route => route?.data ?? of({ authOnly: false}))
    ).subscribe((data) => {
      this.redirect = data.authOnly ?? false;
    })
  }

  public async createUser(userData: IUser) {
    const userCred = await createUserWithEmailAndPassword(
      this.auth,
      userData.email as string,
      userData.password as string,
    );

    if (userCred.user) {
      
      await updateProfile(userCred.user, {
        displayName: userData.name   // імʼя з моделі IUser
      });

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

  public async logout($event: Event) {
    if($event){
      $event.preventDefault();
    }
    await signOut(this.auth)

    if(this.redirect){
      await this.router.navigateByUrl('/')
    }
    
  }
}
