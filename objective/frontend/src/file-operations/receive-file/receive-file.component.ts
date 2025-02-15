import { Component, inject, input } from '@angular/core';
import { User } from '../../login-page/Interface/user_interface';
import { ApiService } from '../file_operations_service';
import { HttpClient } from '@angular/common/http';
import { FileReceiveDialogComponent } from "./dialog-overview/dialog-overview.component";
import {File as CustomFile} from './Interfaces/file'
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-receive-file',
  standalone: true,
  imports: [],
  templateUrl: './receive-file.component.html',
  styleUrl: './receive-file.component.css'
})
export class ReceiveFileComponent {
  readonly dialog = inject(MatDialog);

  user = input<User>();

  http = inject(HttpClient)

  apiService = inject(ApiService);

  onReceiveFile(file: CustomFile): void {
    this.apiService.receiveFile(this.user()!.userId, file).subscribe(response => {
      console.log(response);

    })
  }
   openDialog(): void {

      const dialogRef = this.dialog.open(FileReceiveDialogComponent);
      dialogRef.afterClosed().subscribe( (file: CustomFile)=> {
        this.onReceiveFile(file)
      });
    }

}
