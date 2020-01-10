import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { error } from 'util';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {

  api = 'http://127.0.0.1:8000/api/juego';
  token='';

  constructor(private http: HttpClient,private router: Router) {
    this.token=localStorage.getItem('token');
   }

  
  obtenerGrid(){
    const httpOptions = {
      headers: new HttpHeaders({
       'Content-Type':  'application/json',
       'Authorization': 'Bearer '+this.token
      })
    }
    var grid=sessionStorage.getItem('idGrid')
    return this.http.get(this.api + '/obtener_grid/'+grid, httpOptions)
  }

  crearGrid( data:any){

    const httpOptions = {
      headers: new HttpHeaders({
       'Content-Type':  'application/json',
       'Authorization': 'Bearer '+this.token
      })
    }
    var username= localStorage.getItem('user_battleship');
    this.http.post(this.api + '/grip', {barcos: data,user:username},httpOptions)
    .subscribe(resp => {
      
      this.router.navigate(['batalla']);
      },
      error =>{
        console.log(error);
      })
      ;
  }


}
