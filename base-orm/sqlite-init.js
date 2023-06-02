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
      "CREATE table peliculas( IdPelicula INTEGER PRIMARY KEY AUTOINCREMENT, Nombre text NOT NULL UNIQUE, FechaEstreno DATE NOT NULL, IdDirector INTEGER NOT NULL, IdActor INTEGER NOT NULL, FOREIGN KEY (IdDirector) REFERENCES directores(IdDirector), FOREIGN KEY (IdActor) REFERENCES actores(IdActor));"
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
      "CREATE table series( IdSerie INTEGER PRIMARY KEY AUTOINCREMENT, Nombre text NOT NULL UNIQUE, FechaEstreno DATE,IdDirector INTEGER NOT NULL ,IdActor INTEGER NOT NULL,  FOREIGN KEY (IdDirector) REFERENCES directores(IdDirector),FOREIGN KEY (IdActor) REFERENCES actores(IdActor));"
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
    "CREATE TABLE cortos (idCorto INT, Nombre VARCHAR(50), FechaEstreno DATE, IdDirector INTEGER NOT NULL,IdActor INTEGER NOT NULL,  FOREIGN KEY (IdDirector) REFERENCES directores(IdDirector), FOREIGN KEY (IdActor) REFERENCES actores(IdActor));"
  );
  console.log("tabla de cortos creada!");
  await db.run(`
  INSERT INTO cortos (idCorto, Nombre, FechaEstreno, IdDirector, IdActor)
   VALUES
    (1, 'Uncle Buck', '2021-09-06', 1, 6),
    (2, 'Broken English', '2022-26-10', 2, 8),
    (3, 'Thing About My Folks, The', '2023-15-05', 3, 7),
    (4, 'Bloody Territories (Kôiki bôryoku: ryuuketsu no shima)', '8/22/2020', 4, 4),
    (5, 'Tobor the Great', '2020-26-09', 5, 2),
    (6, 'Man Escaped, A (Un  condamné à mort s''est échappé ou Le vent souffle où il veut)', '3/21/2021', 6, 9),
    (7, 'Mute Witness', '2021-03-09', 7, 3),
    (8, 'Treasure Island', '2023-07-05', 8, 4),
    (9, 'Karlsson Brothers (Bröderna Karlsson)', '2020-19-08', 9, 5),
    (10, 'Crossing, The', '2020-08-08', 10, 10)
`);
}

//actores
existe = false;
let res1 = null;

res1 = await db.get(
  "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'actores'",
  []
  
);

if (res1.contar > 0) {
  await db.run(
    "DROP TABLE IF EXISTS actores"
  )
}


if (!existe) {
  await db.run(
    "CREATE table actores( IdActor INTEGER PRIMARY KEY AUTOINCREMENT, Nombre TEXT NOT NULL, Apellido TEXT NOT NULL, FechaNacimiento DATE NOT NULL, Nacionalidad TEXT);"
  );
  console.log("tabla Actores creada!");
  await db.run(`
  INSERT INTO actores (IdActor, Nombre, Apellido, FechaNacimiento, Nacionalidad)
  VALUES 
    (1, "Bryan", "Cranston", "1956-03-07", "Estados Unidos"),
    (2, "Aaron", "Paul", "1979-27-08", "Estados Unidos"),
    (3, "Giancarlo", "Esposito", "1958-04-26", "Dinamarca"),
    (4, "Karl", "Urban", "1972-06-07", "Nueva Zelanda"),
    (5, "Erin", "Moriarty", "1994-06-24", "Estados Unidos"),
    (6, "Andrew", "Lincoln", "1973-09-14", "Reino Unido"),
    (7, "Norman", "Reedus", "1969-01-06", "Estados Unidos"),
    (8, "Travis", "Fimmel", "1979-07-15", "Estados Unidos"),
    (9, "Katheryn", "Winnick", "1977-12-17", "Canada"),
    (10, "Owen", "Wilson", "1968-11-18", "Estados Unidos"),
    (11, "Paul", "Newman", "1925-01-26", "Estados Unidos"),
    (12, "Rhea", "Seehorn", "1972-05-12", "Estados Unidos"),
    (13, "Jonathan", "Banks", "1947-01-31", "Estados Unidos"),
    (14, "Louis", "Hofmann", "1997-06-03", "Alemania"),
    (15, "Lisa", "Vicari", "1997-02-11", "Alemania")
`);
}


  // cerrar la base
  await db.close();
}
  
  CrearBaseSiNoExiste();
  
  module.exports =  CrearBaseSiNoExiste;
  