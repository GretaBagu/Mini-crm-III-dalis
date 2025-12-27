
import { Injectable } from '@angular/core';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../firebase.config';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  async uploadFile(path: string, file: File) {
    const fileRef = ref(storage, path);
    const snapshot = await uploadBytes(fileRef, file);
    return getDownloadURL(snapshot.ref);
  }

  async deleteFile(path: string) {
    const fileRef = ref(storage, path);
    return deleteObject(fileRef);
  }
}
