var express = require('express');
var router = express.Router();

var noteService = require('../services/notes');
var sumService = require('../services/summary');

/* POST Create new note. */
router.post('', function (req, res) {
  noteService.createObjSchema.isValid(req.body).then((valid) => {
    if (valid) {
      const newNote = noteService.createNewNote(req.body);
      res.json(newNote);
      res.status(200);
    } else {
      res.json({ error: 'incorect data' });
      res.status(400);
    }
  });
});

/* DELETE Remove note by ID. */
router.delete('/:id', function (req, res) {
  res.json(noteService.deleteNote(+req.params.id));
  res.status(200);
});

/* PATCH Edit note by id. */
router.patch('/:id', function (req, res) {
  noteService.editObjSchema.isValid(req.body).then((valid) => {
    if (valid) {
      const editedNote = noteService.editNote(+req.params.id, req.body);
      res.json(editedNote);
      res.status(200);
    } else {
      res.json({ error: 'incorect data' });
      res.status(400);
    }
  });
});

/* GET Get notes stats. */
router.get('/stats', function (req, res) {
  const newNotes = noteService.getNotes();
  const stats = sumService.result(newNotes);
  res.json(stats);
  res.status(200);
});

/* GET Get Note by ID. */
router.get('/:id', function (req, res) {
  res.json(noteService.getNoteById(+req.params.id));
  res.status(200);
});

/* GET Get all notes. */
router.get('', function (req, res, next) {
  res.json(noteService.getNotes());
  res.status(200);
});

module.exports = router;
