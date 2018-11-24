![Logo Avispro](https://github.com/GuillermoGarcia/imagenes-para-readmes/blob/master/avispro.png)
# *A*sistente *VIS*ual de *P*ersonajes de *R*ol *O*nline

**AVISPRO** es una aplicación para la gestión de Fichas de Personajes de Rol, ofreciendo a los jugadores y directores de juego, la oportunidad de seguir avanzando en sus partidas incluso cuando no pueden quedar en persona. 


# Usuarios

Tanto el registro como la identificación se realiza a través de Firebase Authentication.

## Registro

Los usuarios deberán proporcionar, correo electronico, contraseña y Alias.
![Registro Avispro](https://github.com/GuillermoGarcia/imagenes-para-readmes/blob/master/registro.jpg)

## Identificación

Los usuarios se deben identificar con el correo y la contraseña proporcionados en el registro
![Login Avispro](https://github.com/GuillermoGarcia/imagenes-para-readmes/blob/master/login.jpg)

## Edición Usuario

En la parte superior está el botón de Ajustes donde el usuario podrá editar su *Contraseña* y su *Alias*
![Edición Usuario Avispro](https://github.com/GuillermoGarcia/imagenes-para-readmes/blob/master/usuario.jpg)


# Personajes

Una vez los usuarios se identifican, acceden a sus lista de personajes, desde aquí pueden entrar en cada uno de los personajes o bien crear una nuevo, desde el botón inferior *Nuevo Personaje*.

## Creación y Edición de Personaje

 - **Nivel**:  Nivel inicial con el que se crea el personaje.
 - **Nombre**: Nombre del Personaje.
 - **Raza**: Raza del Personaje.
 - **Cultura**: Cultura donde el Personaje se ha criado.
 - **Procedencia**: Lugar de origen del Personaje se ha criado.
 - **Edad**: Edad Actual del Personaje.

### Características
Hay 12 características:
|||||
|--|--|--|--|
| Fortaleza (For) | Constitución (Con)  | Agilidad (Agi) | Destreza (Des)   |
| Reflejos (Des)  | Inteligencia (Inte) | Memoria (Mem)  | Percepción (Per) |
| Poder (Pod)     | Voluntad (Vol)  | Empatía (Emp)  | Apariencia (Apa) |
|||||

Haciendo clic sobre cada característica, se abre un modal donde cambiar los valores Inicial y Modificado.
 - **Valor Inicial**: En la creación del personaje es el único momento donde es posible modificar el valor inicial de las características, siendo el mínimo de este valor inicial el doble del nivel mas uno del personaje, este valor sera el obtenido por el jugador al tirar los dados.
 - **Valor Modificado**: El valor modificado por raza, taras y ventajas tras la creación del personaje.

![Edición Personaje Avispro](https://github.com/GuillermoGarcia/imagenes-para-readmes/blob/master/edicion.jpg)