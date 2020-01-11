import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username = '';
  password = '';
  password1='';

  constructor(private authService: AuthService) { }

  register() {
    this.authService.login(this.username, this.password)
     
    }
  ngOnInit() {
  }

}
