# Proyecto Monolítico Refactorizado con Arquitectura Limpia

## Introducción

Este documento describe el proceso de refactorización de un proyecto monolítico en Node.js aplicando los principios de la Arquitectura Limpia. Se explican los problemas identificados en el código original, las mejoras aplicadas, las dificultades encontradas y cómo se resolvieron, así como la integración con Flutter y la verificación de la correcta comunicación con la API.

## Problemas Identificados en el Código Original

1. **Acoplamiento entre Capas**:

   - La lógica de negocio estaba acoplada a los controladores y a la base de datos, lo que dificultaba la escalabilidad y el mantenimiento del código.

2. **Falta de Separación de Responsabilidades**:

   - No había una clara separación de responsabilidades entre las diferentes capas del sistema, lo que hacía que el código fuera difícil de entender y mantener.

3. **Dependencia de Frameworks y Herramientas**:
   - La lógica de negocio dependía directamente de frameworks y herramientas externas, lo que dificultaba la prueba y el reemplazo de estos componentes.

## Mejoras Aplicadas

1. **Separación de Capas**

Se reorganizó el proyecto en las siguientes capas:

- _Entidades_: Contienen las reglas de negocio más generales y de más alto nivel.
- _Casos de Uso_: Contienen la lógica de aplicación específica.
- _Interfaces (Adaptadores)_: Manejan la interacción con el mundo exterior (controladores, servicios y repositorios).
- _Frameworks y Herramientas_: Contienen los detalles de implementación específicos de los frameworks y herramientas utilizados.

2. **Desacoplamiento de la Lógica de Negocio**

Se desacopló la lógica de negocio de los frameworks y herramientas externas, lo que facilita la prueba y el mantenimiento del código.

3. **Implementación de Repositorios**

Se implementaron repositorios para manejar la interacción con la base de datos, lo que permite cambiar la base de datos sin afectar la lógica de negocio.

4. **Refactorización del Código**

Se refactorizó el código para mejorar la legibilidad y la mantenibilidad. Aquí tienes un ejemplo de la nueva estructura del proyecto:

5. **Mejoras en el Manejo de Errores**

Se mejoró el manejo de errores para asegurar que los errores se manejen de manera consistente en todas las capas.

## Dificultades Encontradas y Cómo se Resolucionaron

1. **Desacoplamiento de la Lógica de Negocio**

**Dificultad**: Desacoplar la lógica de negocio de los frameworks y herramientas externas fue un desafío, ya que requería una reorganización significativa del código.

_Solución_: Se implementaron repositorios y casos de uso para manejar la lógica de negocio y la interacción con la base de datos, lo que permitió desacoplar la lógica de negocio de los frameworks y herramientas externas.

2. **Manejo de Dependencias**

_Dificultad_: Manejar las dependencias entre las diferentes capas del sistema fue un desafío, ya que requería una clara separación de responsabilidades.

_Solución_: Se utilizó la inyección de dependencias para manejar las dependencias entre las diferentes capas del sistema, lo que facilitó la separación de responsabilidades.

## Integración con Flutter

1. **Configuración de la API**

Se configuró la API en Node.js para manejar las solicitudes HTTP desde la aplicación Flutter. configuracion de la API:

```javascript
// filepath: [server.js](http://_vscodecontentref_/1)
require("dotenv").config();
const express = require("express");
const http = require("http");
const logger = require("morgan");
const cors = require("cors");
const userRoutes = require("./src/routes/userRoutes");

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3001;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/users", userRoutes);

server.listen(port, () => {
  console.log("Server on port:", port);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).send(err.stack);
});

module.exports = { server };
```

2. **Verificación de la Comunicación con la API**

Se verificó la correcta comunicación con la API utilizando Postman y la aplicación Flutter. Aquí tienes un ejemplo de cómo se verificó la comunicación:

**Postman**:

- Se configuraron las solicitudes HTTP en Postman para verificar que la API respondiera correctamente a las solicitudes de creación y obtención de usuarios.

**Flutter**:

- Se implementaron las solicitudes HTTP en la aplicación Flutter para interactuar con la API. Aquí tienes un ejemplo de cómo se implementó la solicitud de creación de usuarios en Flutter:

```dart
import 'package:http/http.dart' as http;
import 'dart:convert';

Future<void> createUser(String email, String password, String name, String lastName, String phone) async {
  final response = await http.post(
    Uri.parse('http://localhost:3001/api/users/create'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: jsonEncode(<String, String>{
      'email': email,
      'password': password,
      'name': name,
      'lastName': lastName,
      'phone': phone,
    }),
  );

  if (response.statusCode == 201) {
    print('Usuario creado exitosamente');
  } else {
    throw Exception('Error al crear el usuario');
  }
}
```

## Conclusión

La refactorización del proyecto aplicando los principios de la Arquitectura Limpia ha mejorado significativamente la escalabilidad y mantenibilidad del código. La lógica de negocio ahora está desacoplada de los frameworks y herramientas externas, lo que facilita la prueba y el mantenimiento del código. La integración con Flutter se verificó correctamente, asegurando una comunicación fluida entre la aplicación y la API.

```

Este README.md proporciona una explicación detallada de los problemas identificados, las mejoras aplicadas, las dificultades encontradas y la integración con Flutter. Puedes ajustar y expandir este documento según sea necesario para reflejar mejor tu proyecto y las especificidades de tu implementación.

Código similar encontrado con 1 tipo de licencia
```
