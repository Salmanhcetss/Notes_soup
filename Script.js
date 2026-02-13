// Select DOM elements
const exportNotesBtn = document.getElementById('exportNotesBtn');
const importFileInput = document.getElementById('importFileInput');
const importNotesBtn = document.getElementById('importNotesBtn');
const noteInput = document.getElementById('noteInput');
const notesList = document.getElementById('notesList');

// Load saved notes from localStorage (if available)
function loadNotes() {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
        const notes = JSON.parse(savedNotes);
        notes.forEach(note => {
            displayNote(note);
        });
    }
}

// Save the note to localStorage
function saveNote() {
    const noteText = noteInput.value.trim();
    if (noteText) {
        displayNote(noteText);

        // Get notes from localStorage and add new note
        let notes = localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : [];
        notes.push(noteText);
        localStorage.setItem("notes", JSON.stringify(notes));

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
    deleteBtn.onclick = () => deleteNote(noteText, card);
    
    card.appendChild(noteTitle);
    card.appendChild(deleteBtn);
    notesList.appendChild(card);
}

// Delete note function
function deleteNote(noteText, card) {
    card.remove();
    let notes = JSON.parse(localStorage.getItem("notes"));
    notes = notes.filter(note => note !== noteText);
    localStorage.setItem("notes", JSON.stringify(notes)); // Save updated notes
}

// Export notes to a .txt file
exportNotesBtn.addEventListener('click', () => {
    const notes = localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : [];
    if (notes.length === 0) {
        alert("No notes to export.");
        return;
    }

    // Create a text file and trigger a download
    const textBlob = new Blob([notes.join("\n\n")], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(textBlob);
    link.download = "notes.txt";
    link.click();
});

// Import notes from a .txt file
importNotesBtn.addEventListener('click', () => {
    const file = importFileInput.files[0];
    if (!file) {
        alert("Please select a file to import.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const importedNotes = event.target.result.split("\n\n"); // Split notes by double newlines
        importedNotes.forEach(note => {
            if (note.trim()) {
                displayNote(note.trim());
            }
        });

        // Save imported notes to localStorage
        localStorage.setItem("notes", JSON.stringify(importedNotes));
    };
    reader.readAsText(file);
});

// Load notes on page load
loadNotes();
