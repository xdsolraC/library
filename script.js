const booksList = document.querySelector(".booksList")
const dialog = document.querySelector("dialog")
const form = document.querySelector("form")

let myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        // the constructor...
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    readToggle() {
        this.read = this.read === "notread" ? "read" : "notread";
    }
}

// Library functions

// Function to save books in library
function addBookToLibrary(book) {
    myLibrary.push(book)
}

// Function to save library in localStorage
function saveLibrary() {
    localStorage.setItem("library", JSON.stringify(myLibrary))
}

// Function to get library from localStorage
function getLibrary() {
    const libraryData = JSON.parse(localStorage.getItem("library"));
    if (libraryData) {
        myLibrary = libraryData.map(data => {
            const book = new Book(data.title, data.author, data.pages, data.read);
            return book;
        })
    }
}

// Function to create and append a BookCard
function createBookCard(book) {
    let { title, author, pages, read } = book;
    read = read == "notread" ? "not read" : "read";

    const bookElem = document.createElement("li")
    const bookCard = document.createElement("div")
    bookCard.classList.add("card")
    const cardContent = document.createElement("div")
    cardContent.classList.add("content")
    cardContent.innerHTML = `<div class="pill pill-top"><span id="card-pages">${pages}</span> Pages</div>
    <span id="card-title">${title}</span>
    <p class="card-text">By <span id="card-author">${author}</span></p>
    <hr>
    <span class="card-text">Read Status:</span>`

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("deleteBtn")
    deleteBtn.addEventListener("click", () => {
        const index = myLibrary.findIndex(b => b.title === book.title);
        if (index !== -1) {
            myLibrary.splice(index, 1);
            saveLibrary();
            displayBooks();
        }
    })

    // Read toggle button
    const readBtn = document.createElement("button");
    readBtn.classList.add("pill", "readToggle")
    readBtn.innerText = `${read}`
    readBtn.addEventListener("click", () => {
        book.readToggle();
        saveLibrary();
        displayBooks();
    })

    // Style read toggle button based on read status
    if (book.read === "read") {
        readBtn.style.backgroundColor = "#B64444";
        readBtn.style.color = "#fff";
        readBtn.style.border = "2px solid transparent";
    }

    bookCard.prepend(deleteBtn)
    cardContent.appendChild(readBtn)
    bookCard.appendChild(cardContent)
    bookElem.append(bookCard)
    booksList.appendChild(bookElem)
}

// Add some books by default, if they don't already exist
getLibrary();
if (myLibrary.length == 0) {
    addBookToLibrary(new Book("meditations", "marco aurelio", 233, "notread"));
    addBookToLibrary(new Book("confidence", "martin meadows", 75, "read"));
    addBookToLibrary(new Book("can't hurt me", "david goggins", 364, "read"));
    addBookToLibrary(new Book("writing to learn", "william zinsser", 272, "read"));
    saveLibrary();
}

// display created books
function displayBooks() {
    booksList.innerHTML = "";
    myLibrary.forEach((book) => {
        createBookCard(book);
    })
}

displayBooks()

// Dialog functions
const blurBg = document.querySelector('.blur-background');
function showDialog() {
    dialog.showModal();
    blurBg.classList.add("active");
}

function closeDialog() {
    dialog.close();
    blurBg.classList.remove("active");
}

// Remove dialog blur when closed with ESC 
document.addEventListener("keyup", () => {
    if (!dialog.open) {
        blurBg.classList.remove("active");
    }
});

// Add book from form when submitted 
form.addEventListener("submit", (event) => {
    event.preventDefault();
    closeDialog();
    const formData = new FormData(event.target);
    const book = new Book();
    formData.forEach((value, key) => {
        book[key] = value;
    });
    addBookToLibrary(book)
    saveLibrary();
    displayBooks()
    form.reset();
}) 