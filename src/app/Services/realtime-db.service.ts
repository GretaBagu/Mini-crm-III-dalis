
import { Injectable } from '@angular/core';
import { ref, set, get, child, update, remove } from 'firebase/database';
import { realtimeDb } from '../firebase.config';

@Injectable({
  providedIn: 'root'
})
export class RealtimeDbService {
  constructor() {}

  writeData(path: string, data: any) {
    return set(ref(realtimeDb, path), data);
  }

  readData(path: string) {
    return get(child(ref(realtimeDb), path));
  }

  updateData(path: string, data: any) {
    return update(ref(realtimeDb, path), data);
  }

  deleteData(path: string) {
    return remove(ref(realtimeDb, path));
  }
}
