import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { UnidadesService } from './unidades.service';
import { PrismaService } from '../prisma/prisma.service';

describe('UnidadesService', () => {
  let service: UnidadesService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    unidad: {
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
        UnidadesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<UnidadesService>(UnidadesService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new unidad', async () => {
      const createUnidadDto = { nombre: 'Metro', simbolo: 'M' };
      const expectedResult = { id: 1, ...createUnidadDto, createdAt: new Date(), updatedAt: new Date() };

      mockPrismaService.unidad.create.mockResolvedValue(expectedResult);

      const result = await service.create(createUnidadDto);

      expect(result).toEqual(expectedResult);
      expect(mockPrismaService.unidad.create).toHaveBeenCalledWith({
        data: createUnidadDto,
      });
    });

    it('should throw ConflictException when unidad name already exists', async () => {
      const createUnidadDto = { nombre: 'Metro', simbolo: 'M' };
      const error = { code: 'P2002' };

      mockPrismaService.unidad.create.mockRejectedValue(error);

      await expect(service.create(createUnidadDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findOne', () => {
    it('should return a unidad when found', async () => {
      const unidadId = 1;
      const expectedResult = { id: unidadId, nombre: 'Metro', simbolo: 'M', createdAt: new Date(), updatedAt: new Date() };

      mockPrismaService.unidad.findUnique.mockResolvedValue(expectedResult);

      const result = await service.findOne(unidadId);

      expect(result).toEqual(expectedResult);
      expect(mockPrismaService.unidad.findUnique).toHaveBeenCalledWith({
        where: { id: unidadId },
      });
    });

    it('should throw NotFoundException when unidad not found', async () => {
      const unidadId = 999;

      mockPrismaService.unidad.findUnique.mockResolvedValue(null);

      await expect(service.findOne(unidadId)).rejects.toThrow(NotFoundException);
    });
  });
});