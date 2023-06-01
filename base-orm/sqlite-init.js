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
      "CREATE table peliculas( IdPelicula INTEGER PRIMARY KEY AUTOINCREMENT, Nombre text NOT NULL UNIQUE, FechaEstreno DATE NOT NULL, IdDirector INTEGER NOT NULL, IdActor INTEGER NOT NULL, FOREIGN KEY (IdDirector) REFERENCES directores(IdDirector));"
    );
    console.log("tabla PELICULAS creada!");
    await db.run(
      `
        INSERT INTO peliculas (IdPelicula, Nombre, FechaEstreno, IdDirector, IdActor)
        VALUES 
          (1, "Cars", "2006-07-31", 1, 2),
          (2, "Toy Story", "2005-06-20", 2, 5),
          (3, "Monster Inc", "2006-09-17", 4, 7),
          (4, "Los increibles", "2008-09-01", 3, 8),
          (5, "Bichos", "2003-04-15", 6, 1),
          (6, "Shrek", "2006-03-19", 7, 9),
          (7, "La era del hielo", "2008-02-31", 10, 6),
          (8, "Mohana", "2015-01-11", 8, 10),
          (9, "Megamente", "2006-07-12", 9, 9),
          (10, "Coco", "2020-03-21", 5, 4)
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
  //series
  existe = false;
  let rep = null;


  rep = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'series'",
    []
  );
  if (rep.contar > 0) {
    await db.run(
      "DROP TABLE IF EXISTS series"
    )
  };

  if (!existe) {
    await db.run(
      "CREATE table series( IdSerie INTEGER PRIMARY KEY AUTOINCREMENT, Nombre text NOT NULL UNIQUE, FechaEstreno DATE,IdDirector INTEGER NOT NULL ,IdActor INTEGER NOT NULL,  FOREIGN KEY (IdDirector) REFERENCES directores(IdDirector));"
    );
    console.log("tabla de series creada!");
    await db.run(`
    INSERT INTO series (IdSerie, Nombre, FechaEstreno, IdDirector, IdActor)
    VALUES 
      (1, "Breaking Bad", "2008-01-20", 1, 4),
      (2, "Friends", "1994-09-22", 1, 7),
      (3, "The Big Bang Theory", "2007-09-23", 2, 5),
      (4, "The Boys", "2019-07-26", 2, 6),
      (5, "Vikings", "2013-03-03", 3, 10),
      (6, "The Mandalorian", "2019-11-12", 3, 8),
      (7, "The Walking Dead", "2010-10-31", 4, 9),
      (8, "Grey's Anatomy", "2005-03-27", 4, 1),
      (9, "Gilmore Girls", "2000-10-05", 5, 3),
      (10, "Lost", "2004-09-22", 5, 2)
  `);
}

//cortos
existe = false;
let sq = null;


sq = await db.get(
  "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'cortos'",
  []
);
if (sq.contar > 0) {
  await db.run(
    "DROP TABLE IF EXISTS cortos"
  )
};

if (!existe) {
  await db.run(
    "CREATE TABLE cortos (idCorto INT, Nombre VARCHAR(50), FechaEstreno DATE, IdDirector INT,IdActor INTEGER NOT NULL,  FOREIGN KEY (IdDirector) REFERENCES directores(IdDirector));"
  );
  console.log("tabla de cortos creada!");
  await db.run(`
  INSERT INTO cortos (idCorto, Nombre, FechaEstreno, IdDirector, IdActor)
   VALUES
    (1, 'Uncle Buck', '6/9/2021', 1, 6),
    (2, 'Broken English', '10/26/2022', 2, 8),
    (3, 'Thing About My Folks, The', '5/15/2023', 3, 7),
    (4, 'Bloody Territories (Kôiki bôryoku: ryuuketsu no shima)', '8/22/2020', 4, 4),
    (5, 'Tobor the Great', '9/26/2020', 5, 2),
    (6, 'Man Escaped, A (Un  condamné à mort s''est échappé ou Le vent souffle où il veut)', '3/21/2021', 6, 9),
    (7, 'Mute Witness', '9/3/2021', 7, 3),
    (8, 'Treasure Island', '5/7/2023', 8, 4),
    (9, 'Karlsson Brothers (Bröderna Karlsson)', '8/19/2020', 9, 5),
    (10, 'Crossing, The', '8/8/2020', 10, 10)
`);
}

  // cerrar la base
  await db.close();
}
  
  CrearBaseSiNoExiste();
  
  module.exports =  CrearBaseSiNoExiste;
  