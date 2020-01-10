import { Component, OnInit,ComponentFactoryResolver } from '@angular/core';
import { WebsocketService } from '../websocket.service';
import { Renderer2, ViewChild, ElementRef } from '@angular/core';
import {TableroComponent } from './tablero/tablero.component'
import { JuegoComponent } from '../juego/juego.component';
import { TableroDirective } from '../tablero.directive';


@Component({
  selector: 'app-batalla',
  templateUrl: './batalla.component.html',
  styleUrls: ['./batalla.component.css']
})
export class BatallaComponent implements OnInit {

  socket:WebsocketService;
  bar:boolean;
  turno=true;
  turnoE=true;
  comp:any;
  @ViewChild(TableroDirective, {static: true}) eldinamico: TableroDirective;
  constructor(private cfr: ComponentFactoryResolver) { }

  ngOnInit() {
    this.socket=new WebsocketService();
    this.socket.connect('ws://localhost:8081').subscribe(
      data => {
        var datos =JSON.parse(data.data)
        console.log(datos)
        switch(datos.command){
          case 'PlayGame':
            sessionStorage.setItem('turno','1')
            sessionStorage.setItem('idGrid',datos.grid)
            sessionStorage.setItem('player',datos.player)
            sessionStorage.setItem('idJuego',datos.idJuego)
            sessionStorage.setItem('gridE', datos.gridE)
            if(datos.player==1){
              console.log('Entron aqui jugador1')
              this.turno=false;
            }else{
              this.turnoE=false;
              console.log('Entron aqui jugador2')
            }
            this.mostrarTablero()
          break;
          case 'Esperar':
            var n =parseInt( sessionStorage.getItem('turno'))
            n++
            sessionStorage.setItem('turno',''+n)
            this.comp.instance.tablero2(datos.x,datos.y,datos.resp)
          break;
          case 'Dispare':
            var n =parseInt( sessionStorage.getItem('turno'))
            n++
            sessionStorage.setItem('turno',''+n)
            this.turnoE=true;
            this.turno=false;
            this.comp.instance.tablero1(datos.x,datos.y,datos.resp)
          break;

        }
      }
    );
    this.bar=true
  }

  Listo(){
    var token=localStorage.getItem('token');
    var user=localStorage.getItem('user_battleship')
    var arr={
    command:'Listo',
    token:token,
    user: user
    }
    this.socket.ws.send(JSON.stringify(arr))
    var btn=document.getElementById('listo')
    btn.remove();
    this.bar=false

  }
  mostrarTablero(){
    this.bar=true
    let cf = this.cfr.resolveComponentFactory(TableroComponent)
    let vcr = this.eldinamico.viewContainerRef;
    this.comp = vcr.createComponent(cf, 0);
    //if (!comp || !comp.instance || !comp.instance.disparo) continue;
    this.comp.instance.disparo.subscribe(msg => this.onDisparar(msg))
  }

  onDisparar(disparo){
    console.log('Entro al padre '+disparo['x']+" "+disparo['y'])
    this.turnoE=false;
    this.turno=true;
    var token=localStorage.getItem('token');
    var user=localStorage.getItem('user_battleship')
    var idjuego = sessionStorage.getItem('idJuego')
    var idGridE= sessionStorage.getItem('gridE')
    var arr={
    command:'Disparo',
    token:token,
    user: user,
    x:disparo['x'],
    y:disparo['y'],
    idJuego:idjuego,
    grid:idGridE
    }
    this.socket.ws.send(JSON.stringify(arr))
  }
}
