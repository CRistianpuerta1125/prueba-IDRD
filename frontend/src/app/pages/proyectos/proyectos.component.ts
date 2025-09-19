import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { ProyectosService } from '../../services/proyectos.service';
import { Proyecto } from '../../models/proyecto.model';
import { ProyectoDialogComponent } from './proyecto-dialog/proyecto-dialog.component';

@Component({
  selector: 'app-proyectos',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.scss'
})
export class ProyectosComponent implements OnInit {

  constructor(
    private proyectosService: ProyectosService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  get proyectos() {
    return this.proyectosService.proyectos;
  }

  ngOnInit() {
    this.loadProyectos();
  }

  loadProyectos() {
    this.proyectosService.getAll().subscribe({
      error: (error) => {
        this.snackBar.open('Error al cargar proyectos', 'Cerrar', { duration: 3000 });
      }
    });
  }

  openDialog(proyecto?: Proyecto) {
    const dialogRef = this.dialog.open(ProyectoDialogComponent, {
      width: '500px',
      data: proyecto || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProyectos();
      }
    });
  }

  editProyecto(proyecto: Proyecto) {
    this.openDialog(proyecto);
  }

  deleteProyecto(proyecto: Proyecto) {
    if (confirm(`¿Está seguro de eliminar el proyecto ${proyecto.nombre}?`)) {
      this.proyectosService.delete(proyecto.id).subscribe({
        next: () => {
          this.snackBar.open('Proyecto eliminado exitosamente', 'Cerrar', { duration: 3000 });
        },
        error: (error) => {
          this.snackBar.open('Error al eliminar proyecto', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }

  viewMateriales(proyecto: Proyecto) {
    this.router.navigate(['/proyectos', proyecto.id, 'materiales']);
  }

  viewReporte(proyecto: Proyecto) {
    this.router.navigate(['/proyectos', proyecto.id, 'reporte']);
  }

  getCostoTotal(proyecto: Proyecto): number {
    return proyecto.proyectoMateriales.reduce((total, pm) => {
      return total + (pm.material.precio * parseFloat(pm.cantidad.toString()));
    }, 0);
  }
}
