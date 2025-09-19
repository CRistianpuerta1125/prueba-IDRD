import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Departamento, Ciudad } from '../models/ubicacion.model';

@Injectable({
  providedIn: 'root'
})
export class UbicacionesService {
  private departamentosSignal = signal<Departamento[]>([]);
  private ciudadesSignal = signal<Ciudad[]>([]);
  
  public departamentos = this.departamentosSignal.asReadonly();
  public ciudades = this.ciudadesSignal.asReadonly();

  constructor(private apiService: ApiService) {}

  getDepartamentos(): Observable<Departamento[]> {
    return this.apiService.get<Departamento[]>('ubicaciones/departamentos').pipe(
      tap(departamentos => this.departamentosSignal.set(departamentos))
    );
  }

  getCiudadesByDepartamento(departamentoId: number): Observable<Ciudad[]> {
    return this.apiService.get<Ciudad[]>(`ubicaciones/departamentos/${departamentoId}/ciudades`);
  }

  getAllCiudades(): Observable<Ciudad[]> {
    return this.apiService.get<Ciudad[]>('ubicaciones/ciudades').pipe(
      tap(ciudades => this.ciudadesSignal.set(ciudades))
    );
  }
}