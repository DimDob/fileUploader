import { File } from './../Interfaces/file';
import { Component, inject, input, output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { File as CustomFile } from '../Interfaces/file'
import { ApiService } from '../../file_operations_service';
import { User } from '../../../login-page/Interface/user_interface';
@Component({
  selector: 'app-dialog-overview',
  templateUrl: './dialog-overview.component.html',
  styleUrls: ['./dialog-overview.component.css'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    FormsModule,
  ],
})
export class FileReceiveDialogComponent {

  user = input<User>();

  public file: CustomFile = { filename: '', revision: '' };

  constructor(public dialogRef: MatDialogRef<FileReceiveDialogComponent>) {}

  apiService = inject(ApiService);

  onSubmit(): void {
    this.dialogRef.close(this.file);
  }

}
