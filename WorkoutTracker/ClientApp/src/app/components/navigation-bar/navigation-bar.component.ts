import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  @Input() currentPage: string;

  isCollapsed = true;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  logout(): void {
    this.userService.logout().subscribe(() => location.href = '/app/login');
  }

}
