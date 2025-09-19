import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { 
  Proyecto, 
  CreateProyectoDto, 
  UpdateProyectoDto, 
  AsignarMaterialDto,
  ReporteProyecto,
  ProyectoMaterial
} from '../models/proyecto.model';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {
  private proyectosSignal = signal<Proyecto[]>([]);
  public proyectos = this.proyectosSignal.asReadonly();

  constructor(private apiService: ApiService) {}

  getAll(): Observable<Proyecto[]> {
    return this.apiService.get<Proyecto[]>('proyectos').pipe(
      tap(proyectos => this.proyectosSignal.set(proyectos))
    );
  }

  getById(id: number): Observable<Proyecto> {
    return this.apiService.get<Proyecto>(`proyectos/${id}`);
  }

  create(proyecto: CreateProyectoDto): Observable<Proyecto> {
    return this.apiService.post<Proyecto>('proyectos', proyecto).pipe(
      tap(() => this.getAll().subscribe())
    );
  }

  update(id: number, proyecto: UpdateProyectoDto): Observable<Proyecto> {
    return this.apiService.patch<Proyecto>(`proyectos/${id}`, proyecto).pipe(
      tap(() => this.getAll().subscribe())
    );
  }

  delete(id: number): Observable<void> {
    return this.apiService.delete<void>(`proyectos/${id}`).pipe(
      tap(() => this.getAll().subscribe())
    );
  }

  asignarMaterial(proyectoId: number, material: AsignarMaterialDto): Observable<ProyectoMaterial> {
    return this.apiService.post<ProyectoMaterial>(`proyectos/${proyectoId}/materiales`, material).pipe(
      tap(() => this.getAll().subscribe())
    );
  }

  actualizarCantidadMaterial(proyectoId: number, materialId: number, cantidad: number): Observable<ProyectoMaterial> {
    return this.apiService.patch<ProyectoMaterial>(`proyectos/${proyectoId}/materiales/${materialId}`, { cantidad }).pipe(
      tap(() => this.getAll().subscribe())
    );
  }

  removerMaterial(proyectoId: number, materialId: number): Observable<void> {
    return this.apiService.delete<void>(`proyectos/${proyectoId}/materiales/${materialId}`).pipe(
      tap(() => this.getAll().subscribe())
    );
  }

  getReporte(proyectoId: number): Observable<ReporteProyecto> {
    return this.apiService.get<ReporteProyecto>(`proyectos/${proyectoId}/reporte`);
  }
}