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

  //directores
  existe = false;
  let sql = null;

  sql = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'directores'",
    []
  );
  if (sql.contar > 0) {
      await db.run(
        "DROP TABLE IF EXISTS directores"
      )
    };
  if (!existe) {
    await db.run(
      "CREATE table directores( IdDirector INTEGER PRIMARY KEY AUTOINCREMENT, Nombre text NOT NULL UNIQUE, FechaNacimiento DATE NOT NULL);"
    );
    console.log("tabla directores creada!");
    await db.run(
      `
        INSERT INTO directores (IdDirector, Nombre, FechaNacimiento)
        VALUES 
          (1, "Genaro", "2001-04-22"),
          (2, "Joaquin", "2001-03-24"),
          (3, "Lucas", "2009-02-05"),
          (4, "Jorge", "1994-08-10"),
          (5, "Laura", "1997-01-13"),
          (6, "Valentina", "1992-05-22"),
          (7, "Amadeo", "2010-01-30"),
          (8, "Malena", "1999-05-11"),
          (9, "Morena", "1990-02-05"),
          (10, "Agustin", "2010-02-15")
      `
    );
  }

  // cerrar la base
  await db.close();
}
  
  CrearBaseSiNoExiste();
  
  module.exports =  CrearBaseSiNoExiste;
  