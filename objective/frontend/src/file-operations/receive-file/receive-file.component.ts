import { Component, inject, input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import Snackbar
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../file_operations_service';
import { FileReceiveDialogComponent } from "./dialog-overview/dialog-overview.component";
import { File as CustomFile, FileResponse } from '../../login-page/Interfaces/file_interface';
import { User } from '../../login-page/Interfaces/user_interface';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { snackbarConfig } from '../../../snackbar.config';

@Component({
  selector: 'app-receive-file',
  standalone: true,
  imports: [],
  templateUrl: './receive-file.component.html',
  styleUrl: './receive-file.component.css'
})
export class ReceiveFileComponent {
  readonly dialog = inject(MatDialog);
  readonly snackBar = inject(MatSnackBar);

  user = input<User>();
  http = inject(HttpClient);
  apiService = inject(ApiService);


onReceiveFile(file: CustomFile): void {
  this.apiService.receiveFile(this.user()!.userId, file)
    .pipe(
      catchError(error => {
        this.snackBar.open('File not found!', 'Close', snackbarConfig);
        return throwError(() => error);
      })
    )
    .subscribe((resp: FileResponse) => {
      const message = `File - ${resp.filename} with revision ${resp.revision} has been found in the database`
      this.snackBar.open(message, 'Close',snackbarConfig )
    });
}

  openDialog(): void {

    if (this.dialog.openDialogs.length > 0) {
      alert('Dialog already opened!')

      return;
    }

    const dialogRef = this.dialog.open(FileReceiveDialogComponent);

    dialogRef.afterClosed().subscribe((file: CustomFile) => {

      this.onReceiveFile(file);


    });
  }
}
