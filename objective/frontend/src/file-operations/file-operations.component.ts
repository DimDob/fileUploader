import { SharedService } from './../shared_service';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from './file_operations_service';
import { User } from '../login-page/Interface/user_interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-file-operations',
  standalone: true,
  imports: [],
  templateUrl: './file-operations.component.html',
  styleUrls: ['./file-operations.component.css'],
})
export class FileOperationsComponent implements OnInit {
  selectedFile: File | undefined;

  public user!: User;

  apiService = inject(ApiService);
  sharedService = inject(SharedService);

  ngOnInit(): void {
    this.sharedService.user$.subscribe(user => {
      this.user = user;
    })
  }

  onFileSelect(event: any): void {
    const file = event.target.files[0];
    this.selectedFile = file;
  }

  onUpload(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('userId', this.user.userId);

      this.apiService.uploadFile(formData).subscribe(
        (response) => {
          console.log('File uploaded successfully!', response);
        },
        (error) => {
          console.error('Error uploading file', error);
        }
      );
    } else {
      console.log('No file selected for upload');
    }
  }

  onReceiveFile(): void {
    console.log('Receiving file...');
  }

  onDownload(): void {
    console.log('Downloading file...');
  }
}
