import { Injectable } from '@angular/core';
import { Firestore, collection, CollectionReference, addDoc } from '@angular/fire/firestore';
import IClip from '../models/clip.model';

@Injectable({
  providedIn: 'root'
})
export class ClipService {
  public clipsCollection: CollectionReference<IClip>

  constructor(private db: Firestore) {
    this.clipsCollection = collection(this.db, 'clips') as CollectionReference<IClip>;
  }

  async createClip(data: IClip) {
    return await addDoc(this.clipsCollection, data);
  }
}
