import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from './login-page/Interface/user_interface';

@Injectable({
  providedIn: 'root',
})
export class SharedService {

  private userSubject = new Subject<User>();

  user$ = this.userSubject.asObservable();

  sendUser(user: User) {
    this.userSubject.next(user);
  }
}

