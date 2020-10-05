import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessageHidden: boolean = true;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  logIn(username: string, password: string): void {
    this.errorMessageHidden = true;
    let user = new User(username, password);
    this.userService.login(user).subscribe(result => {
      if (result) {
        location.href = 'app'
      } else {
        this.errorMessageHidden = false;
      }
    });
  }

}
