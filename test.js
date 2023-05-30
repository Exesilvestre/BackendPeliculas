const { expect } = require('chai');
const request = require('supertest');
const app = require('./index');
const { Song } = require('./models');

describe('Endpoints de la API de canciones', () => {
  before(async () => {
    await Song.sync({ force: true });
  });

  describe('GET /songs', () => {
    it('debe devolver una lista vacía de canciones', async () => {
      const res = await request(app).get('/songs');
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.lengthOf(0);
    });
  });

  describe('POST /songs', () => {
    it('debe crear una nueva canción', async () => {
      const songData = {
        name: 'Canción de prueba',
        releaseDate: '2023-01-01',
        album: 'Álbum de prueba',
      };

      const res = await request(app)
        .post('/songs')
        .send(songData);

      expect(res.statusCode).to.equal(201);
      expect(res.body).to.have.property('id');
      expect(res.body.name).to.equal(songData.name);
      expect(res.body.releaseDate).to.equal(songData.releaseDate);
      expect(res.body.album).to.equal(songData.album);
    });
  });

  describe('GET /songs/:id', () => {
    it('debe devolver una canción existente por su ID', async () => {
      const songData = {
        name: 'Canción de prueba 2',
        releaseDate: '2023-02-01',
        album: 'Álbum de prueba 2',
      };

      const createdSong = await Song.create(songData);

      const res = await request(app).get(`/songs/${createdSong.id}`);

      expect(res.statusCode).to.equal(200);
      expect(res.body).to.have.property('id');
      expect(res.body.name).to.equal(songData.name);
      expect(res.body.releaseDate).to.equal(songData.releaseDate);
      expect(res.body.album).to.equal(songData.album);
    });

    it('debe devolver un error 404 para una canción inexistente', async () => {
      const res = await request(app).get('/songs/123');
      expect(res.statusCode).to.equal(404);
      expect(res.body).to.have.property('error');
    });
  });

  // Implementa los tests para los demás endpoints (PUT y DELETE) de manera similar a los ejemplos anteriores.

});

