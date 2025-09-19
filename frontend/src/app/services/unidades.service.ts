import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Unidad, CreateUnidadDto, UpdateUnidadDto } from '../models/unidad.model';

@Injectable({
  providedIn: 'root'
})
export class UnidadesService {
  private unidadesSignal = signal<Unidad[]>([]);
  public unidades = this.unidadesSignal.asReadonly();

  constructor(private apiService: ApiService) {}

  getAll(): Observable<Unidad[]> {
    return this.apiService.get<Unidad[]>('unidades').pipe(
      tap(unidades => this.unidadesSignal.set(unidades))
    );
  }

  getById(id: number): Observable<Unidad> {
    return this.apiService.get<Unidad>(`unidades/${id}`);
  }

  create(unidad: CreateUnidadDto): Observable<Unidad> {
    return this.apiService.post<Unidad>('unidades', unidad).pipe(
      tap(() => this.getAll().subscribe())
    );
  }

  update(id: number, unidad: UpdateUnidadDto): Observable<Unidad> {
    return this.apiService.patch<Unidad>(`unidades/${id}`, unidad).pipe(
      tap(() => this.getAll().subscribe())
    );
  }

  delete(id: number): Observable<void> {
    return this.apiService.delete<void>(`unidades/${id}`).pipe(
      tap(() => this.getAll().subscribe())
    );
  }
}