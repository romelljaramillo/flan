# FLAN Software

Descripción corta del proyecto.

## Requisitos Previos

Asegúrate de tener instalado lo siguiente:
- PHP >= 8.1
- Composer
- Node.js
- Angular CLI

## Instalación y Configuración

### Laravel (Backend)

1. Navega al directorio del proyecto Laravel:

```bash 
cd laravel
```

2. Instala las dependencias de Composer:

```bash 
composer install
```

3. Copia el archivo `.env.example` a `.env` y configura tus variables de entorno:

```bash 
cp .env.example .env
```

4. Genera la clave de la aplicación:

```bash 
php artisan key:generate
```

5. Realiza las migraciones y, si es necesario, siembra la base de datos:

```bash 
php artisan migrate --seed
```

6. Inicia el servidor de desarrollo de Laravel:

```bash 
php artisan serve
```

### Angular (Frontend)

1. Navega al directorio del proyecto Angular:

```bash 
cd angular
```

2. Instala las dependencias de Node.js:

```bash 
npm install
```

3. Sustituir el nombre del backend

Editar en:
angular/src/environments/environment.ts

4. Inicia el servidor de desarrollo de Angular:

```bash 
ng serve
```

5. Abre tu navegador y navega a `http://localhost:4200`.

## Historial de Versiones

- **Angular:** Comenzó con la versión 14 y ahora está en la versión 17.
- **Laravel:** Comenzó con la versión 9 y ahora está en la versión 10.

## Contribuir

Instrucciones para contribuir al proyecto.

## Licencia

Texto de la licencia o referencia a un archivo de LICENCIA en el repositorio.

Este README.md proporciona una guía básica para configurar un entorno de desarrollo para un proyecto que utiliza Laravel como backend y Angular como frontend. Puedes personalizarlo según las especificaciones y características adicionales de tu proyecto. Asegúrate de actualizar los requisitos previos, las versiones y cualquier paso específico de configuración para tus proyectos Laravel y Angular.