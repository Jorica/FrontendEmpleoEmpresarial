# Frontend Empleo Empresarial

## Descripción
Este repositorio contiene el frontend para la plataforma de Empleo Empresarial. Es una aplicación web desarrollada con Angular que proporciona una interfaz intuitiva para interactuar con el sistema de gestión de empleo.

## Instrucciones de Instalación
Para comenzar a trabajar con este proyecto, sigue estos pasos:

1. Clona el repositorio en tu máquina local.
2. Ejecuta el comando `npm install` en la raíz del proyecto para instalar todas las dependencias.

## Configuración del Entorno
Actualmente, la constante del entorno apunta al backend en la ruta `https://localhost:44361/api/`. Si es necesario cambiar esta configuración, modifica el archivo `environments.dev.ts`.

Ruta: `src\environments\environments.dev.ts`

## Características Funcionales
1. **Uso de Librería PrimeNG:** biblioteca de componentes UI para Angular,
2. **Uso de Librería PrimeFlex:** 
3. **Encriptación de Contraseñas:** Implementa una pequeña encriptación para almacenar las contraseñas y comparar las credenciales de usuario
4. **Almacenamiento de Sesión con sessionStorage:** Utiliza el sessionStorage para almacenar la sesión del usuario
5. **Interceptors para Pantalla de Carga:** Emplea interceptores para mostrar una pantalla de carga durante cada solicitud HTTP
6. **Manejo de Mensajes:** Implementa un sistema completo de manejo de mensajes para comunicar errores, advertencias y otra información relevante al usuario de manera clara y concisa.
7. **Guardianes de Rutas:** Utiliza guardianes de rutas para restringir el acceso a ciertas partes de la aplicación
