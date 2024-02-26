import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Auth as AdminAuth, UserRecord } from 'firebase-admin/auth';
import {
  uploadBytes,
  getDownloadURL,
  ref,
  FirebaseStorage,
} from 'firebase/storage';
import {
  getAdminAuth,
  getFirebaseAppAuth,
  getFirebaseConfig,
} from 'src/firebase/firebase.config';
import { Auth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

@Injectable()
export class FirebaseService implements OnModuleInit {
  app: Auth;
  admin: AdminAuth;
  storage: FirebaseStorage;

  async onModuleInit() {
    const configService = new ConfigService();
    this.admin = getAdminAuth(configService);
    this.app = getFirebaseAppAuth(configService);
    this.storage = getStorage();
  }

  async uploadImage(file: File) {
    const storageRef = ref(this.storage, `post-image/${Date.now()}`);
    const imageUrl = await uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => url);
    });
    console.log(imageUrl);
    return imageUrl;
  }
}
