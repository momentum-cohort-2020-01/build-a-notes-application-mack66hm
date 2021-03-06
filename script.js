/* globals fetch, moment */

function print (value) {
  console.log(value)
  return value
}

function q (selector) {
  return document.querySelector(selector)
}

function getAllNotes () {
  return fetch('http://localhost:3000/notes/', {
    method: 'GET'
  })
    .then(response => response.json())
}

function createNotesHTML (notes) {
  let notesStr = '<ul id="notes-list">'
  for (const note of notes) {
    notesStr += createNoteHTML(note)
  }
  notesStr += '</ul>'
  return notesStr
}

function createNoteHTML (note) {
  return `<li data-note-id='${note.id}'>${note.note} <button class='edit'> Edit </button><button class='delete'>Delete</button></li>`
}

function postNewNote (noteText) {
  return fetch('http://localhost:3000/notes/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ note: noteText, done: false, created: moment().format() })
  })
    .then(response => response.json())
}

function renderNotesList (notes) {
  const notesHTML = createNotesHTML(notes)
  const notesSection = q('#notes')
  notesSection.innerHTML = notesHTML
}

function renderNewNote (note) {
  const noteHTML = createNoteHTML(note)
  const notesList = q('#notes-list')
  notesList.insertAdjacentHTML('beforeend', noteHTML)
}
getAllNotes().then(renderNotesList)

q('#new-note-form').addEventListener('submit', event => {
  event.preventDefault()
  const noteTextField = q('#note-text')
  const noteText = noteTextField.value
  noteTextField.value = ''
  postNewNote(noteText).then(renderNewNote)
})

q('#notes').addEventListener('click', event => {
  if (event.target.matches('.delete')) {
    print('delete ' + event.target.parentElement.dataset.noteId)
    return fetch(('http://localhost:3000/notes/' + event.target.parentElement.dataset.noteId),
      { method: 'DELETE' })
  }
})

// q('#notes').addEventListener('click', event => {
//     if(event.target.matches('.edit')) {
//         print(editNote)
//     }
// })
function editNote (noteText) {
  return fetch('http://localhost:3000/notes/' + event.target.parentElement.dataset.noteId),
  {
    method: 'PATCH',
    headers: { 'Content-type': 'application/json; charset=UTF-8'},
    body: JSON.stringify({ note: noteText.contentEditable, done: true })
      .then(response => response.json())
  }
}

q('#notes').addEventListener('click', event => {
  if (event.target.matches('.edit')) {
    print(editNote)
  }
})
