import { Component, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../login-page/Interface/user_interface';
import { ApiService } from '../file_operations_service';

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [FormsModule ],
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.css'
})
export class UploadFileComponent {
  selectedFile: File | undefined;

  user = input<User>();

  apiService = inject(ApiService);

  onFileSelect(event: any): void {
    const file = event.target.files[0];
    this.selectedFile = file;
  }

  onUpload(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('userId', this.user()!.userId);

      this.apiService.uploadFile(formData).subscribe(
       {
        complete() {
            alert(`File uploaded successfully!`)
          },
          error() {
            () => {
              alert('Error uploading file');
            }
          },
        },
      );
    } else {
      console.log('No file selected for upload');
    }
  }
}
