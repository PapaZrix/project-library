function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

const library = (() => {
    const myLibrary = [];
    const bookList = document.querySelector("#book-list");
    const readButton = document.querySelector(".read-unread-btn");
    const form = document.querySelector(".form-container");

    const addBookToLibrary = (title, author, pages, read) => {
        const newBook = new Book(title, author, pages, read);
        myLibrary.push(newBook);
        displayBooks();
    }

    const displayBooks = () => {

        bookList.innerHTML = "";
    
        for (let i = 0; i < myLibrary.length; i++) {
            let newRow = bookList.insertRow(-1);
    
            let titleCell = newRow.insertCell(-1);
            titleCell.innerHTML = myLibrary[i].title;
    
            let authorCell = newRow.insertCell(-1);
            authorCell.innerHTML = myLibrary[i].author;
    
            let pagesCell = newRow.insertCell(-1);
            pagesCell.innerHTML = myLibrary[i].pages
            pagesCell.classList.add("center");
    
            let readCell = newRow.insertCell(-1);
            if (myLibrary[i].read === true) {
                readCell.innerHTML = `<button type="button" class="read-unread-btn">READ</button>`;
            } else {
                readCell.innerHTML = `<button type="button" class="read-unread-btn center">NOT READ</button>`;
            }
    
            let deleteCell = newRow.insertCell(-1);
            deleteCell.innerHTML = `<button type="button" class="delete-book-btn center">DELETE</button>`;
        }
    }

    const inputNewBook = (e) => {
        e.preventDefault();
        const title = document.querySelector("#title").value;
        const author = document.querySelector("#author").value;
        const pages = document.querySelector("#pages").value;
        const read = document.querySelector("#read-check").value;

        myLibrary.push(new Book(title, author, pages, read));
        displayBooks();
    }

    const handleClick = (e) => {
        // targetBook returns the book title > targetBook = Book.title
        const targetBook = e.target.parentNode.parentNode.childNodes[0].innerHTML;
        
        if (e.target.classList.contains("read-unread-btn")) {
            changeReadStatus(findBookIndex(targetBook));
            displayBooks();
        }

        if (e.target.classList.contains("delete-book-btn")) {
            deleteBook(findBookIndex(targetBook));
            displayBooks();
        }
    }

    const findBookIndex = (title) => {
        for (let book of myLibrary) {
            if (book.title == title) {
                return myLibrary.indexOf(book);
            }
        }
    }

    const changeReadStatus = (index) => {
        if (myLibrary[index].read == false) {
            myLibrary[index].read = true;
        } else {
            myLibrary[index].read = false;
        }
    }

    const deleteBook = (index) => {
        myLibrary.splice(index, 1);
    }


    bookList.addEventListener("click", handleClick);
    form.addEventListener("submit", inputNewBook);
    addBookToLibrary("Deep Work", "Cal Newport", 290, false);
    addBookToLibrary("Atomic Habits", "James Clear", 350, true);
})();
