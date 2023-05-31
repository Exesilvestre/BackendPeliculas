// acceder a la base usando aa-sqlite
const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
  // abrir base, si no existe el archivo/base lo crea
  await db.open("./.data/tpi.db");
  //await db.open(process.env.base);

  let existe = false;
  let res = null;

  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'peliculas'",
    []
  );
  if (res.contar > 0) {
      await db.run(
        "DROP TABLE IF EXISTS peliculas"
      )
    };
  if (!existe) {
    await db.run(
      "CREATE table peliculas( IdPelicula INTEGER PRIMARY KEY AUTOINCREMENT, Nombre text NOT NULL UNIQUE, FechaEstreno DATE NOT NULL, IdDirector INTEGER NOT NULL);"
    );
    console.log("tabla PELICULAS creada!");
    await db.run(
      `
        INSERT INTO peliculas (IdPelicula, Nombre, FechaEstreno, IdDirector)
        VALUES 
          (1, "Cars", "2006-07-31", 1),
          (2, "Toy Story", "2005-06-20", 2),
          (3, "Monster Inc", "2006-09-17", 4),
          (4, "Los increibles", "2008-09-01", 3),
          (5, "Bichos", "2003-04-15", 6),
          (6, "Shrek", "2006-03-19", 7),
          (7, "La era del hielo", "2008-02-31", 10),
          (8, "Mohana", "2015-01-11", 8),
          (9, "Megamente", "2006-07-12", 9),
          (10, "Coco", "2020-03-21", 5)
      `
    );
  }

  // cerrar la base
  await db.close();
}
  
  CrearBaseSiNoExiste();
  
  module.exports =  CrearBaseSiNoExiste;
  