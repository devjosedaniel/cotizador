import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CotizacionComponent } from './pages/cotizacion/cotizacion.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { EditClienteComponent } from './pages/cliente/edit-cliente/edit-cliente.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { EditCategoriaComponent } from './pages/categoria/edit-categoria/edit-categoria.component';
import { EditProductoComponent } from './pages/productos/edit-producto/edit-producto.component';
import { EditCotizacionComponent } from './pages/cotizacion/edit-cotizacion/edit-cotizacion.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'cotizacion', component: CotizacionComponent },
  { path: 'cotizacion/:id', component: EditCotizacionComponent },
  { path: 'cliente', component: ClienteComponent },
  { path: 'cliente/:id', component: EditClienteComponent },
  { path: 'producto', component: ProductosComponent },
  { path: 'producto/:id', component: EditProductoComponent },
  { path: 'categoria', component: CategoriaComponent },
  { path: 'categoria/:id', component: EditCategoriaComponent },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
