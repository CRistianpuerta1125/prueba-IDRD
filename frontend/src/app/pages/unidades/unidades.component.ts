import { Component, OnInit, ViewChild, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UnidadesService } from '../../services/unidades.service';
import { Unidad } from '../../models/unidad.model';
import { UnidadDialogComponent } from './unidad-dialog/unidad-dialog.component';

@Component({
  selector: 'app-unidades',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatTooltipModule
  ],
  templateUrl: './unidades.component.html',
  styleUrl: './unidades.component.scss'
})
export class UnidadesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['nombre', 'simbolo', 'actions'];
  dataSource = new MatTableDataSource<Unidad>([]);

  constructor(
    private unidadesService: UnidadesService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    effect(() => {
      this.dataSource.data = this.unidadesService.unidades();
    });
  }

  ngOnInit() {
    this.loadUnidades();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadUnidades() {
    this.unidadesService.getAll().subscribe({
      error: (error) => {
        this.snackBar.open('Error al cargar unidades', 'Cerrar', { duration: 3000 });
      }
    });
  }

  openDialog(unidad?: Unidad) {
    const dialogRef = this.dialog.open(UnidadDialogComponent, {
      width: '400px',
      data: unidad || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUnidades();
      }
    });
  }

  editUnidad(unidad: Unidad) {
    this.openDialog(unidad);
  }

  deleteUnidad(unidad: Unidad) {
    if (confirm(`¿Está seguro de eliminar la unidad ${unidad.nombre}?`)) {
      this.unidadesService.delete(unidad.id).subscribe({
        next: () => {
          this.snackBar.open('Unidad eliminada exitosamente', 'Cerrar', { duration: 3000 });
        },
        error: (error) => {
          this.snackBar.open('Error al eliminar unidad', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }
}
