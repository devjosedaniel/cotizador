import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'main',
    loadChildren: () =>
      import('./pages/principal/principal.module').then(
        (m) => m.PrincipalModule
      ),
    canActivate: [AuthGuard],
  },
  { path: '', pathMatch: 'full', redirectTo: 'main' },
  // { path: '**', redirectTo: 'main' },
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
export class AppRoutingModule { }
