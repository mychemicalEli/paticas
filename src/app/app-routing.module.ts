import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'shelters', loadChildren: () => import('./shelters/shelters.module').then(m => m.SheltersModule) },
  { path: 'paticas', loadChildren: () => import('./paticas/paticas.module').then(m => m.PaticasModule) },
  { path: 'colaborate', loadChildren: () => import('./colaborate/colaborate.module').then(m => m.ColaborateModule) },
  { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },
  { path: 'volunteers', loadChildren: () => import('./volunteers/volunteers.module').then(m => m.VolunteersModule) },
  { path: 'formularios', loadChildren: () => import('./formularios/formularios.module').then(m => m.FormulariosModule) },
  { path: 'shelterPaticas', loadChildren: () => import('./shelter-paticas/shelter-paticas.module').then(m => m.ShelterPaticasModule) }];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
