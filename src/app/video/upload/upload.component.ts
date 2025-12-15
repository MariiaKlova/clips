import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Storage, uploadBytesResumable, ref, getDownloadURL } from '@angular/fire/storage';
import { UploadTask } from 'firebase/storage';
import { Auth, user  } from '@angular/fire/auth';
import { User } from 'firebase/auth';
import { v4 as uuid } from 'uuid'
import { ClipService } from '../../services/clip.service';

@Component({
  selector: 'app-upload',
  standalone: false,
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})

export class UploadComponent implements OnDestroy {

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
  task?: UploadTask;
  


  title = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ],);

  uploadForm = new FormGroup({
    title: this.title
  })

  constructor(
    private storage: Storage, 
    private auth: Auth,
    private ClipService: ClipService
  ) { 
    user(this.auth).subscribe(u => this.user = u);
  }
  ngOnDestroy(): void {
    this.task?.cancel()
  }

  storeFile($event: Event) {
    this.isDragover = false;

    this.file = ($event as unknown as DragEvent).dataTransfer ? 
    ($event as unknown as DragEvent).dataTransfer?.files.item(0) ?? null :
    ($event.target as HTMLInputElement).files?.item(0) ?? null;

    if (!this.file || this.file.type !== 'video/mp4') {
      return;
    }

    this.title.setValue(this.file?.name.split('.')[0] ?? '');
    this.nextStep = true;
  }
  
  uploadFile() {
    this.uploadForm.disable();

    this.showAlert = true;
    this.alertMsg = 'Uploading...';
    this.alertColor = 'blue';
    this.inSubmission = true;

    const clipFileName = uuid();
    const clipPath = `clips/${clipFileName}.mp4`;
    const storageRef = ref(this.storage, clipPath);

    this.task = uploadBytesResumable(storageRef, this.file!);

    this.task.on('state_changed',
      (snapshot) => {
        this.percentage = snapshot.bytesTransferred / snapshot.totalBytes;
        this.showPercentage = true;
      },
      (error) => {
        this.uploadForm.enable();
        
        this.alertMsg = 'Upload failed!';
        this.alertColor = 'red';
        this.inSubmission = false;
        console.log("Upload failed!", error); 
        this.showPercentage = false;
      },
      async () => {
        const url = await getDownloadURL(storageRef);
        const clip = {
          uid: this.user?.uid as string,
          displayName: this.user?.displayName as string,
          title: this.title.value as string,
          fileName: `${clipFileName}.mp4`,
          url
        }

        this.ClipService.createClip(clip);

        console.log("Clip object:", clip);

        this.alertMsg = 'Upload completed!';
        this.alertColor = 'green';
        this.inSubmission = false;
        this.showPercentage = false;
      }
    );
  }
}
