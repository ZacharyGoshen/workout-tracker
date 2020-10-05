import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  errorMessageHidden: boolean = true;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  addUser(username: string, password: string): void {
    this.errorMessageHidden = true;
    let user = new User(username, password);
    this.userService.addUser(user).subscribe(result => {
      if (result) {
        location.href = 'app'
      } else {
        this.errorMessageHidden = false;
      }
    });
  }

}
