const request = require("supertest");
const app = require("../index");
const { INTEGER } = require("sequelize");

const serieAlta = {
    Nombre: "Nueva serie 1",
    FechaEstreno: "2023-05-09",
};
  
const serieModificacion = {
    Nombre: "Serie modificada 1",
    FechaEstreno: "2023-05-29",
};

// test route/articulos GET
describe("GET /api/series", () => {
    it("Deberia devolver todas las series", async () => {
      const res = await request(app).get("/api/series");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            //IdSerie: expect.any(Number),
            Nombre: expect.any(String),
            FechaEstreno: expect.any(String),
            IdActor: expect.any(),
          }),
        ])
      );
    });
  });
  
  


// test route/series/:id GET
describe("GET /api/series/:id", () => {
    it("Deberia devolver la serie con el id 1", async () => {
      const res = await request(app).get("/api/series/2");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          //IdSerie: expect.any(Number),
          Nombre: expect.any(String),
          FechaEstreno: expect.any(String),
          IdActor: expect.any(INTEGER),
        })
      );
    });
  });
  

// test route/series POST
describe("POST /api/series", () => {
    it("Deberia devolver la serie que acabo de crear", async () => {
      const res = await request(app).post("/api/series").send(serieAlta);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          Nombre: expect.any(String),
          FechaEstreno: expect.any(String),
          IdActor: expect.any(INTEGER),
        })
      );
    });
  });
  
  
// test route/series/:id PUT
describe("PUT /api/series/:id", () => {
    it("Deberia devolver la serie con el id 1 modificado", async () => {
      const res = await request(app).put("/api/series/1").send(serieModificacion);
      expect(res.statusCode).toEqual(200);
    });
  });
  
  
// test route/series/:id DELETE
describe("DELETE /api/series/:id", () => {
    it("Deberia devolver la serie con el id 1 borrado", async () => {
      const res = await request(app).delete("/api/series/2");
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
  
