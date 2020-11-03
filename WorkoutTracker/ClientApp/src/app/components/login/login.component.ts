import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { PopperComponent } from '../popper/popper.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('slide', [
      state('left', style({
        'border-radius': '20px 0px 0px 20px',
        'marginLeft': '0px'
      })),
      state('right', style({
        'border-radius': '0px 20px 20px 0px',
        'marginLeft': '400px'
      })),
      transition('* => *', [
        animate('.25s')
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {

  @ViewChild('loginUsernameInput', { static: false }) loginUsernameInput: ElementRef;
  @ViewChild('loginPasswordInput', { static: false }) loginPasswordInput: ElementRef;
  @ViewChild('signupUsernameInput', { static: false }) signupUsernameInput: ElementRef;
  @ViewChild('signupPasswordInput', { static: false }) signupPasswordInput: ElementRef;
  @ViewChild('signupConfirmPasswordInput', { static: false }) signupConfirmPasswordInput: ElementRef;
  @ViewChild('bubble', { static: false }) bubble: ElementRef;
  @ViewChild(PopperComponent, { static: false }) popperComponent: PopperComponent;

  leftVisible: boolean = true;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  logIn(username: string, password: string): void {
    if (username.length < 8 || username.length > 20) {
      this.popperComponent.create(this.loginUsernameInput.nativeElement, 'Enter a username between 8-20 characters.');
      return;
    }
    if (password.length < 8 || password.length > 20) {
      this.popperComponent.create(this.loginPasswordInput.nativeElement, 'Enter a password between 8-20 characters.');
      return;
    }
    let user = new User(username, password);
    this.userService.login(user).subscribe(result => {
      if (result) {
        location.href = 'app'
      } else {
        this.popperComponent.create(this.loginPasswordInput.nativeElement, 'Username or password is incorrect.');
        return;
      }
    });
  }

  addUser(username: string, password: string, confirmPassword: string): void {
    if (username.length < 8 || username.length > 20) {
      this.popperComponent.create(this.signupUsernameInput.nativeElement, 'Enter a username between 8-20 characters.');
      return;
    }
    if (password.length < 8 || password.length > 20) {
      this.popperComponent.create(this.signupPasswordInput.nativeElement, 'Enter a password between 8-20 characters.');
      return;
    }
    if (password != confirmPassword) {
      this.popperComponent.create(this.signupConfirmPasswordInput.nativeElement, 'Passwords do not match');
      return;
    }
    let user = new User(username, password);
    this.userService.addUser(user).subscribe(result => {
      if (result) {
        location.href = 'app'
      } else {
        this.popperComponent.create(this.signupUsernameInput.nativeElement, 'Account already exists with this username.');
        return;
      }
    });
  }

  toggleSlider() {
    this.leftVisible = !this.leftVisible;
  }
}
