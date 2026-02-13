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
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.onclick = () => deleteNote(noteText, card);
    
    card.appendChild(noteTitle);
    card.appendChild(deleteBtn);
    notesList.appendChild(card);
}

// Delete note function
function deleteNote(noteText, card) {
    card.remove();
    let notes = JSON.parse(getCookie("notes"));
    notes = notes.filter(note => note !== noteText);
    setCookie("notes", JSON.stringify(notes), 7); // Save updated notes
}

// Get cookie function
function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
}

// Set cookie function
function
