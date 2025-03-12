const elements = {
    textInput: document.getElementById('noteInput'),
    saveNote: document.getElementById('save'),
    displayNotes: document.getElementById('listNotes')
}

//create a way to save the textinput into local storage

function saveNote() {
    //grab the value of the new note
    const noteText = elements.textInput.value.trim();

    //grab existing notes 
    let notes = JSON.parse(localStorage.getItem('notes') || '[]');

    //create structure to be saved
   const newNote = {
    id: Date.now(),
    text: noteText
   };

   //push new note to the existing array of notes
   notes.unshift(newNote);
//save the new note to storage
 localStorage.setItem('notes', JSON.stringify(notes));


 loadNotes();
}


function initializeApp() {
    elements.saveNote.addEventListener('click', saveNote);
}

function loadNotes() {
    //get the notes from local storage
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');

    //clear out the notes 
    elements.displayNotes.innerText = "";

    //makes sure notes are saved 
    if (notes.length === 0) {
        elements.displayNotes.innerText = "No Notes saved";
        return;
    }

    //iterate over the notes 
    notes.forEach(note => {
        elements.displayNotes.innerHTML += `
            <p>${note.text}</p>
        `
        
    });


    
};

initializeApp();
loadNotes();