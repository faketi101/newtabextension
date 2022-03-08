//fetch last notes from local storage
showNotes();


//All variables
let addBtn = document.getElementById('addBtn');
let search = document.getElementById('searchTxt');
const checkbox = document.getElementById('dark-checkbox');

//Event Listeners
search.addEventListener("input", searchOption);
addBtn.addEventListener("click", saveLocalStorage);
checkbox.addEventListener('change', darkMode);


//Save to local storage
function saveLocalStorage(e) {
      let addTxt = document.getElementById("addTxt");
      let addtitle = document.getElementById("addTitle");
      let notes = localStorage.getItem("notes");
      if (notes == null) {
            notesObj = [];
      }
      else {
            notesObj = JSON.parse(notes);
      }
      let myObj = {
            title: addtitle.value,
            text: addTxt.value
      }
      notesObj.push(myObj);
      localStorage.setItem("notes", JSON.stringify(notesObj));
      addTxt.value = '';
      addTitle.value = '';
      console.log(notesObj);
      showNotes()
};
//Show notes to the page
function showNotes() {
      let notes = localStorage.getItem("notes");
      if (notes == null) {
            notesObj = [];
      }
      else {
            notesObj = JSON.parse(notes);
      }
      let html = "";
      notesObj.forEach(function (element, index) {
            html += `
            <div class="card my-2 mx-2 noteCard" style="width: 18rem;">
            <div class="card-body note-dark dark-shadow">
            <h5 class="card-title note-dark">${index + 1}. ${element.title}</h5>
            <p class="card-text note-dark">${element.text}</p>
            <button id = "${index}" class="btn btn-danger" onclick = "deleteNote(this.id)" >Delete Note</button>
            </div>
            </div>
            `;
      });
      let notesElm = document.getElementById('notes');
      if (notesObj.length != 0) {
            notesElm.innerHTML = html;
      }
      else {
            notesElm.innerHTML = '<h1 class="note-dark title-nothing">Nothing to show notes : (</h1>';
      }
}

//Delete Notes from list and local storage
function deleteNote(index) {


      let notes = localStorage.getItem("notes");
      if (notes == null) {
            notesObj = [];
      }
      else {
            notesObj = JSON.parse(notes);
      }
      notesObj.splice(index, 1);
      localStorage.setItem("notes", JSON.stringify(notesObj));
      showNotes();
}

//Search notes by search bar
function searchOption() {
      let inputVal = search.value.toLowerCase();
      let noteCards = document.getElementsByClassName('noteCard');
      Array.from(noteCards).forEach(function (element) {
            let cardTxt = element.getElementsByTagName("p")[0].innerText;

            if (cardTxt.includes(inputVal)) {
                  element.style.display = "block";
            }
            else {
                  element.style.display = "none";
            }
      })
};

///Dark-mode sections

function darkMode() {
      document.body.classList.toggle('dark-mode');
      $('.todo').toggleClass('note-dark dark-shadow-1');
}