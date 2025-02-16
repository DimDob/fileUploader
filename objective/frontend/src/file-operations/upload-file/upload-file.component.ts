import { Component, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../login-page/Interfaces/user_interface';
import { ApiService } from '../file_operations_service';

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
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

      this.apiService.uploadFile(formData).subscribe({
        error: () => {
          alert('Error uploading file');
        },
        complete: () => {
          alert(`File ${this.selectedFile!.name} has been successfully uploaded!`);
        }
      });
    }
  }
}
