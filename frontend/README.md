# Frontend - Sistema de Gestión de Materiales

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) versión 19.

## Tecnologías utilizadas

- **Angular 19**: Framework principal
- **Angular Material**: Componentes de UI
- **TailwindCSS**: Utilidades de CSS
- **TypeScript**: Lenguaje de programación
- **RxJS**: Programación reactiva
- **Angular Signals**: Gestión de estado reactiva

## Funcionalidades

- ✅ CRUD de Materiales
- ✅ CRUD de Proyectos  
- ✅ CRUD de Unidades
- ✅ Asignación de materiales a proyectos
- ✅ Reportes de costos por proyecto
- ✅ Interfaz responsive con Angular Material
- ✅ Validaciones de formularios
- ✅ Manejo de errores
- ✅ Pruebas unitarias

## Comandos disponibles

### Servidor de desarrollo
```bash
ng serve
```
Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente si cambias algún archivo fuente.

### Generar componentes
```bash
ng generate component component-name
```

### Ejecutar pruebas
```bash
ng test
```

### Ejecutar pruebas end-to-end
```bash
ng e2e
```

### Build para producción
```bash
ng build
```

Los artefactos del build se almacenarán en el directorio `dist/`.

## Estructura del proyecto

```
src/
├── app/
│   ├── layout/           # Componentes de layout (navbar)
│   ├── models/           # Interfaces y tipos TypeScript
│   ├── pages/            # Páginas principales de la aplicación
│   │   ├── materiales/   # Gestión de materiales
│   │   ├── proyectos/    # Gestión de proyectos
│   │   └── unidades/     # Gestión de unidades
│   ├── services/         # Servicios para comunicación con API
│   └── environments/     # Configuración de entornos
├── styles.scss          # Estilos globales
└── index.html           # Página principal
```

## Configuración de la API

La URL de la API se configura en `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'
};
```

## Características técnicas

- **Signals**: Utiliza Angular Signals para gestión de estado reactiva
- **Standalone Components**: Todos los componentes son standalone
- **Lazy Loading**: Carga perezosa de módulos para mejor rendimiento
- **Responsive Design**: Diseño adaptable usando TailwindCSS y Angular Material
- **Form Validation**: Validaciones reactivas con Angular Forms
- **Error Handling**: Manejo centralizado de errores con snackbars
- **TypeScript Strict**: Configuración estricta de TypeScript

## Ayuda adicional

Para obtener más ayuda sobre Angular CLI, usa `ng help` o consulta la [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).