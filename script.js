const elements = {
    textInput: document.getElementById('noteInput'),
    saveNote: document.getElementById('save'),
    displayNotes: document.getElementById('listNotes')
}

//create a way to save the textinput into local storage

function saveNote() {
    //grab the value of the new note and trim extra whitespace
    const noteText = elements.textInput.value.trim();

    //grab existing notes 
    let notes = JSON.parse(localStorage.getItem('notes') || '[]');

    //create structure to be saved
   const newNote = {
    id: Date.now(),
    text: noteText,
   };

   //push new note to make a new array of notes 
   notes.unshift(newNote);
    //save the new array to storage
    localStorage.setItem('notes', JSON.stringify(notes));

 //load new locally stored array
 loadNotes();
}


function initializeApp() {
    elements.saveNote.addEventListener('click', saveNote);
    elements.displayNotes.addEventListener('click', handleDelete);
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

    //iterate over the notes to render the HTML to the client side 
    notes.forEach(note => {
        elements.displayNotes.innerHTML += `
            <p>Note id: ${note.id} | ${note.text} | <button class="deleteBtn" data-id=${note.id}>X</button> </p>`;
        
    });
};

//delelte btn logic
function handleDelete(event) {
    const target = event.target;

    if (target.classList.contains("deleteBtn")) {
        const noteId = parseInt(target.dataset.id);

        //check if the id is a number, filter the note with the event targeted id, and push the new filter array
        if (!isNaN(noteId)) { //check to make sure noteId is a number.
            let notes = JSON.parse(localStorage.getItem("notes") || '[]');
            notes = notes.filter(note => note.id !== noteId);
            localStorage.setItem("notes", JSON.stringify(notes));
            loadNotes();
        }
    } else {
        elements.displayNotes.innerText = "no notes saved";
    }
}

initializeApp();
loadNotes();