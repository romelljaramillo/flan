# Requerimientos realizados:

## BackEnd

### Migraciones 

Las migraciones son la base de la creación del Schema de la base de datos.

**(Laravel)** → Las migraciones son como el control de versiones de su base de datos.

**Doc.** [https://laravel.com/docs/9.x/migrations](https://laravel.com/docs/9.x/migrations)

**Realizadas:**

    • laravel/database/migrations
    • laravel/database/migrations/create_users_table.php
    • laravel/database/migrations/create_password_resets_table.php
    • laravel/database/migrations/add_two_factor_columns_to_users_table.php
    • laravel/database/migrations/create_failed_jobs_table.php
    • laravel/database/migrations/create_personal_access_tokens_table.php
    • laravel/database/migrations/create_teams_table.php
    • laravel/database/migrations/create_team_user_table.php
    • laravel/database/migrations/create_team_invitations_table.php
    • laravel/database/migrations/create_permission_tables.php
    • laravel/database/migrations/create_sessions_table.php

### Factories:

Libreria que se usa junto a Faker para creación de datos de ejemplo.

**(Laravel)** → Al probar su aplicación o inicializar su base de datos, es posible que deba insertar algunos registros en su base de datos. En lugar de especificar manualmente el valor de cada columna, Laravel le permite definir un conjunto de atributos predeterminados para cada uno de sus modelos Eloquent utilizando fábricas de modelos.

**Doc:** [https://laravel.com/docs/9.x/eloquent-factories](https://laravel.com/docs/9.x/eloquent-factories)

**Realizados:**

    • laravel/database/factories/TeamFactory.php
    • laravel/database/factories/UserFactory.php

### Seeders:

Clases de Laravel que sirven para insertar datos en la base de datos en una carga inicial.

**(Laravel)** → Laravel incluye la capacidad de sembrar su base de datos con datos usando clases semilla. 

**Doc.** [https://laravel.com/docs/9.x/seeding](https://laravel.com/docs/9.x/seeding)

**Realizados:**

    • laravel/database/seeders/DatabaseSeeder.php
    • laravel/database/seeders/PermissionTableSeeder.php
    • laravel/database/seeders/RoleSeeder.php

### Models:

Clases que sirven para mapear la base de datos con el ORM.

**(Laravel)** → Laravel incluye Eloquent, un mapeador relacional de objetos (ORM) que hace que sea agradable interactuar con su base de datos. Al usar Eloquent, cada tabla de la base de datos tiene un "Modelo" correspondiente que se usa para interactuar con esa tabla. Además de recuperar registros de la tabla de la base de datos, los modelos Eloquent también le permiten insertar, actualizar y eliminar registros de la tabla.

**Doc.** [https://laravel.com/docs/9.x/eloquent](https://laravel.com/docs/9.x/eloquent)

**Realizados:** 

    • laravel/app/Models/Membership.php
    • laravel/app/Models/Team.php
    • laravel/app/Models/TeamInvitation.php
    • laravel/app/Models/User.php

### Routes:

Ficheros donde se declaran las rutas end-point  para nuestra aplicación.

**(Laravel)** →Las rutas de Laravel más básicas aceptan un URI y un cierre, lo que proporciona un método muy simple y expresivo para definir rutas y comportamientos sin complicados archivos de configuración de enrutamiento:

**Doc.** [https://laravel.com/docs/9.x/routing](https://laravel.com/docs/9.x/routing)

**Realizado:**

    • laravel/routes/api.php

### Controllers:

Clases que ejecutan la lógica de nuestra aplicación comunicando las rutas con nuestros modelos.

**(Laravel)** → En lugar de definir toda su lógica de manejo de solicitudes como cierres en sus archivos de ruta, es posible que desee organizar este comportamiento utilizando clases de "controlador". Los controladores pueden agrupar la lógica de manejo de solicitudes relacionadas en una sola clase.

**Doc.** [https://laravel.com/docs/9.x/controllers](https://laravel.com/docs/9.x/controllers)

**Realizados:**

    • laravel/app/Http/Controllers/Api/ApiController.php
    • laravel/app/Http/Controllers/Api/AuthController.php
    • laravel/app/Http/Controllers/Api/ImagesController.php
    • laravel/app/Http/Controllers/Api/SearchController.php
    • laravel/app/Http/Controllers/Api/UserController.php

### Resources:

Clases que transforman de salida de la respuesta API.

**(Larave)** → Al crear una API, es posible que necesite una capa de transformación que se encuentre entre sus modelos Eloquent y las respuestas JSON que en realidad se devuelven a los usuarios de su aplicación.

**Doc.** [https://laravel.com/docs/9.x/eloquent-resources](https://laravel.com/docs/9.x/eloquent-resources)

**Realizados:**

    • laravel/app/Http/Resources/Search/SearchResource.php
    • laravel/app/Http/Resources/User/UserCollection.php
    • laravel/app/Http/Resources/User/UserResource.php

### Requests:

**(Laravel)** -> Las solicitudes de formulario son clases de solicitud personalizadas que encapsulan su propia lógica de validación y autorización.

**Doc.** [https://laravel.com/docs/9.x/validation#form-request-validation](https://laravel.com/docs/9.x/validation#form-request-validation)

**Realizados:**

    • laravel/app/Http/Requests/User/StoreUserRequest.php
    • laravel/app/Http/Requests/User/UpdateUserRequest.php