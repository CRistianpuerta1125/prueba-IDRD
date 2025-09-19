import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ProyectosService } from '../../../services/proyectos.service';
import { UbicacionesService } from '../../../services/ubicaciones.service';
import { Proyecto } from '../../../models/proyecto.model';
import { Ciudad } from '../../../models/ubicacion.model';

@Component({
  selector: 'app-proyecto-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './proyecto-dialog.component.html',
  styleUrl: './proyecto-dialog.component.scss'
})
export class ProyectoDialogComponent implements OnInit {
  proyectoForm: FormGroup;
  isEdit: boolean;
  loading = false;
  selectedDepartamentoId: number | null = null;
  ciudadesFiltradas: Ciudad[] = [];

  constructor(
    private fb: FormBuilder,
    private proyectosService: ProyectosService,
    private ubicacionesService: UbicacionesService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ProyectoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Proyecto | null
  ) {
    this.isEdit = !!data;
    this.proyectoForm = this.createForm();
  }

  get departamentos() {
    return this.ubicacionesService.departamentos;
  }

  ngOnInit() {
    this.ubicacionesService.getDepartamentos().subscribe();
    this.ubicacionesService.getAllCiudades().subscribe();
    
    if (this.data) {
      this.selectedDepartamentoId = this.data.departamentoId;
      this.loadCiudadesByDepartamento(this.data.departamentoId);
      
      this.proyectoForm.patchValue({
        nombre: this.data.nombre,
        departamentoId: this.data.departamentoId,
        ciudadId: this.data.ciudadId
      });
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      nombre: ['', [Validators.required]],
      departamentoId: ['', [Validators.required]],
      ciudadId: ['', [Validators.required]]
    });
  }

  onDepartamentoChange(departamentoId: number) {
    this.selectedDepartamentoId = departamentoId;
    this.proyectoForm.get('ciudadId')?.setValue('');
    this.loadCiudadesByDepartamento(departamentoId);
  }

  private loadCiudadesByDepartamento(departamentoId: number) {
    this.ubicacionesService.getCiudadesByDepartamento(departamentoId).subscribe({
      next: (ciudades) => {
        this.ciudadesFiltradas = ciudades;
      },
      error: (error) => {
        this.snackBar.open('Error al cargar ciudades', 'Cerrar', { duration: 3000 });
      }
    });
  }

  onSave() {
    if (this.proyectoForm.valid) {
      this.loading = true;
      const formValue = this.proyectoForm.value;

      const operation = this.isEdit
        ? this.proyectosService.update(this.data!.id, formValue)
        : this.proyectosService.create(formValue);

      operation.subscribe({
        next: () => {
          this.snackBar.open(
            `Proyecto ${this.isEdit ? 'actualizado' : 'creado'} exitosamente`,
            'Cerrar',
            { duration: 3000 }
          );
          this.dialogRef.close(true);
        },
        error: (error) => {
          this.loading = false;
          this.snackBar.open(
            `Error al ${this.isEdit ? 'actualizar' : 'crear'} proyecto`,
            'Cerrar',
            { duration: 3000 }
          );
        }
      });
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
