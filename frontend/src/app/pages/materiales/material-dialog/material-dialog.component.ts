import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MaterialesService } from '../../../services/materiales.service';
import { UnidadesService } from '../../../services/unidades.service';
import { Material } from '../../../models/material.model';

@Component({
  selector: 'app-material-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './material-dialog.component.html',
  styleUrl: './material-dialog.component.scss'
})
export class MaterialDialogComponent implements OnInit {
  materialForm: FormGroup;
  isEdit: boolean;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private materialesService: MaterialesService,
    private unidadesService: UnidadesService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<MaterialDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Material | null
  ) {
    this.isEdit = !!data;
    this.materialForm = this.createForm();
  }

  get unidades() {
    return this.unidadesService.unidades;
  }

  ngOnInit() {
    this.unidadesService.getAll().subscribe();
    
    if (this.data) {
      this.materialForm.patchValue({
        codigo: this.data.codigo,
        descripcion: this.data.descripcion,
        unidadId: this.data.unidadId,
        precio: this.data.precio
      });
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      codigo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      unidadId: ['', [Validators.required]],
      precio: ['', [Validators.required, Validators.min(0.01)]]
    });
  }

  onSave() {
    if (this.materialForm.valid) {
      this.loading = true;
      const formValue = this.materialForm.value;

      const operation = this.isEdit
        ? this.materialesService.update(this.data!.id, formValue)
        : this.materialesService.create(formValue);

      operation.subscribe({
        next: () => {
          this.snackBar.open(
            `Material ${this.isEdit ? 'actualizado' : 'creado'} exitosamente`,
            'Cerrar',
            { duration: 3000 }
          );
          this.dialogRef.close(true);
        },
        error: (error) => {
          this.loading = false;
          this.snackBar.open(
            `Error al ${this.isEdit ? 'actualizar' : 'crear'} material`,
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
