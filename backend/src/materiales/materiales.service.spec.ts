import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { MaterialesService } from './materiales.service';
import { PrismaService } from '../prisma/prisma.service';

describe('MaterialesService', () => {
  let service: MaterialesService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    material: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MaterialesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<MaterialesService>(MaterialesService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new material', async () => {
      const createMaterialDto = {
        codigo: 'MAT001',
        descripcion: 'Cemento',
        unidadId: 1,
        precio: 25000,
      };
      const expectedResult = {
        id: 1,
        ...createMaterialDto,
        precio: 25000,
        createdAt: new Date(),
        updatedAt: new Date(),
        unidad: { id: 1, nombre: 'Kilogramo', simbolo: 'Kg' },
      };

      mockPrismaService.material.create.mockResolvedValue(expectedResult);

      const result = await service.create(createMaterialDto);

      expect(result).toEqual(expectedResult);
      expect(mockPrismaService.material.create).toHaveBeenCalledWith({
        data: createMaterialDto,
        include: { unidad: true },
      });
    });

    it('should throw ConflictException when material code already exists', async () => {
      const createMaterialDto = {
        codigo: 'MAT001',
        descripcion: 'Cemento',
        unidadId: 1,
        precio: 25000,
      };
      const error = { code: 'P2002' };

      mockPrismaService.material.create.mockRejectedValue(error);

      await expect(service.create(createMaterialDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findOne', () => {
    it('should return a material when found', async () => {
      const materialId = 1;
      const expectedResult = {
        id: materialId,
        codigo: 'MAT001',
        descripcion: 'Cemento',
        unidadId: 1,
        precio: 25000,
        createdAt: new Date(),
        updatedAt: new Date(),
        unidad: { id: 1, nombre: 'Kilogramo', simbolo: 'Kg' },
      };

      mockPrismaService.material.findUnique.mockResolvedValue(expectedResult);

      const result = await service.findOne(materialId);

      expect(result).toEqual(expectedResult);
      expect(mockPrismaService.material.findUnique).toHaveBeenCalledWith({
        where: { id: materialId },
        include: { unidad: true },
      });
    });

    it('should throw NotFoundException when material not found', async () => {
      const materialId = 999;

      mockPrismaService.material.findUnique.mockResolvedValue(null);

      await expect(service.findOne(materialId)).rejects.toThrow(NotFoundException);
    });
  });
});