import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Crear unidades
  const unidades = await Promise.all([
    prisma.unidad.upsert({
      where: { nombre: 'Metro cuadrado' },
      update: {},
      create: { nombre: 'Metro cuadrado', simbolo: 'M²' },
    }),
    prisma.unidad.upsert({
      where: { nombre: 'Unidad' },
      update: {},
      create: { nombre: 'Unidad', simbolo: 'Und' },
    }),
    prisma.unidad.upsert({
      where: { nombre: 'Kilogramo' },
      update: {},
      create: { nombre: 'Kilogramo', simbolo: 'Kg' },
    }),
  ]);

  // Crear departamentos y ciudades de Colombia
  const antioquia = await prisma.departamento.upsert({
    where: { nombre: 'Antioquia' },
    update: {},
    create: { nombre: 'Antioquia' },
  });

  const cundinamarca = await prisma.departamento.upsert({
    where: { nombre: 'Cundinamarca' },
    update: {},
    create: { nombre: 'Cundinamarca' },
  });

  const valle = await prisma.departamento.upsert({
    where: { nombre: 'Valle del Cauca' },
    update: {},
    create: { nombre: 'Valle del Cauca' },
  });

  // Ciudades de Antioquia
  await Promise.all([
    prisma.ciudad.upsert({
      where: { nombre_departamentoId: { nombre: 'Medellín', departamentoId: antioquia.id } },
      update: {},
      create: { nombre: 'Medellín', departamentoId: antioquia.id },
    }),
    prisma.ciudad.upsert({
      where: { nombre_departamentoId: { nombre: 'Bello', departamentoId: antioquia.id } },
      update: {},
      create: { nombre: 'Bello', departamentoId: antioquia.id },
    }),
    prisma.ciudad.upsert({
      where: { nombre_departamentoId: { nombre: 'Itagüí', departamentoId: antioquia.id } },
      update: {},
      create: { nombre: 'Itagüí', departamentoId: antioquia.id },
    }),
  ]);

  // Ciudades de Cundinamarca
  await Promise.all([
    prisma.ciudad.upsert({
      where: { nombre_departamentoId: { nombre: 'Bogotá', departamentoId: cundinamarca.id } },
      update: {},
      create: { nombre: 'Bogotá', departamentoId: cundinamarca.id },
    }),
    prisma.ciudad.upsert({
      where: { nombre_departamentoId: { nombre: 'Soacha', departamentoId: cundinamarca.id } },
      update: {},
      create: { nombre: 'Soacha', departamentoId: cundinamarca.id },
    }),
    prisma.ciudad.upsert({
      where: { nombre_departamentoId: { nombre: 'Chía', departamentoId: cundinamarca.id } },
      update: {},
      create: { nombre: 'Chía', departamentoId: cundinamarca.id },
    }),
  ]);

  // Ciudades del Valle del Cauca
  await Promise.all([
    prisma.ciudad.upsert({
      where: { nombre_departamentoId: { nombre: 'Cali', departamentoId: valle.id } },
      update: {},
      create: { nombre: 'Cali', departamentoId: valle.id },
    }),
    prisma.ciudad.upsert({
      where: { nombre_departamentoId: { nombre: 'Palmira', departamentoId: valle.id } },
      update: {},
      create: { nombre: 'Palmira', departamentoId: valle.id },
    }),
    prisma.ciudad.upsert({
      where: { nombre_departamentoId: { nombre: 'Buenaventura', departamentoId: valle.id } },
      update: {},
      create: { nombre: 'Buenaventura', departamentoId: valle.id },
    }),
  ]);

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });