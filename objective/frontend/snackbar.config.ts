import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

export const snackbarConfig = {
  duration: 3000,
  horizontalPosition: 'center' as MatSnackBarHorizontalPosition,
  verticalPosition: 'top' as MatSnackBarVerticalPosition, 
  panelClass: ['snackbar-error']
};
