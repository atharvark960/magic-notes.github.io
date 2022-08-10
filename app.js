console.log(`This is a notes taking web app`);

shownotes();
let addNote = document.getElementById(`addNote`);

addNote.addEventListener("click", function (e) {
    let addText = document.getElementById(`addText`);
    let addTitle = document.getElementById(`addTitle`);
    console.log(addTitle);

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value,
        text: addText.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addText.value = "";
    addTitle.value = "";
    console.log(notesObj);
    // console.log(titlesObj);
    shownotes();
})

// Function to show notes

function shownotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `<div class="card mx-2 my-2 cardTitle" style="width: 16rem;">
                <div class="card-body" id="parent">                
                <div class="mb-3">
                    <h5> ${element.title} </h5>
                    <p> ${element.text} </p>
                </div>
                <a href="#" class="btn btn-primary" onclick="deleteNote(this.id)" id="${index}">Delete Note</a>
                </div>
            </div>`;

        let collection = document.getElementById(`collection`);
        if (notesObj.length != 0) {
            collection.innerHTML = html;
        }
        else {
            collection.innerHTML = `Nothing to show here!!`;
        }
    });
}

//Function to delete note

let Delete = document.getElementById(`delete`);
function deleteNote(index) {
    notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    shownotes();
}

// Function to filter notes when the user uses search

let searchText = document.getElementById(`searchText`);

searchText.addEventListener(`input`, function search() {
    let filterKey = searchText.value;
    filterKey = filterKey.toLowerCase();
    let cardNote = document.getElementsByClassName(`cardTitle`);
    Array.from(cardNote).forEach(function (element, index) {
        let noteValue = element.children[0].children[1].children[0].innerHTML;
        noteValue = noteValue.toLowerCase();
        if (noteValue.includes(filterKey)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
        console.log(noteValue);
    })
})