// Select DOM elements
const saveNoteBtn = document.getElementById('saveNoteBtn');
const noteInput = document.getElementById('noteInput');
const notesList = document.getElementById('notesList');

// Load saved notes from cookies
function loadNotes() {
    const savedNotes = getCookie("notes");
    if (savedNotes) {
        const notes = JSON.parse(savedNotes);
        notes.forEach(note => {
            displayNote(note);
        });
    }
}

// Save the note to cookies
function saveNote() {
    const noteText = noteInput.value.trim();
    if (noteText) {
        displayNote(noteText);

        // Save to cookies
        let notes = getCookie("notes") ? JSON.parse(getCookie("notes")) : [];
        notes.push(noteText);
        setCookie("notes", JSON.stringify(notes), 7); // Save for 7 days

        noteInput.value = ''; // Clear the input after saving
    } else {
        alert("Please enter a note.");
    }
}

// Display the note in the notes section
function displayNote(noteText) {
    const card = document.createElement('div');
    card.classList.add('card');

    const noteTitle = document.createElement('h3');
    noteTitle.textContent = noteText;

    const
