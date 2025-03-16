# Proyecto Laravel con Autenticación JWT

Este proyecto es una API construida con Laravel que utiliza **JSON Web Tokens (JWT)** para gestionar la autenticación de usuarios. 

## Requisitos previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- PHP (7.3 o superior)
- Composer
- MySQL o cualquier otra base de datos compatible con Laravel


## Instalación

Sigue estos pasos para configurar el proyecto en tu máquina local.

### 1. Clonar el repositorio

Clona este repositorio a tu máquina local:

```bash
git clone https://github.com/Davidmonozp/JkTic.git

 2.  Instalar las dependencias de Composer

cd tu-repositorio
composer install

3. Configurar el archivo .env
    mv .env.example .env

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=jktic
DB_USERNAME=root
DB_PASSWORD=

JWT_SECRET=tu_clave_secreta

4. Generar la clave JWT
    php artisan jwt:secret

5. Migrar la base de datos
    php artisan migrate

6. Levantar el servidor de desarrollo
    php artisan serve
