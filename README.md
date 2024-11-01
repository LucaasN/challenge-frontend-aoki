# Challenge Frontend Aoki

## Tecnologias usadas:

- **React**
- **TypeScript**
- **TailwindCSS**
- **Context API en conjunto con LocalStorage**
- **React Router DOM**


## Clonar y ejecutar el proyecto

Para clonar y ejecutar el proyecto sigue estos pasos:

1. Clona el repositorio:
   `git clone https://github.com/LucaasN/challenge-frontend-aoki.git`
2. Navega a la carpeta del proyecto:
   `cd challenge-frontend-aoki`
3. Instala las dependencias:
   `npm install` o `npm i`
6. Ejecuta el proyecto:
   `npm run dev`
8. Abrir el proyecto en el puerto indicado. Por ejemplo [http://localhost:3000](http://localhost:5173/).


## Despliegue
Puedes ver el proyecto en funcionamiento en GitHub Pages y Netlify:

[GitHub Pages](https://lucaasn.github.io/challenge-frontend-aoki/)

[Netlify](https://challenge-frontend-aoki.netlify.app/)

## A tener en cuenta:
El login simula una autenticacion para las acciones de alta, baja y modificacion de equipos y jugadores. Para poder acceder a esas acciones se debe estar logueado con user: admin y password: test1234 de lo contrario las acciones no estaran disponibles. El button de "Login" redirecciona al logueo con los inputs de user y password ya completados, solo clickear en "Iniciar Sesion". Para ver la lista completa de equipos y usar los filtros no es necesario estar logueado. El proyecto se ejecuta con 3 equipos cargados por defecto desde el mock JSON, una vez logueado pueden modificarse equipos y jugadores y tendra persistencia gracias al LocalStorage.

