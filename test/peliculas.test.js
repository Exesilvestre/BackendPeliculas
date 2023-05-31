const request = require("supertest");
const app = require("../index");

const peliculaAlta = {
    Nombre: "Nueva película",
    FechaEstreno: "2023-05-09",
    IdDirector: 3
};
  
const peliculaModificacion = {
    Nombre: "Película modificada",
    FechaEstreno: "2023-05-29",
    IdDirector: 2
};

// test route/articulos GET
describe("GET /api/peliculas", () => {
    it("Deberia devolver todas las peliculas", async () => {
      const res = await request(app).get("/api/peliculas");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            IdPelicula: expect.any(Number),
            Nombre: expect.any(String),
            FechaEstreno: expect.any(String),
            IdDirector: expect.any(Number),
          }),
        ])
      );
    });
  });
  
  


// test route/peliculas/:id GET
describe("GET /api/peliculas/:id", () => {
    it("Deberia devolver la pelicula con el id 1", async () => {
      const res = await request(app).get("/api/peliculas/1");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          IdPelicula: expect.any(Number),
          Nombre: expect.any(String),
          FechaEstreno: expect.any(String),
          IdDirector: expect.any(Number)
        })
      );
    });
  });
  

// test route/peliculas POST
describe("POST /api/peliculas", () => {
    it("Deberia devolver la pelicula que acabo de crear", async () => {
      const res = await request(app).post("/api/peliculas").send(peliculaAlta);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          Nombre: expect.any(String),
          FechaEstreno: expect.any(String),
          IdDirector: expect.any(Number)
        })
      );
    });
  });
  
  
// test route/articulos/:id PUT
describe("PUT /api/peliculas/:id", () => {
    it("Deberia devolver la pelicula con el id 1 modificado", async () => {
      const res = await request(app).put("/api/peliculas/1").send(peliculaModificacion);
      expect(res.statusCode).toEqual(200);
    });
  });
  
  
// test route/articulos/:id DELETE
describe("DELETE /api/peliculas/:id", () => {
    it("Deberia devolver la pelicula con el id 1 borrado", async () => {
      const res = await request(app).delete("/api/peliculas/1");
      expect(res.statusCode).toEqual(200);
      
      // baja logica, no se borra realmente
      // expect(res.body).toEqual(
      //   expect.objectContaining({
      //     IdArticulo: expect.any(Number),
      //     Nombre: expect.any(String),
      //     Precio: expect.any(Number),
      //   })
      // );
  
    });
  });
  

