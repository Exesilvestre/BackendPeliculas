const request = require("supertest");
const app = require("../index");

const actorAlta = {
    Nombre: "Nuevo Actor",
    Apellido: "Nuevo Actor Apellido",
    FechaNacimiento: "2000-01-01",
    Nacionalidad: "Nueva Nacionalidad",
};
  
const actorModificacion = {
    Nombre: "Actor Modificado",
    Apellido: "Apellido Actor Modificado",
    FechaNacimiento: "2001-01-01",
    Nacionalidad: "Nacionalidad Modificada",
};

// test route/actores GET
describe("GET /api/actores", () => {
    it("Deberia devolver todos los actores", async () => {
      const res = await request(app).get("/api/actores");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            IdActor: expect.any(Number),
            Nombre: expect.any(String),
            Apellido: expect.any(String),
            FechaNacimiento: expect.any(String),
            Nacionalidad: expect.any(String),
          }),
        ])
      );
    });
  });
  
  


// test route/actores/:id GET
describe("GET /api/actores/:id", () => {
    it("Deberia devolver el actor con el id 1", async () => {
      const res = await request(app).get("/api/actores/1");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
            IdActor: expect.any(Number),
            Nombre: expect.any(String),
            Apellido: expect.any(String),
            FechaNacimiento: expect.any(String),
            Nacionalidad: expect.any(String),
        })
      );
    });
  });
  

// test route/actores POST
describe("POST /api/actores", () => {
    it("Deberia devolver el actor que acabo de crear", async () => {
      const res = await request(app).post("/api/actores").send(actorAlta);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
            Nombre: expect.any(String),
            Apellido: expect.any(String),
            FechaNacimiento: expect.any(String),
            Nacionalidad: expect.any(String),
        })
      );
    });
  });
  
  
// test route/actores/:id PUT
describe("PUT /api/actores/:id", () => {
    it("Deberia devolver el actor con el id 1 modificado", async () => {
      const res = await request(app).put("/api/actores/1").send(actorModificacion);
      expect(res.statusCode).toEqual(200);
    });
  });
  
  
// test route/actores/:id DELETE
describe("DELETE /api/actores/:id", () => {
    it("Deberia devolver el actor con el id 1 borrado", async () => {
      const res = await request(app).delete("/api/actores/1");
      expect(res.statusCode).toEqual(200);
      
     
  
    });
  });
  

