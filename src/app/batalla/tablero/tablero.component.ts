import { Component, OnInit,Output, EventEmitter  } from '@angular/core';
import { JuegoService } from '../../juego.service';
import { error } from 'protractor';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {

  arreglo=[0,1,2,3,4,5,6,7,8,9];
  grid={};
  @Output() disparo =new EventEmitter<any>();

  constructor(private juegoService: JuegoService) { }

  ngOnInit() {

    this.juegoService.obtenerGrid().subscribe(
      (data) => {
        this.grid=data['grid']
        console.log(data);
      },(error) => {
        console.log(error);
      }
    );
  
  }
  disparar(x,y){
   // alert("Disparo a la cordenada ("+(x+1)+","+(y+1)+")")
   var punto=document.getElementById('t2'+x+y)
   if(punto.getAttribute('class')=='middle' || punto.getAttribute('class')==""){
     punto.setAttribute('class','')
    console.log('disparo')
    var turn=parseInt(sessionStorage.getItem('turno'))
    var player =parseInt(sessionStorage.getItem('player'))
    var punt ={}
    punt['x']=x
    punt['y']=y
    if((turn%2)==1){
      if(player==1){
        console.log('<.><.><.><.><.><.><.><.><.><.><.><.>')
        this.disparo.emit(punt)
      }
    }else{
      if(player==2){
        console.log('<.><.><.><.><.><.><.><.><.><.><.><.>')
        this.disparo.emit(punt);
      }
    }
   }else alert("Ya ataco este punto")
   
  }
  
  tablero1(x,y,r){
    var punto=document.getElementById('t1'+x+y)
    if(r==1){
      punto.setAttribute('class',"square--hit figure")
    }
    if(r==0){
      punto.setAttribute('class',"square--miss figure")
    }
    if(r==5){
      punto.setAttribute('class',"square--hit2 figure")
    }
  }

  tablero2(x,y,r){
      var punto=document.getElementById('t2'+x+y)
      if(r==1){
        punto.setAttribute('class',"square-- square--hit figure")
      }
      if(r==0){
        punto.setAttribute('class',"square-- square--miss figure")
      }
      if(r==5){
        punto.setAttribute('class',"square-- square--hit2 figure")
      }
  }
}


