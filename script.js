const booksList = document.querySelector(".booksList")
const dialog = document.querySelector("dialog")
const form = document.querySelector("form")

let myLibrary = [];

function Book(title, author, pages, read) {
    // the constructor...
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
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