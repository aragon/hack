---
id: layout
title: Layout
sidebar_label: Layout
hide_title: true
---

![](/docs/assets/designSystem/covers/layout.png)


### Base grid

La base grid sirve como referencia para la construcción y la posición de todos los componentes.
También ayuda a definir el padding y el margin entre los elementos.
El grid esta construido sobre una base de 8px, con lo cual, todos los elementos y las distancias deberán utilizar una numeración múltiple de 8 (8,16, 24, 32, 40...)

![](/docs/assets/designSystem/guidelines/base-grid.svg)

Esto ayudará a crear un patrón consistente entre todos los elementos y también una previsibilidad a la hora de construir o colocar nuevos componentes. 
Los grids ayudan a crear un trabajo más eficiente, reduciendo el número decisiones y ayudan a que todo el sistema comparta un mismo lenguaje visual entre los diseñadores y los desarrolladores.

![](/docs/assets/designSystem/guidelines/token-manager.svg)

### Sistema de columnas

Un sistema de columnas sirve para distribuir los elementos de forma horizontal, sobre este sistema se consturirán horizontalmente todos los layouts.

![](/docs/assets/designSystem/guidelines/column-system1.svg)

![](/docs/assets/designSystem/guidelines/column-system2.svg)

![](/docs/assets/designSystem/guidelines/column-system3.svg)

Aragon Design system se basa en una estructura para el contenido dividida en 16 columnas separadas entre márgenes horizontales de 16px. Sobre esta estructura construiremos nuestros layouts principales.

### Gutters

El padding en el interior de los módulos coincide con el margin exterior, con un total de 16px. For closely related content, consider a gutterless grid. Apply gutters when content warrants more separation.

![](/docs/assets/designSystem/guidelines/gutters.svg)

### Breakpoint Table

En esta tabla definimos los valores para los diferentes breakpoints

<div class="layouts-table">

| Breakpoint  | Type   | Columns |  Padding | Margin |
| ------------|--------| --------|----------| -------|
| >= 360px    | small  | 4       | 16px     | 16px   |
| >= 768px    | medium | 8       | 16px     | 16px   |
| >= 1152px   | large  | 16      | 16px     | 16px   |

</div>

### Responsive layout

En esta tabla definimos los valores para los diferentes breakpoints

![](/docs/assets/designSystem/guidelines/responsive1.svg)

<br/>

![](/docs/assets/designSystem/guidelines/responsive2.svg)

<br/>

![](/docs/assets/designSystem/guidelines/responsive.svg)
