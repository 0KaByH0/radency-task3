let notes = require('../repositories/notes');
var yup = require('yup');

const dateRegEx = /^(0?[1-9]|1[012])[ /](0?[1-9]|[12][0-9]|3[01])[ /](19|20)?[0-9]{2}$/;
const findDates = (value) => {
  let text = value.split(' ');
  const dates = text.map((str) => str.replace(',', '')).filter((str) => str.match(dateRegEx));
  return dates.join(', ');
};

const getNotes = () => notes;

const getNoteById = (noteId) => notes.find((note) => note.id === noteId);

const deleteNote = (delId) => (notes = [...notes.filter((el) => el.id !== delId)]);

const editNote = (id, editNote) => {
  notes.map((note) => {
    if (note.id === id) {
      Object.assign(note, editNote);
      note.id = id;
    }
  });

  return getNoteById(id);
};

const createNewNote = (newNoteData) => {
  const newNote = {
    id: Date.now(),
    img: newNoteData?.img || '',
    name: newNoteData?.name || '',
    creationDate: newNoteData?.creationDate || '',
    category: newNoteData?.category || 'Task',
    content: newNoteData?.content || '',
    dates: findDates(newNoteData?.content || ''),
    archived: newNoteData?.archived || false,
  };
  notes = [...notes, newNote];
  return newNote;
};

const createObjSchema = yup.object().shape({
  img: yup.string().required(),
  name: yup.string().required(),
  creationDate: yup.string().required(),
  category: yup.string().required(),
  content: yup.string().required(),
  archived: yup.boolean(),
});

const editObjSchema = yup.object().shape({
  img: yup.string(),
  name: yup.string(),
  creationDate: yup.string(),
  category: yup.string(),
  content: yup.string(),
  archived: yup.boolean(),
});

module.exports.createNewNote = createNewNote;
module.exports.getNotes = getNotes;
module.exports.getNoteById = getNoteById;
module.exports.deleteNote = deleteNote;
module.exports.editNote = editNote;

module.exports.createObjSchema = createObjSchema;
module.exports.editObjSchema = editObjSchema;
