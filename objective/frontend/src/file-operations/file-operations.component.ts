import { Component, output } from '@angular/core';
import { User } from '../login-page/Interface/user_interface';
import { UploadFileComponent } from "./upload-file/upload-file.component";
import { ReceiveFileComponent } from "./receive-file/receive-file.component";
import { FileReceiveDialogComponent } from "./receive-file/dialog-overview/dialog-overview.component";

@Component({
  selector: 'app-file-operations',
  standalone: true,
  imports: [UploadFileComponent, ReceiveFileComponent, FileReceiveDialogComponent],
  templateUrl: './file-operations.component.html',
  styleUrls: ['./file-operations.component.css'],
})
export class FileOperationsComponent {
  selectedFile: File | undefined;

  public user!: User;

  onUserLogin = output<User>();

  constructor() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.onUserLogin.emit(this.user)
    }
  }

  onFileSelect(event: any): void {
    const file = event.target.files[0];
    this.selectedFile = file;
  }

  onDownload(): void {
    console.log('Downloading file...');
  }
}
