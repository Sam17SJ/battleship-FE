import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { BarcoComponent } from './barco/barco.component';
import { BarcosService } from './barcos.service';
import { JuegoService } from './juego.service';
import { JuegoComponent } from './juego/juego.component';
import { WebsocketService } from './websocket.service';
import { BatallaComponent } from './batalla/batalla.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { TableroDirective } from './tablero.directive';
import { TableroComponent } from './batalla/tablero/tablero.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BarcoComponent,
    JuegoComponent,
    BatallaComponent,
    TableroDirective,
    TableroComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    MatProgressBarModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/', pathMatch: 'full' },
      { path: 'login', component: LoginComponent , pathMatch: 'full'},
      { path: 'barcos', component: BarcoComponent },
      { path: 'juego', component: JuegoComponent},
      { path: 'batalla', component: BatallaComponent },
      { path: 'tablero', component: TableroComponent }
    ]),
    BrowserAnimationsModule,
  ],
  providers: [AuthService,
              BarcosService, 
              JuegoService,
              WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
