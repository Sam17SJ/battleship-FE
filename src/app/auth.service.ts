import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  api = 'http://127.0.0.1:8000';
  token;

  constructor(private http: HttpClient,private router: Router) { }
  login(username: string, password: string) {
    this.http.post(this.api + '/login_check', {username: username,password: password})
    .subscribe((resp: any) => {
     
      this.router.navigate(['/juego']);
      localStorage.setItem('token', resp.token);
      localStorage.setItem('user_battleship',username);
      
      });
    }
    logout() {
      this.router.navigate(['/login']);
      localStorage.removeItem('token');
      localStorage.removeItem('user_battleship');
    }
   
    public logIn(): boolean {
      return (localStorage.getItem('token') !== null);
    }
}
