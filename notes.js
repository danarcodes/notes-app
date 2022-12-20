const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, body) => {
  const notes = loadNotes();

  // get duplicate note
  // const duplicateNotes = notes.filter((note) => note.title === title);

  // duplicateNotes variable is not efficient, because when finding duplicate code we want to stop right there and go on with our code
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });

    saveNotes(notes);
    console.log("New note added!");
  } else {
    console.log("Note title already taken!");
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const removeNote = (title) => {
  // console.log(title);
  const notes = loadNotes();
  const keepingNotes = notes.filter((note) => note.title !== title);

  saveNotes(keepingNotes);

  notes.length !== keepingNotes.length
    ? console.log(chalk.bgGreen("Note removed")) && saveNotes(keepingNotes)
    : console.log(chalk.bgRed("No note found"));
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.inverse("Your notes!"));

  notes.forEach((note) => console.log(note.title));
};

const readNotes = (title) => {
  const notes = loadNotes();
  const readNote = notes.find((read) => read.title === title);
  // console.log(readNote);
  if (readNote) {
    console.log(
      "Title of the note: " +
        chalk.green(readNote.title) +
        " with the content: " +
        readNote.body
    );
  } else {
    console.log("No note to read!");
  }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNotes: readNotes,
};
