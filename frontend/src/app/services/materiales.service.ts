import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Material, CreateMaterialDto, UpdateMaterialDto } from '../models/material.model';

@Injectable({
  providedIn: 'root'
})
export class MaterialesService {
  private materialesSignal = signal<Material[]>([]);
  public materiales = this.materialesSignal.asReadonly();

  constructor(private apiService: ApiService) {}

  getAll(): Observable<Material[]> {
    return this.apiService.get<Material[]>('materiales').pipe(
      tap(materiales => this.materialesSignal.set(materiales))
    );
  }

  getById(id: number): Observable<Material> {
    return this.apiService.get<Material>(`materiales/${id}`);
  }

  create(material: CreateMaterialDto): Observable<Material> {
    return this.apiService.post<Material>('materiales', material).pipe(
      tap(() => this.getAll().subscribe())
    );
  }

  update(id: number, material: UpdateMaterialDto): Observable<Material> {
    return this.apiService.patch<Material>(`materiales/${id}`, material).pipe(
      tap(() => this.getAll().subscribe())
    );
  }

  delete(id: number): Observable<void> {
    return this.apiService.delete<void>(`materiales/${id}`).pipe(
      tap(() => this.getAll().subscribe())
    );
  }
}