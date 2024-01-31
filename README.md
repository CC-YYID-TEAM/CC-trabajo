# David, Iván, Yazid
## observer

### observa el estado en la cola de nats

## worker
### worker ejecuta los trabajos(proyectos en github)

## workerstatus (exponemos un api para obtener los resultados del worker)

## fe(Es un api de cara al cliente para ejecutar los trabajos)
## En nuestra API, destacan cuatro funcionalidades principales.
- `La primera`, conocida como "Enviar Trabajo", constituye la piedra angular de la API. Al invocar esta función, se requiere proporcionar un nombre y una URL que apunte al código almacenado en GitHub, el cual se desea ejecutar. Además, se genera un identificador único utilizando la biblioteca 'node-uuid' para identificar estos trabajos. En esencia, esta función se encarga de transmitir un trabajo a través de NATS al microservicio llamado "workers", el cual se responsabiliza de ejecutar dicho trabajo y generar los resultados correspondientes
- `La segunda tarea` que realiza nuestra API es obtener el estado del trabajo. Consultamos este estado a través de un API dedicado que conoce los estados de las tareas, enviándole el ID del trabajo, y nos retorna información sobre si ha terminado o está pendiente.
- `La tercera tarea` es muy similar a la anterior, pero obteniendo el resultado del trabajo ejecutado. Aquí, podemos almacenar un resultado exitoso o un error de ejecución, como por ejemplo, una URL de GitHub incorrecta o problemas en el código de Python presente en el archivo 'main.py', o cualquier otro error relacionado con la ejecución del trabajo.
- `La cuarta función` consiste en obtener las métricas de la media general de la duración de las tareas y conocer el estado del sistema. Tomamos tiempos antes de comenzar la ejecución de la tarea y luego de que termine, independientemente del resultado, esto lo almacenamos y realizamos una operación de media, tomando la diferencia entre el tiempo que comienza la tarea y termina.

## auth2-proxy(los usamos como porveedor de autenticacion)

# Ejecutar todo el proyecto
## docker-compose up build