![Logo Avispro](https://github.com/GuillermoGarcia/imagenes-para-readmes/blob/master/avispro.png)
# *A*sistente *VIS*ual de *P*ersonajes de *R*ol *O*nline

**AVISPRO** es una aplicacion para la gestion de Fichas de Personajes de Rol, ofreciendo a los jugadores y directores de juego, la oportunidad de seguir avanzando en sus partidas incluso cuando no pueden quedar en persona. 


# Usuarios

Tanto el registro como la identificacion se realiza a traves de Firebase Authentication.

## Registro

Los usuarios deberan proporcionar, correo electronico, contraseña y Alias.

## Identificacion

Los usuarios se deben identificar con el correo y la contraseña proporcionados en el registro

# Personajes

Una vez los usuarios se identifican, acceden a sus lista de personajes, desde aqui pueden entrar en cada uno de los personajes o bien crear una nuevo, desde el boton inferior *Nuevo Personaje,* ademas en la parte superior estan el boton de Ajustes donde el usuario podra cambiar su *Contraseña* y su *Alias*. Junto al boton de Ajustes esta el boton de Desidentificarse.

## Creacion y Edicion de Personaje

 - **Nivel**:  Nivel inicial con el que se crea el personaje.
 - **Nombre**: Nombre del Personaje.
 - **Raza**: Raza del Personaje.
 - **Cultura**: Cultura donde el Personaje se ha criado.
 - **Procedencia**: Lugar de origen del Personaje se ha criado.
 - **Edad**: Edad Actual del Personaje.

### Caracteristicas
Hay 12 caracteristicas:
|||||
|--|--|--|--|
| Fortaleza (For) | Constitución (Con)  | Agilidad (Agi) | Destreza (Des)   |
| Reflejos (Des)  | Inteligencia (Inte) | Memoria (Mem)  | Percepción (Per) |
| Poder (Pod)     | Voluntad (Vol)  | Empatía (Emp)  | Apariencia (Apa) |
|||||

Haciendo click sobre cada caracteristica, se abre un modal donde cambiar los valores Inicial y Modificado.
 - **Valor Inicial**: En la creacion del personaje es el unico momento donde es posible modificar el valor inicial de las caracteristicas, siendo el minimo de este valor inicial el doble del nivel mas uno del personaje, este valor sera el obtenido por el jugador al tirar los dados.
 - **Valor Modificado**: El valor modificado por raza, taras y ventajas tras la creacion del personaje.
