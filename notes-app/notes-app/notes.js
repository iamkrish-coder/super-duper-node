const fs = require('fs')
const chalk = require('chalk')
const getNotes = () => {
    return "Your Notes...";
}

const addNote = (title, body) => {
    const notes = loadNotes();
    // const duplicateNotes = notes.filter((note) => note.title == title);      //1
    const duplicateNote = notes.find((note) => note.title == title)
    // if(duplicateNotes.length === 0){         //1

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log(chalk.green.inverse("Note added successfully!"));
    } else {
        console.log(chalk.red.inverse("Note is already taken!"));
    }
}


const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title !== title);
    if(notes.length > notesToKeep.length){
        console.log(chalk.green.inverse('Removed note!'));
        saveNotes(notesToKeep);
    }else{
        console.log(chalk.red.inverse('No note found!'));
    }

}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }
    catch(e) {
        return [];
    }
}

const listNotes = () => {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    const dataObjects = JSON.parse(dataJSON);
    let totalNotes = Object.keys(dataObjects).length;
    console.log(chalk.white.inverse("Your Saved Notes - Total ("+totalNotes+")"))

    for(x of dataObjects)
    {
        console.log("Title: "+x.title);
        console.log("Body: "+x.body);
    }
}

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((note)=>note.title === title);

    if(note){
        console.log(chalk.green.inverse(note.title));
        console.log(note.body);
    }else{
        console.log(chalk.red.inverse("No note found!"));
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}
