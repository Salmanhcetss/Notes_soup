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
            const card = document.createElement('div');
            card.classList.add('card');
            
            const noteTitle = document.createElement('h3');
            noteTitle.textContent = note;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.onclick = () => deleteNote(note, card);
            
            card.appendChild(noteTitle);
            card.appendChild(deleteBtn);
            notesList.appendChild(card);
        });
    }
}

// Save the note to cookies
function saveNote() {
    const noteText = noteInput.value.trim();
    if (noteText) {
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
        
        // Save to cookies
        let notes = getCookie("notes") ? JSON.parse(getCookie("notes")) : [];
        notes.push(noteText);
        setCookie("notes", JSON.stringify(notes), 7); // Save for 7 days
        
        noteInput.value = ''; // Clear the input after saving
    } else {
        alert("Please enter a note.");
    }
}

// Delete note function
function deleteNote(noteText, card) {
    card.remove();
    let notes = JSON.parse(getCookie("notes"));
    notes = notes.filter(note => note !== noteText);
    setCookie("notes", JSON.stringify(notes), 7); // Save updated notes
}

// Get cookie function
function getCookie(name
