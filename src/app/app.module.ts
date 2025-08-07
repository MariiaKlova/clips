import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { NavComponent } from './nav/nav.component';
import { environment} from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
  ],
  providers: [
    provideAuth(() => getAuth()),
    provideClientHydration(withEventReplay()),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
