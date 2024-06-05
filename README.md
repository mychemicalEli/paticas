# Paticas API

El FrontEnd de Paticas es una interfaz web diseñada para interactuar con la API de Paticas, un servicio RESTful que facilita la gestión de mascotas y refugios. Ofrece operaciones CRUD para mascotas, refugios y voluntarios, junto con la capacidad de cargar imágenes de mascotas.

## Tabla de contenidos

- [Paticas](#paticas)
  - [Tabla de contenidos](#tabla-de-contenidos)
  - [Tecnologías Usadas](#tecnologías-usadas)
  - [Getting Started](#getting-started)
    - [Prerrequisitos](#prerrequisitos)
    - [Setup](#setup)




## Tecnologías Usadas

- Angular
- Node.js

## Getting Started

### Prerrequisitos

- nvm para gestionar versiones de Node.js
- Angular CLI
- Visual Studio Code (VSC)
- Mockoon para simulación de APIs


### Setup

1. Instalar Node.js:

```bash
nvm install 21.7.0
nvm use 21.7.0
```

2. Instalar Angular CLI:

```bash
npm install -g @angular/cli
```

3. Instalar Visual Studio Code

4. Clonar proyecto:

```bash
git clone https://github.com/mychemicalEli/paticas
```

5. Instalar dependencias:
```bash
npm install
```

5. Configurar Mockoon:
- Descargar e instalar Mockoon.
- Importar el archivo PaticasMockoon.json ubicado en API>paticas-api>external-resources.
- En Mockoon, hacer clic en “Import/export” y seleccionar la opción para importar el archivo. Luego, hacer clic en “play”.

5. Levantar la aplicación:
```bash
ng serve -o
```