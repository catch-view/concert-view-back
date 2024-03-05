import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { initializeApp, getApp, getApps, FirebaseApp } from 'firebase/app';
import { Auth as AdminAuth } from 'firebase-admin/auth';
import { FirebaseStorage, getStorage, listAll, ref } from 'firebase/storage';

@Injectable()
export class FirebaseService implements OnModuleInit {
  app: FirebaseApp;
  admin: AdminAuth;
  storage: FirebaseStorage;

  async onModuleInit() {
    const configService = new ConfigService();
    const firebaseConfig = {
      projectId: configService.get<string>('FIREBASE_PROJECT_ID'),
      apiKey: configService.get<string>('FIREBASE_API_KEY'),
      authDomain: configService.get<string>('FIREBASE_AUTH_DOMAIN'),
      storageBucket: configService.get<string>('FIREBASE_STORAGE_BUCKET'),
      messagingSenderId: configService.get<string>(
        'FIREBASE_MESSAGING_SENDER_ID',
      ),
      appId: configService.get<string>('FIREBASE_APP_ID'),
    };
    // Initialize Firebase
    this.app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    this.storage = getStorage();
  }

  async getAllPostImages() {
    const storageRef = ref(this.storage, 'image'); // Replace with your actual path

    try {
      const result = await listAll(storageRef);

      // Extract file names from the result
      const imageNames = result.items.map((item) => item.name);
      return imageNames;
    } catch (error) {
      console.error('Error listing images in storage:', error);
      throw error;
    }
  }
}
