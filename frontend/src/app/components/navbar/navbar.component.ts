import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Observable} from "rxjs/index";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.authService = authService;
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isUserLoggedIn;
  }

  logout() {
    this.authService.logout();
  }

}
