import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Storage, uploadBytesResumable, ref, getDownloadURL } from '@angular/fire/storage';
import { Auth, user  } from '@angular/fire/auth';
import { User } from 'firebase/auth';
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
  showAlert = false;
  alertMsg = 'Please wait!'
  alertColor = 'blue'
  inSubmission = false
  percentage = 0
  showPercentage = false;
  user: User | null = null;


  title = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ],);

  uploadForm = new FormGroup({
    title: this.title
  })

  constructor(
    private storage: Storage, 
    private auth: Auth
  ) { 
    user(this.auth).subscribe(u => this.user = u);
  }

  ngOnInit(): void {}

  public storeFile($event: Event) {

    this.isDragover = false;

    this.file = ($event as unknown as DragEvent).dataTransfer?.files.item(0) ?? null;
    if (!this.file || this.file.type !== 'video/mp4') {
      alert('File must be a video/mp4')
      return;
    }

    this.title.setValue(this.file?.name.split('.')[0] ?? '');
    this.nextStep = true;
  }
  

  uploadFile() {
    this.showAlert = true;
    this.alertMsg = 'Uploading...';
    this.alertColor = 'blue';
    this.inSubmission = true;

    const clipFileName = uuid();
    const clipPath = `clips/${clipFileName}.mp4`;
    const storageRef = ref(this.storage, clipPath);

    const task = uploadBytesResumable(storageRef, this.file!);

    task.on('state_changed',
      (snapshot) => {
        this.percentage = snapshot.bytesTransferred / snapshot.totalBytes;
        this.showPercentage = true;
      },
      (error) => {
        this.alertMsg = 'Upload failed!';
        this.alertColor = 'red';
        this.inSubmission = false;
        console.log("Upload failed!", error); 
        this.showPercentage = false;
      },
      async () => {
        const url = await getDownloadURL(storageRef);
        const clip = {
          uid: this.user?.uid,
          displayName: this.user?.displayName,
          title: this.title.value as string,
          fileName: `${clipFileName}.mp4`,
          url
        }

        console.log("Clip object:", clip);

        this.alertMsg = 'Upload completed!';
        this.alertColor = 'green';
        this.inSubmission = false;
        this.showPercentage = false;
      }
    );
  }
}
