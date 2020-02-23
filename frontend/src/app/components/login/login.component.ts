import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {AlertService} from 'ngx-alerts';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router,
              private alertService: AlertService) { }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/');
    }
  }

  loginUser(data): void {
    const username = data.value.username;
    const password = data.value.password;

    this.authService.login(username, password).catch(err => {
      this.alertService.danger(err.message);
    });
  }

}
