const myLibrary = [];

// function Book(title, author, pages, read){
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.read = read;
//     this.info = function(){
//         return `${this.title} by ${this.author}, ${this.pages} pages, `
//         + (this.read?`has been read.`:`not yet read`);
//     }
// }

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    info = () => {
        return `${this.title} by ${this.author}, ${this.pages} pages, `
                + (this.read?`has been read.`:`not yet read`);
    }
}

function addBookToLibrary(book) {
    createNewCard(book);
    myLibrary.push(book);
}

const deck = document.querySelector('.deck');
const dialog = document.querySelector('dialog');
document.querySelector('.new-book').addEventListener('click', () => dialog.showModal());
document.querySelector('dialog > button').addEventListener('click', () => dialog.close());
dialog.querySelector('form > button').addEventListener('click', submitBookFromForm);

function createNewCard(book) {
    let card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-index', myLibrary.length);
    card.innerHTML = `
    <h1>${book.title}</h1>
    <div>by ${book.author}</div>
    <div>Pages: ${book.pages}</div>
    <div>Read: <input type='checkbox'></div>
    <button>Remove</button>
    `;
    card.querySelector('input').addEventListener('click', () => updateReadStatus(card));
    card.querySelector('button').addEventListener('click', () => removeBookFromCard(card));
    deck.appendChild(card);
}

function removeBookFromCard(card) {
    let index = card.dataset.index;
    document.querySelector(`[data-index='${myLibrary.length - 1}']`).setAttribute('data-index', index);
    card.remove();
    myLibrary[index] = myLibrary[myLibrary.length - 1];
    myLibrary.pop();
}

function submitBookFromForm(event) {
    event.preventDefault();
    let book = new Book(
        document.getElementById('title').value,
        document.getElementById('author').value,
        document.getElementById('pages').value,
        document.getElementById('read').checked
    );
    addBookToLibrary(book);
    dialog.querySelector('form').reset();
    dialog.close();
}

function updateReadStatus(card) {
    myLibrary[card.dataset.index].read = card.querySelector('input[type="checkbox"]').checked;
}

addBookToLibrary(new Book('The Hobbit', 'J.R.R. Tolkien', '259', false));