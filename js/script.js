//service worker
if ("serviceWorker" in navigator) {
  // register service worker
  navigator.serviceWorker.register("service-worker.js");
}

//global variables
var count = Number(window.localStorage.getItem('count'));
if (!count) {
    window.localStorage.setItem('count', '0');
};


//function that creates the notes
function createNote(title, body) {
    //hides the no notes text while creating elements
    document.querySelector('#no-notes').classList.add('hidden');
    //elements to be created
    let li = document.createElement('li');
    let a = document.createElement('a');
    let h2 = document.createElement('h2');
    let xButton = document.createElement('button');
    let p = document.createElement('p');
    //adding a delete class to the button
    xButton.classList.add('delete');
    //creating textnodes to be added to the button, h2 and p elements
    let textX = document.createTextNode('X');
    let h2Text = document.createTextNode(title);
    let pText = document.createTextNode(body);
    //appending each textnodes to a subparent element
    h2.appendChild(h2Text);
    p.appendChild(pText);
    xButton.appendChild(textX);
    //appending the parent elements to a parent element a and li
    a.appendChild(h2);
    a.appendChild(xButton);
    a.appendChild(p);
    a.setAttribute('href', '#');
    li.appendChild(a);
    //appending the entire element to the ul element with id of notes
    let notes = document.querySelector('#notes');
    notes.appendChild(li);
};

//function that clears the content of the form after a note has been created
function createNoteFromInput(event) {
    let body = document.getElementById('new-note-content').value;
    let title = document.getElementById('new-note-title').value;

    document.getElementById('new-note-content').value = '';
    document.getElementById('new-note-title').value = '';
    //incrementing count and storing in local storage
    count++
    window.localStorage.setItem('count', count);

    if(window.localStorage.getItem(title)){
        title += ' -copy';
    }
    window.localStorage.setItem(title, body)
    //calling the create note function
    createNote(title, body);
    event.preventDefault();
};
//function that triggers the removal of a note
function removeItem(e) {
    if (e.target.classList.contains('delete')) {
        let li = e.target.parentElement.parentElement;
        let ul = document.querySelector('#notes');

        ul.removeChild(li);
    }
    //decrements count
    count--
    window.localStorage.setItem('count', count);
    window.localStorage.removeItem(e.target.previousElementSibling.innerText);
    if (count < 1) {
        document.querySelector('#no-notes').classList = '';
    }
}
for (i = 0; i < count + 1; i++) {
    let title = window.localStorage.key(i);
    let body = window.localStorage.getItem(title);

    if (title !== 'count' && title) {
        createNote(title, body);
    }


}
//event  to trigger the remove item function
document.querySelector('#notes')
    .addEventListener('click', removeItem);

//serch funtionality
function searchIt() {
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById("notes");
  li = ul.getElementsByTagName('li');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}