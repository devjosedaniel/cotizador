import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

interface DataItem {
  name: string;
  age: number;
  address: string;
}
@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  searchValue = '';
  visible = false;
  cargando = true;
  clientes: Cliente[] = [];
  listOfDisplayData = [];
  constructor(private clienteSrv: ClienteService, private route: Router, private notification: NzNotificationService) {
  }

  ngOnInit(): void {
    this.clienteSrv.listar().subscribe(res => {
      this.cargando = false;
      if (res.ok === true) {
        this.clientes.push(...res.clientes);
        this.listOfDisplayData = [... this.clientes];
      }
    }, err => {
      this.cargando = false;
    });
  }
  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.clientes.filter((cliente: Cliente) => {
      const nombreCliente = cliente.nombre.toLowerCase();
      const busqueda = this.searchValue.toLowerCase();
      return nombreCliente.indexOf(busqueda) !== -1;
    });
  }
  reset(): void {
    this.searchValue = '';
    this.search();
  }
  edit(id: number): void {
    this.route.navigateByUrl('main/cliente/' + id);
  }
  nuevo(): void {
    this.route.navigateByUrl('main/cliente/nuevo');
  }
  eliminar(id): void {
    this.clienteSrv.eliminar(id).subscribe(res => {
      if (res.ok === true) {
        this.notification.create(
          'success', 'Correcto', res.mensaje
        );
        this.listOfDisplayData = this.listOfDisplayData.filter(d => d.id !== id);
      }
    }, err => { });
  }
}
