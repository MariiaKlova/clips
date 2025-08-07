import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import firedbase from 'firebase/compat/app';
import 'firebase/compat/auth';

firedbase.initializeApp(environment.firebase)

let appInit = false

firedbase.auth().onAuthStateChanged(() => {
  if (!appInit) {
    platformBrowserDynamic()
      .bootstrapModule(AppModule, { ngZoneEventCoalescing: true, })
      .catch(err => console.error(err));
  }
  appInit = true
})


