const calculateActive = (category, notes) =>
  notes.reduce(
    (acc, note) => (note.category === category && note.archived === false ? acc + 1 : acc),
    0,
  );
const calculateArchived = (category, notes) =>
  notes.reduce(
    (acc, note) => (note.category === category && note.archived === true ? acc + 1 : acc),
    0,
  );

const calculate = (category, notes) => ({
  active: calculateActive(category, notes),
  archived: calculateArchived(category, notes),
});

const result = (notes) => ({
  Task: calculate('Task', notes),
  Thought: calculate('Random Thought', notes),
  Idea: calculate('Idea', notes),
});
module.exports.result = result;
