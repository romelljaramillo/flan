# Requerimientos realizados:

## FrontEnd

**Ejecución de la aplicación**

inicio de la aplicación angular en modo desarrollo.

``
ng serve --watch
``



## Admin:

**Contiene los módulos**

### Layout:

Que contiene la plantilla y todos sus elementos base entre los que están:

- **Breadcrumb:** Migas de pan para navegación de contenidos.
- **Content:** Este componente renderiza los contenidos.
- **Footer:** Renderiza todo los contenidos del footer.
- **Nav:** Muestra el menu horizontal de la parte superior del panel de administración.
- **Sidebar:** Muestra el menu lateral del panel de administración.

### Pages:

Se encarga de renderizar la pagina admin “el Dashboard”

## Components:
	
**Contiene los módulos:**

- **Auth:** Se encarga de mostrar el login de usuarios y de la lógica de seguridad del frontend.
- **Base:** Es el modulo base del frontend de cual extienden la mayoría de módulos para implementar el crud.
- **Dashboard:** Este modulo muestra los componentes de la pagina principal del panel de administración.
- **User:** Muestra la vista CRUD de el modelo User.
- **Helper:** Este modulo contiene tres componentes que son la base para implementar el CRUD   		
  + **List:** Muestra un listado con las opciones según el tipo de dato y ofrece las opciones de: Ordenamiento, búsqueda y paginación de los elementos.
  + **Form:** Muestra un formulario con los inputs según sea su type.
  + **Advancesearch:** Este muestra un gestor de búsquedas avanzada según los criterios pre-configurados desde el backend.


## Share:

Contiene todos aquellos componentes que no están categorizados pero que pueden ser usados por otros componentes, ademas de Servicios, Pipes, Guards entre otros elementos comunes.

## Error-pages: 

Muestra las paginas de error estandarizadas como por ejemplo PageNoFound 404.