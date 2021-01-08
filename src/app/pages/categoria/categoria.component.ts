import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Categoria } from '../../models/categoria';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  searchValue = '';
  visible = false;
  cargando = true;
  categorias: Categoria[] = [];
  listOfDisplayData = [];
  constructor(private categSrv: CategoriaService, private route: Router, private notification: NzNotificationService) { }

  ngOnInit(): void {
    this.categSrv.listar().subscribe(res => {
      this.cargando = false;
      if (res.ok === true) {
        this.categorias.push(...res.categorias);
        this.listOfDisplayData = [... this.categorias];
      }
    }, err => {
      this.cargando = false;
    });
  }
  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.categorias.filter((categoria: Categoria) => {
      const nombreCateg = categoria.nombre.toLowerCase();
      const busqueda = this.searchValue.toLowerCase();
      return nombreCateg.indexOf(busqueda) !== -1;
    });
  }
  reset(): void {
    this.searchValue = '';
    this.search();
  }
  edit(id: number): void {
    this.route.navigateByUrl('/categoria/' + id);
  }
  nuevo(): void {
    this.route.navigateByUrl('/categoria/nuevo');
  }
  eliminar(id): void {
    this.categSrv.eliminar(id).subscribe(res => {
      if (res.ok === true) {
        this.notification.create(
          'success', 'Correcto', res.mensaje
        );
        this.listOfDisplayData = this.listOfDisplayData.filter(d => d.id !== id);
      }
    }, err => { });
  }
}
