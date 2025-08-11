import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const app = initializeApp(environment.firebase);
const auth = getAuth(app);


onAuthStateChanged(auth, () => {
    platformBrowserDynamic()
      .bootstrapModule(AppModule, { ngZoneEventCoalescing: true })
      .catch(err => console.error(err));
});


