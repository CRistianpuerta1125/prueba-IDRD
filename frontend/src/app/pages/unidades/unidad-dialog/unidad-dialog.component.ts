import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UnidadesService } from '../../../services/unidades.service';
import { Unidad } from '../../../models/unidad.model';

@Component({
  selector: 'app-unidad-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './unidad-dialog.component.html',
  styleUrl: './unidad-dialog.component.scss'
})
export class UnidadDialogComponent implements OnInit {
  unidadForm: FormGroup;
  isEdit: boolean;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private unidadesService: UnidadesService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UnidadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Unidad | null
  ) {
    this.isEdit = !!data;
    this.unidadForm = this.createForm();
  }

  ngOnInit() {
    if (this.data) {
      this.unidadForm.patchValue({
        nombre: this.data.nombre,
        simbolo: this.data.simbolo
      });
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      nombre: ['', [Validators.required]],
      simbolo: ['', [Validators.required]]
    });
  }

  onSave() {
    if (this.unidadForm.valid) {
      this.loading = true;
      const formValue = this.unidadForm.value;

      const operation = this.isEdit
        ? this.unidadesService.update(this.data!.id, formValue)
        : this.unidadesService.create(formValue);

      operation.subscribe({
        next: () => {
          this.snackBar.open(
            `Unidad ${this.isEdit ? 'actualizada' : 'creada'} exitosamente`,
            'Cerrar',
            { duration: 3000 }
          );
          this.dialogRef.close(true);
        },
        error: (error) => {
          this.loading = false;
          this.snackBar.open(
            `Error al ${this.isEdit ? 'actualizar' : 'crear'} unidad`,
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
