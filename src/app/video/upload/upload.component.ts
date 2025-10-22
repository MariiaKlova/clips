import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Storage, uploadBytes, ref } from '@angular/fire/storage';
import { v4 as uuid } from 'uuid'

@Component({
  selector: 'app-upload',
  standalone: false,
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})

export class UploadComponent implements OnInit {

  isDragover = false;
  file: File | null = null;
  nextStep = false;

  titleForm = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ],);

  uploadForm = new FormGroup({
    title: this.titleForm
  })

  constructor(private storage: Storage){}

  ngOnInit(): void {
  }

  public storeFile($event: Event) {

    this.isDragover = false;

    this.file = ($event as unknown as DragEvent).dataTransfer?.files.item(0) ?? null;
    if (!this.file || this.file.type !== 'video/mp4') {
      alert('File must be a video/mp4');
      return;
    }

    this.titleForm.setValue(this.file?.name.split('.')[0] ?? '');
    this.nextStep = true;
  }
  uploadFile(){
    const clipFileName = uuid()
    const clipPath = `clips/${clipFileName}.mp4`
    const storageRef = ref(this.storage, clipPath);

    uploadBytes(storageRef, this.file!);

    console.log('File upload');
    
  }
}
