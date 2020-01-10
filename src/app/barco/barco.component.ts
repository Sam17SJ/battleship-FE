import { Component, OnInit } from '@angular/core';
import { BarcosService } from '../barcos.service';

@Component({
  selector: 'app-barco',
  templateUrl: './barco.component.html',
  styleUrls: ['./barco.component.css']
})
export class BarcoComponent implements OnInit {

  title = 'Barcos';

  barcos:{}

  constructor(protected barcoService: BarcosService) { }

  ngOnInit() {
    this.barcoService.getBarcos()
    .subscribe(
      (data) => {
        this.barcos = data;
      },(error) => {
        console.log(error);
      }
    )
  }

}
