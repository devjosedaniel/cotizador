import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CotizacionService } from '../../services/cotizacion.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-cotizador',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css']
})
export class CotizacionComponent implements OnInit {

  constructor(private cotiz: CotizacionService, private route: Router, private notification: NzNotificationService) {


  }

  ngOnInit(): void {

  }

  edit(id: number): void {
    this.route.navigateByUrl('/cotizacion/' + id);
  }
  nuevo(): void {
    this.route.navigateByUrl('/cotizacion/nuevo');
  }
}
