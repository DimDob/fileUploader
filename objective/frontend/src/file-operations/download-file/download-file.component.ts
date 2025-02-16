import { HttpClient } from '@angular/common/http';
import { Component, inject, input } from '@angular/core';
import { User } from '../../login-page/Interfaces/user_interface';
import { ApiService } from '../file_operations_service';
import { FileReceiveDialogComponent } from '../receive-file/dialog-overview/dialog-overview.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { File as CustomFile, FileResponse } from '../../login-page/Interfaces/file_interface';
import { snackbarConfig } from '../../../snackbar.config';

@Component({
  selector: 'app-download-file',
  standalone: true,
  imports: [],
  templateUrl: './download-file.component.html',
  styleUrl: './download-file.component.css'
})
export class DownloadFileComponent {
 readonly dialog = inject(MatDialog);
  readonly snackBar = inject(MatSnackBar);

  user = input<User>();
  http = inject(HttpClient);
  apiService = inject(ApiService);
  onDownloadFile(file: CustomFile): void {
    this.apiService.downloadFile(this.user()!.userId, file).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        alert(`Download of file ${file.filename} started!`);
      },
      error: () => {
        this.snackBar.open(`File '${file.filename}' has not been found!`, 'Close', snackbarConfig);
      }
    });
  }

  openDialog(): void {

    if (this.dialog.openDialogs.length > 0) {
      alert('Dialog already opened!')

      return;
    }

    const dialogRef = this.dialog.open(FileReceiveDialogComponent);

    dialogRef.afterClosed().subscribe((file: CustomFile) => {

      this.onDownloadFile(file);


    });
  }
}
