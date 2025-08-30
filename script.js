const myLibrary = [];
const container = document.querySelector(".container");
const addBtn = document.querySelector("#add-button");
const bookDialog = document.querySelector("#book-dialog");
const bookForm = document.querySelector(".book-form");
const cancel = document.querySelector("#cancel-btn")



addBtn.addEventListener("click",()=>{
    bookDialog.showModal();
});


bookForm.addEventListener("submit", (e) => {
    e.preventDefault();
  
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;
  
    addBookToLibrary(title, author, pages, read);
    displayBooks(myLibrary);
  
    bookDialog.close(); 
    bookForm.reset();
  });

  cancel.addEventListener("click", ()=>{
    bookDialog.close();
  });

function Book(title, author, pages, read, id){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id || crypto.randomUUID();
    this.info = function(){
        console.log(this.title , this.author, this.pages, this.read);
    }
}


function addBookToLibrary(title, author, pages, read){
    const book = new Book(title, author, pages, read)
    myLibrary.push(book);
    return book;
}


function displayBooks(array){
    container.innerHTML = "";
    array.forEach((book,index)=>{
        const card = document.createElement("div");
        card.classList.add("book-card");
        const title = document.createElement("h1");
        title.classList.add("title");
        title.textContent = `TITLE: ${book.title}`;
        const author = document.createElement("p");
        author.classList.add("content");
        author.textContent = `AUTHOR: ${book.author}`;
        const pages = document.createElement("p");
        pages.classList.add("content");
        pages.textContent = `NUMBER OF PAGES: ${book.pages}`;
        const read = document.createElement("p");
        read.classList.add("read");
        read.textContent = `DID YOU READ IT: ${book.read}`;
        const id = document.createElement("p");
        id.classList.add("content");
        id.textContent = `ID: ${book.id}`;
        const buttons = document.createElement("div");
        buttons.classList.add("styling-card-buttons");
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("card-buttons");
        deleteBtn.textContent = "Remove";
        deleteBtn.addEventListener("click", ()=>{
            myLibrary.splice(index,1);
            displayBooks(myLibrary);
        });
        const toggle = document.createElement('button');
        toggle.classList.add("card-buttons");
        toggle.textContent = "Read/Unread"
        toggle.addEventListener("click", ()=>{
            book.read = !book.read;
            displayBooks(myLibrary);
        });
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(read);
        card.appendChild(id);
        buttons.appendChild(deleteBtn);
        buttons.appendChild(toggle);
        card.appendChild(buttons);
        container.appendChild(card);
    });
}

addBookToLibrary("1984", "George Orwell", 328, true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, false);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 279, false);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, true);
displayBooks(myLibrary);