import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
 
import { AuthService } from '../auth.service';
 
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
   
  constructor(private authService: AuthService) {
     
  }
  login() {
  this.authService.login(this.username, this.password)
   
  }
 
  ngOnInit() { 

  }
}