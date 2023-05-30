const express = require('express');
const bodyParser = require('body-parser');
const { Song } = require('./models');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Obtener todas las canciones
app.get('/songs', async (req, res) => {
  try {
    const songs = await Song.findAll();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error al obtener las canciones.' });
  }
});

// Obtener una canción por su ID
app.get('/songs/:id', async (req, res) => {
  try {
    const song = await Song.findByPk(req.params.id);
    if (!song) {
      return res.status(404).json({ error: 'Canción no encontrada.' });
    }
    res.json(song);
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error al obtener la canción.' });
  }
});

// Crear una nueva canción
app.post('/songs', async (req, res) => {
  try {
    const song = await Song.create(req.body);
    res.status(201).json(song);
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error al crear la canción.' });
  }
});

// Actualizar una canción existente
app.put('/songs/:id', async (req, res) => {
  try {
    const song = await Song.findByPk(req.params.id);
    if (!song) {
      return res.status(404).json({ error: 'Canción no encontrada.' });
    }
    await song.update(req.body);
    res.json(song);
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error al actualizar la canción.' });
  }
});

// Eliminar una canción
app.delete('/songs/:id', async (req, res) => {
  try {
    const song = await Song.findByPk(req.params.id);
    if (!song) {
      return res.status(404).json({ error: 'Canción no encontrada.' });
    }
    await song.destroy();
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error al eliminar la canción.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});
