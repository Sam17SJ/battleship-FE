import { Component, OnInit } from '@angular/core';
import { JuegoService } from '../juego.service';
import { BarcosService } from '../barcos.service';
import { WebsocketService } from '../websocket.service';

/* const socket = webSocket("ws://localhost:8081");

socket.subscribe(
   msg => {
     console.log(msg);
   }, // Called whenever there is a message from the server.
   err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
   () => console.log('complete') // Called when connection is closed (for whatever reason).
 );
 */
@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {

  barcos={};
  arreglo=[0,1,2,3,4,5,6,7,8,9];
  grid=[];
  socket:WebsocketService;
  constructor(private juegoService: JuegoService, private barcoService:BarcosService) { }

  ngOnInit() {
    this.socket=new WebsocketService();
    this.socket.connect('ws://localhost:8081').subscribe(
      data => {
        alert(data['data']);
      }
    );

    this.barcoService.getBarcos()
    .subscribe(
      (data) => {
        this.barcos = data;
      },(error) => {
        console.log(error);
      }
    )
  }

  show(x, y){
    alert('x '+x+' y '+y);
  }

 
  validarBarco(event:any, i){
    var x=(<HTMLInputElement>document.getElementById('X'+i));
    var y=(<HTMLInputElement>document.getElementById('Y'+i));
    var ho=(<HTMLInputElement>document.getElementById('ho'+i)).checked;
    var noValido=false;
    var x2: any;
    var y2: any;
    var str="";
    if (parseInt(x.value)>0 && parseInt(x.value)<11 && parseInt(y.value)>0 && parseInt(y.value)<11){
      var X=parseInt(x.value)-1;
      var Y=parseInt(y.value)-1;
      var punto =document.getElementById("t"+X+Y);
      if (punto.getAttribute("class")=='middle'){
        console.log("ENTRO AL IF");
        punto.setAttribute("class","square--select");
        if(ho){
          console.log("entro al segundo if")
          var len =11-parseInt(y.getAttribute("max"));
          console.log(len)
          for (var j=1;j<len;j++){
            console.log("ENTRO AL FOR");
            var punto2=document.getElementById("t"+X+(Y+j));
            
            console.log(punto2);
            if(punto2==null){
              noValido=true;
              y2=j;
              j=11; 
              str="Valor introducido supera los limites"
              break;
            }
            if(punto2.getAttribute('class')=='square--select'){
              noValido=true;
              y2=j;
              j=11;
              str="Valor introducido choca con otro navio";
            }
            punto2.setAttribute("class","square--select");
          }
          
        }else{
          var len =11- parseInt(x.getAttribute('max'));
          console.log("HOLA SUPERA LOS LIMITES "+len)
          for (var j=1;j<len;j++){
            var punto2=document.getElementById("t"+(X+j)+Y);
            console.log("t"+(X+j)+Y);
            if(punto2==null){
              noValido=true;
              x2=j;
              j=11; 
              str="Valor introducido supera los limites"
              break;
            }
            if(punto2.getAttribute('class')=='square--select'){
              noValido=true;
              x2=j;
              j=11;
              str="Valor introducido choca con otro navio"
            }
            punto2.setAttribute("class","square--select");

          }
        }

      }else{
        alert("Valor introducido no valido vuelva a intentar");
        x.value="";
        y.value="";
      }
      if(noValido){
        punto.setAttribute("class","middle");
        if(ho){
          for (var j=1;j<y2;j++){
            var punto2=document.getElementById("t"+X+(Y+j));
            punto2.setAttribute("class","middle");
          }
          
        }else{
          for (var j=1;j<x2;j++){
            var punto2=document.getElementById("t"+(X+j)+Y);
            punto2.setAttribute("class","middle");

          }
        }
        x.value="";
        y.value="";
        alert(str);
      }
    }
    
  }

  horizontal(i){
    var ho=(<HTMLInputElement>document.getElementById('ho'+i)).checked;
    var x=(<HTMLInputElement>document.getElementById('X'+i));
    var y=(<HTMLInputElement>document.getElementById('Y'+i));
    var X=parseInt(x.value)-1;
    var Y=parseInt(y.value)-1;
  
    if(x.value!="" && y.value!=""){
      if(ho){
        y.setAttribute("max",x.getAttribute('max'));
        x.setAttribute("max",""+10);
        x.value="";
        y.value="";
        var punto =document.getElementById('t'+X+Y);
        punto.setAttribute("class","middle");
        for (var j=1;j<parseInt(y.getAttribute('max'))-1;j++){
          var punto2=document.getElementById("t"+(X+j)+Y);
          punto2.setAttribute("class","middle");

        }

      } else{
        x.setAttribute("max",y.getAttribute('max'));
        y.setAttribute("max",""+10);
        x.value="";
        y.value="";
        var punto =document.getElementById('t'+X+Y);
        punto.setAttribute("class","middle");
        for (var j=1;j<parseInt(x.getAttribute('max'))-1;j++){
          var punto2=document.getElementById("t"+X+(Y+j));
          punto2.setAttribute("class","middle");

        }
      }
    }else{
      if(ho){
        y.setAttribute("max",x.getAttribute('max'));
        x.setAttribute("max",""+10);
        x.value="";
        y.value="";
      }
      else{
        x.setAttribute("max",y.getAttribute('max'));
        y.setAttribute("max",""+10);
        x.value="";
        y.value="";
      }
    }
  }

  delete(e:any, i){
    var ho=(<HTMLInputElement>document.getElementById('ho'+i)).checked;
    var x=(<HTMLInputElement>document.getElementById('X'+i));
    var y=(<HTMLInputElement>document.getElementById('Y'+i));
    var X=parseInt(x.value)-1;
    var Y=parseInt(y.value)-1;
    if(e.keyCode == 8){
      if(ho){
        console.log('ENTRO AL DELETE')
        y.setAttribute("max",x.getAttribute('max'));
        x.setAttribute("max",""+10);
        x.value="";
        y.value="";
        var punto =document.getElementById('t'+X+Y);
        punto.setAttribute("class","middle");
        for (var j=1;j<parseInt(x.getAttribute('max'))-1;j++){
          var punto2=document.getElementById("t"+X+(j+Y));
          punto2.setAttribute("class","middle");

        }
      }else{
        console.log("ENTRO AL DELETE")
        x.setAttribute("max",y.getAttribute('max'));
        y.setAttribute("max",""+10);
        x.value="";
        y.value="";
        var punto =document.getElementById('t'+X+Y);
        punto.setAttribute("class","middle");
        for (var j=1;j<parseInt(y.getAttribute('max'))-1;j++){
          var punto2=document.getElementById("t"+(X+j)+Y);
          punto2.setAttribute("class","middle");

        }
      }
    }
    
  }
  
  guardar(){
    const data = [];
    var len=document.getElementsByName("id[]").length;
    console.log(len);
    var bandera=true;
    for(var j=0;j<len;j++){
        var i=(<HTMLInputElement>document.getElementById('id'+j));
        var x=(<HTMLInputElement>document.getElementById('X'+j));
        var y=(<HTMLInputElement>document.getElementById('Y'+j));
        var h=(<HTMLInputElement>document.getElementById('ho'+j)).checked;
        var d={};
        if(x.value=='' || y.value==''){
          bandera=false;
        }
        if(h){
          d['id']=i.value;
          d['x']=parseInt( x.value)-1;
          d['y']=parseInt( y.value)-1;
          d['ho']='H';         
        }else{
          d['id']=i.value;
          d['x']=parseInt( x.value)-1;
          d['y']=parseInt( y.value)-1;
          d['ho']='V';
        }
        data.push(d);
    }
    if(bandera){
      this.juegoService.crearGrid(data);
    }else{
      alert("Rellene todos los campos")
    }
  }

  transmitMessage() {
    var message=(<HTMLInputElement>document.getElementById('message'));
    var token=localStorage.getItem('token');
    var headers= {
      'Content-Type':  'application/json',
      'Authorization': 'Bearer '+token
     };
    var user=localStorage.getItem('user_battleship')
    var arr={
    command:'Mensajes',
    header:headers,
    token:token,
    user: user
      }
      this.socket.ws.send(JSON.stringify(arr));
}

}
