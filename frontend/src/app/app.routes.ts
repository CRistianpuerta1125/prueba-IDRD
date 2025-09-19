import { Routes } from '@angular/router';
import { MaterialesComponent } from './pages/materiales/materiales.component';
import { ProyectosComponent } from './pages/proyectos/proyectos.component';
import { UnidadesComponent } from './pages/unidades/unidades.component';

export const routes: Routes = [
  { path: '', redirectTo: '/materiales', pathMatch: 'full' },
  { path: 'materiales', component: MaterialesComponent },
  { path: 'proyectos', component: ProyectosComponent },
  { path: 'unidades', component: UnidadesComponent },
  { path: '**', redirectTo: '/materiales' }
];
