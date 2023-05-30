const express = require("express");

// crear servidor
const app = express();
app.use(express.json()); // para poder leer json en el body
require("./base-orm/sqlite-init");  // crear base si no existe


// controlar ruta
app.get("/", (req, res) => {
  res.send("Backend inicial dds-backend!");
});

const peliculasRouter = require("./routes/peliculas");
app.use(peliculasRouter);


// levantar servidor
if (!module.parent) {   // si no es llamado por otro modulo, es decir, si es el modulo principal -> levantamos el servidor
  const port = process.env.PORT || 3000;   // en produccion se usa el puerto de la variable de entorno PORT
  app.locals.fechaInicio = new Date();
  app.listen(port, () => {
    console.log(`sitio escuchando en el puerto ${port}`);
  });
}
module.exports = app; // para testing




