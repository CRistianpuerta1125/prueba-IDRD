import { Component, OnInit, ViewChild, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

import { MaterialesService } from '../../services/materiales.service';
import { Material } from '../../models/material.model';
import { MaterialDialogComponent } from './material-dialog/material-dialog.component';

@Component({
  selector: 'app-materiales',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatTooltipModule
  ],
  templateUrl: './materiales.component.html',
  styleUrl: './materiales.component.scss'
})
export class MaterialesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['codigo', 'descripcion', 'unidad', 'precio', 'actions'];
  dataSource = new MatTableDataSource<Material>([]);

  constructor(
    private materialesService: MaterialesService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    effect(() => {
      this.dataSource.data = this.materialesService.materiales();
    });
  }

  get materiales() {
    return this.materialesService.materiales;
  }

  ngOnInit() {
    this.loadMateriales();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadMateriales() {
    this.materialesService.getAll().subscribe({
      error: (error) => {
        this.snackBar.open('Error al cargar materiales', 'Cerrar', { duration: 3000 });
      }
    });
  }

  openDialog(material?: Material) {
    const dialogRef = this.dialog.open(MaterialDialogComponent, {
      width: '500px',
      data: material || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadMateriales();
      }
    });
  }

  editMaterial(material: Material) {
    this.openDialog(material);
  }

  deleteMaterial(material: Material) {
    if (confirm(`¿Está seguro de eliminar el material ${material.codigo}?`)) {
      this.materialesService.delete(material.id).subscribe({
        next: () => {
          this.snackBar.open('Material eliminado exitosamente', 'Cerrar', { duration: 3000 });
        },
        error: (error) => {
          this.snackBar.open('Error al eliminar material', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }
}
