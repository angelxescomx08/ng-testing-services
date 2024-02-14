# ng-testing-services

Este proyecto es una guía para realizar pruebas unitarias y de integración en Angular. Se utilizan servicios y esta basado en el curso de platzi.

## instalación

Para instalar las dependencias del proyecto, ejecutar el comando:

```bash
npm install
```

## Ejecución

Para ejecutar el proyecto, ejecutar el comando:

```bash
ng serve
```

## Pruebas

Para ejecutar las pruebas unitarias, ejecutar el comando:

```bash
ng test
```

## Coverage

Para ejecutar las pruebas unitarias y obtener el coverage, ejecutar el comando:

```bash
ng test --no-watch --code-coverage
```

## Matchers

Los matchers son funciones que se utilizan para evaluar el resultado de una prueba. Algunos de los matchers más comunes son:

//Comunes
.toBe();
.not.toBe();
.toEqual();

//Veracidad
.toBeNull()
.toBeUndefined()
.toBeDefined()
.toBeUndefined()
.toBeTruthy()
.toBeFalsy()

//Numeros
.toBeGreaterThan(3);
.toBeGreaterThanOrEqual(3.5);
.toBeLessThan(5);
.toBeLessThanOrEqual(4.5);

//Numeros decimales
expect(0.3).toBeCloseTo(0.3)

//Strings
.not.toMatch(/I/);
.toMatch(/stop/);

//Arrays
.toContain('milk');

//Ecepciones
myfunction.toThrow(Error);
