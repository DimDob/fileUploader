import { Routes } from '@angular/router';
import { LoginPageComponent } from '../login-page/login-page.component';
import { FileOperationsComponent } from '../file-operations/file-operations.component';

export const routes: Routes = [
  { path: '', component: LoginPageComponent },
  {path: 'operations', component: FileOperationsComponent}
];
