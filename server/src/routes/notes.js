const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { readDatabaseFile, writeDatabaseFile } = require('../helpers/database-helper');
const validate = require('../helpers/validate-helper');
const noteValidateSchema = require('../validation-schemas/notes-schema');

router.use(bodyParser.json());

router.route('/')
  .get(async (req, res, next) => {
    try {
      const data = await readDatabaseFile();
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({ notes: data })
    } catch(err) {
      next(err);
    }
  })
  .post(validate(noteValidateSchema), async (req, res, next) => {
    try {
      const data = await readDatabaseFile();
      const newNote = { id: uuidv4(), archived: false, created: Date.now(), ...req.body };
      const updatedNotes = [...data, newNote];
      await writeDatabaseFile(updatedNotes)
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({ id: newNote.id });
    } catch(err) {
      next(err);
    }
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /notes');
  })
  .delete((req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /notes');
  });

router.route('/stats')
  .get(async (req, res, next) => {
    try {
      const data = await readDatabaseFile();
      const stats = ['Task', 'Random Thought', 'Idea', 'Quote'].reduce((acc, category, idx) => {
        const activeNotes = data.filter((note) => !note.archived && note.category === category) ;
        const archivedNotes = data.filter((note) => note.archived && note.category === category);
        const newNote = { id: idx, category: category, active: activeNotes.length, archived: archivedNotes.length };
        acc.push(newNote);
        return acc;
      }, []);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({ stats });
    } catch(err) {
      next(err);
    }
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /notes/stats');
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /notes/stats');
  })
  .delete((req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /notes/stats');
  })

router.route('/:id')
  .get(async (req, res, next) => {
    try {
      const data = await readDatabaseFile();
      const note = data.find((note) => note.id === req.params.id);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(note);
    } catch(err) {
      next(err);
    }
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /notes/:id');
  })
  .put(async (req, res, next) => {
    try {
      const data = await readDatabaseFile();
      const updatedNotes = data.map((note) => note.id === req.params.id ? { ...note, ...req.body } : note);
      await writeDatabaseFile(updatedNotes);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({ id: req.params.id });
    } catch(err) {
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const data = await readDatabaseFile();
      const filteredNotes = data.filter((note) => note.id !== req.params.id);
      await writeDatabaseFile(filteredNotes);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({ id: req.params.id });
    } catch(err) {
      next(err);
    }
  })

module.exports = router;
