import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MaterialesService } from './materiales.service';
import { Material, CreateMaterialDto } from '../models/material.model';

describe('MaterialesService', () => {
  let service: MaterialesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MaterialesService]
    });
    service = TestBed.inject(MaterialesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all materials', () => {
    const mockMateriales: Material[] = [
      {
        id: 1,
        codigo: 'MAT001',
        descripcion: 'Cemento',
        unidadId: 1,
        precio: 25000,
        createdAt: '2023-01-01',
        updatedAt: '2023-01-01',
        unidad: { id: 1, nombre: 'Kilogramo', simbolo: 'Kg', createdAt: '2023-01-01', updatedAt: '2023-01-01' }
      }
    ];

    service.getAll().subscribe(materiales => {
      expect(materiales).toEqual(mockMateriales);
      expect(service.materiales()).toEqual(mockMateriales);
    });

    const req = httpMock.expectOne('http://localhost:3000/materiales');
    expect(req.request.method).toBe('GET');
    req.flush(mockMateriales);
  });

  it('should create a material', () => {
    const newMaterial: CreateMaterialDto = {
      codigo: 'MAT002',
      descripcion: 'Arena',
      unidadId: 1,
      precio: 15000
    };

    const createdMaterial: Material = {
      id: 2,
      ...newMaterial,
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01',
      unidad: { id: 1, nombre: 'Kilogramo', simbolo: 'Kg', createdAt: '2023-01-01', updatedAt: '2023-01-01' }
    };

    service.create(newMaterial).subscribe(material => {
      expect(material).toEqual(createdMaterial);
    });

    const req = httpMock.expectOne('http://localhost:3000/materiales');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newMaterial);
    req.flush(createdMaterial);
  });
});