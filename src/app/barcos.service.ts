import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BarcosService {

  api = 'http://127.0.0.1:8000/api';
  token='';
  req={};
  
  constructor(private http: HttpClient,private router: Router) { 
    this.token=localStorage.getItem('token');
  }

  getBarcos(){

/*     this.req= {
      method: 'GET',
      url: "http://127.0.0.1:8000/api/barco/barcos",
      headers:{
          'Content-Type':'application/json',
          'Authorization':'Bearer '+this.token,
      },
      data: {test: 'test'}
  }; */
    const httpOptions = {
    headers: new HttpHeaders({
     'Content-Type':  'application/json',
     'Authorization': 'Bearer '+this.token
    })
  }
    return this.http.get(this.api + '/barco/barcos', httpOptions)
    }

}
