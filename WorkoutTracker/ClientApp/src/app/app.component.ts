import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';

  private loggedIn: boolean = false;

  constructor(private userService: UserService) {
    this.authorize();
  }

  ngOnInit() {
  }

  authorize() {
    this.userService.authorize().subscribe(result => {
      console.log(location.href);
      if (result == false && location.href.indexOf('app/login') == -1 && location.href.indexOf('app/register') == -1) {
        location.href = 'app/login';
      } else {
        this.loggedIn = true;
      }
    })
  }

}
