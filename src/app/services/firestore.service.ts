
import { Injectable } from '@angular/core';
import { collection, addDoc, getDocs, query, where, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase.config';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor() {}

  async addDocument(collectionName: string, data: any) {
    return await addDoc(collection(db, collectionName), data);
  }

  async getDocuments(collectionName: string) {
    const snapshot = await getDocs(collection(db, collectionName));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async getDocumentById(collectionName: string, id: string) {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
  }

  async updateDocument(collectionName: string, id: string, data: any) {
    const docRef = doc(db, collectionName, id);
    return await updateDoc(docRef, data);
  }

  async deleteDocument(collectionName: string, id: string) {
    const docRef = doc(db, collectionName, id);
    return await deleteDoc(docRef);
  }
}
