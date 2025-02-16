import { Component, inject, output } from '@angular/core';
import { User } from './Interfaces/user_interface';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, of, Subject } from 'rxjs';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  router = inject(Router)

  public user: User;

  constructor() {

    //I mock this user until i create a db with an existing user in it
    this.user = {
      username: '',
      password: '',
      userId: '1'
    }

  }

  public onSubmit(): void { //Todo add service when auth is rdy
    this.router.navigate(['operations'])
    localStorage.setItem('user', JSON.stringify(this.user));

  }
}
