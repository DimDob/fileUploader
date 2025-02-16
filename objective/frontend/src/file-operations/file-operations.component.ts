import { Component, output } from '@angular/core';
import { User } from '../login-page/Interfaces/user_interface';
import { UploadFileComponent } from "./upload-file/upload-file.component";
import { ReceiveFileComponent } from "./receive-file/receive-file.component";
import { DownloadFileComponent } from "./download-file/download-file.component";

@Component({
  selector: 'app-file-operations',
  standalone: true,
  imports: [UploadFileComponent, ReceiveFileComponent, DownloadFileComponent],
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

}
