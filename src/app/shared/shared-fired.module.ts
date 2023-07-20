import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getApps, initializeApp, provideFirebaseApp } from '@angular/fire/app';


import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { providePerformance, getPerformance } from '@angular/fire/performance';
import { provideStorage, getStorage, StorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StorageModule,
    provideFirebaseApp(
      () => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore(),
      provideStorage(() => getStorage()),
      providePerformance(() => getPerformance()),
      provideMessaging(() => getMessaging()),
      provideDatabase(() => getDatabase()),
    ),
  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase }
  ],
})
export class SharedFireModule { }
