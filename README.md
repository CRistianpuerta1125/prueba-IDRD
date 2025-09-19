# Sistema de Gestión de Materiales y Proyectos

## Descripción
Sistema completo para gestionar materiales de construcción y proyectos, con funcionalidades CRUD y reportes.

## Tecnologías
- **Backend**: NestJS v10, PostgreSQL, Prisma ORM
- **Frontend**: Angular v19, Angular Material, TailwindCSS
- **Base de datos**: PostgreSQL

## Estructura del proyecto
```
/
├── backend/          # API NestJS
├── frontend/         # Aplicación Angular
└── README.md
```

## Funcionalidades
- CRUD de materiales (código, descripción, unidad, precio)
- CRUD de proyectos (nombre, departamento, ciudad)
- Asignación de materiales a proyectos
- Reportes de materiales por proyecto
- Cálculo de costos totales

## Instalación y ejecución

### Backend (NestJS)
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
npm run start:dev
```
El backend estará disponible en: http://localhost:3000
Documentación Swagger: http://localhost:3000/api

### Frontend (Angular)
```bash
cd frontend
npm install
ng serve
```
El frontend estará disponible en: http://localhost:4200

### Base de datos
El proyecto usa Prisma Postgres para desarrollo. Para iniciar la base de datos:
```bash
cd backend
npx prisma dev
```

## Comandos útiles

### Backend
- `npm run start:dev` - Servidor en modo desarrollo
- `npm run test` - Ejecutar pruebas unitarias
- `npx prisma studio` - Interfaz visual de la base de datos
- `npx prisma migrate dev` - Crear nueva migración

### Frontend  
- `ng serve` - Servidor en modo desarrollo
- `ng test` - Ejecutar pruebas unitarias
- `ng build` - Build para producción
- `ng generate component nombre` - Generar nuevo componente