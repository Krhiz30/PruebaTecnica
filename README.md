# 🚀 Pokédex

## Descripción

¡Bienvenido a la Pokédex! Una aplicación web interactiva construida con Vue.js que te permite explorar el fascinante mundo de los Pokémon, buscar tus criaturas favoritas por nombre, marcarlas como favoritas y descubrir sus detalles en un modal informativo.

Este proyecto se construyó utilizando las siguientes tecnologías principales:

- Vue.js: Framework de JavaScript progresivo para construir interfaces de usuario interactivas.
- TypeScript: Superset de JavaScript que añade tipado estático opcional, mejorando la mantenibilidad y detección de errores.
- Vite: Herramienta de construcción extremadamente rápida para la generación de aplicaciones web modernas.
- Pinia: Librería de gestión de estado para Vue.js, utilizada para manejar el estado global de la aplicación de manera intuitiva y escalable.
- Vue Router: Librería oficial de enrutamiento para Vue.js, empleada para la navegación dentro de la aplicación (aunque en esta versión sencilla pueda no ser extensamente utilizada, se incluyó pensando en futuras expansiones).
- Bootstrap: Framework de CSS popular para un diseño responsivo y componentes de interfaz de usuario pre-estilizados.
- Vitest: Framework de pruebas unitarias diseñado para Vite, utilizado para asegurar la correcta funcionalidad de los componentes y la lógica de la aplicación.
- Axios: Cliente HTTP basado en promesas para realizar peticiones al backend (en este caso, para obtener la información de los Pokémon).

## Arquitectura y Diseño de Código

Para la construcción de este proyecto, se seleccionó Vue.js junto con Vite, una herramienta que proporciona un entorno de desarrollo ágil y eficiente, además de generar un proyecto final más ligero. En línea con las buenas prácticas de codificación, se optó por una arquitectura modular de componentes para asegurar un código más organizado, reutilizable y fácil de mantener. La gestión del estado global de la aplicación, específicamente para la funcionalidad de los Pokémon favoritos (permitiendo una manipulación sencilla para agregar, remover y visualizar la lista), se realizó mediante Pinia, lo que simplifica la lógica y mejora la mantenibilidad de esta característica.

## Pruebas Unitarias

Se implementaron pruebas unitarias utilizando **Vitest** para verificar la correcta funcionalidad de componentes clave y la lógica de la aplicación. Para ejecutar las pruebas, utiliza el siguiente comando:

```bash
npm run test:unit
```
## Ejecución Local

Para ejecutar el proyecto localmente, sigue estos pasos:

1.  **Clonar el repositorio:**
    Utiliza el siguiente comando en tu terminal para copiar el proyecto a tu máquina local:
    ```bash
    git clone [https://github.com/Krhiz30/PruebaTecnica](https://github.com/Krhiz30/PruebaTecnica)
    ```
    (Asegúrate de tener Git instalado en tu sistema)

2.  **Navegar al directorio del proyecto:**
    Una vez que el repositorio se haya clonado, ingresa a la carpeta del proyecto con el siguiente comando:
    ```bash
    cd PruebaTecnica
    ```

3.  **Instalar las dependencias:**
    El proyecto utiliza dependencias de Node.js. Para instalarlas, ejecuta el siguiente comando:
    ```bash
    npm install
    ```
    (Asegúrate de tener Node.js y npm instalados en tu sistema)

4.  **Ejecutar el servidor de desarrollo:**
    Una vez que las dependencias se hayan instalado correctamente, puedes iniciar el servidor de desarrollo con el siguiente comando:
    ```bash
    npm run dev
    ```
    Este comando iniciará la aplicación en modo de desarrollo y te proporcionará una URL (normalmente `http://localhost:5173/`) para acceder a ella en tu navegador.

