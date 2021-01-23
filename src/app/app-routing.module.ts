import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { CotizacionComponent } from './pages/cotizacion/cotizacion.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { EditClienteComponent } from './pages/cliente/edit-cliente/edit-cliente.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { EditCategoriaComponent } from './pages/categoria/edit-categoria/edit-categoria.component';
import { EditProductoComponent } from './pages/productos/edit-producto/edit-producto.component';
import { EditCotizacionComponent } from './pages/cotizacion/edit-cotizacion/edit-cotizacion.component';
import { LoginComponent } from './pages/login/login.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'v1',
    loadChildren: () =>
      import('./pages/principal/principal.module').then(
        (m) => m.PrincipalModule
      ),
    // canActivate: [AuthGuard],
  },
  { path: '', pathMatch: 'full', redirectTo: 'v1' },
  { path: '**', redirectTo: 'vi' },
  { path: 'auth', component: LoginComponent },

  {
    path: 'welcome',
    loadChildren: () =>
      import('./pages/welcome/welcome.module').then((m) => m.WelcomeModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
