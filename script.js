const booksList = document.querySelector(".booksList")
const dialog = document.querySelector("dialog")
const form = document.querySelector("form")

let myLibrary = [];

function Book() {
    // the constructor...
}

function addBookToLibrary() {
    // do stuff here
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