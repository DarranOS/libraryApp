const library = (function () {
  const bookshelf = document.getElementById("bookshelf");
  const addButton = document.getElementById("addButton");

  let myLibrary = [
    // {
    //   id: 1,
    //   title: "The Hobbit",
    //   author: "J.R.R. Tolkien",
    //   pages: "295",
    //   status: "Not read",
    //   added: "12/03/2014",
    // },
    // {
    //   id: 2,
    //   title: "The Way of Kings",
    //   author: "Brandon Sanderson",
    //   pages: "463",
    //   status: "Read",
    //   added: "12/03/2014",
    // },
    // {
    //   id: 3,
    //   title: "The Deficit Myth",
    //   author: "Stephenie Kelton",
    //   pages: "301",
    //   status: "Not read",
    //   added: "12/03/2014",
    // },
  ];

  const refresh = () => {
    clearLibrary();

    myLibrary.forEach((book) => {
      const bookCard = document.createElement("div");
      bookCard.classList.add("readCard");
      bookCard.classList.remove("unreadCard");

      const bookId = document.createElement("p");
      bookId.textContent = book.id;

      const bookTitle = document.createElement("H3");
      bookTitle.textContent = book.title;

      const bookAuthor = document.createElement("H4");
      bookAuthor.textContent = book.author;

      const bookPages = document.createElement("p");
      bookPages.classList.add("pages");
      bookPages.textContent = book.pages + " pages";

      const bookAdded = document.createElement("p");
      bookAdded.classList.add("added");
      bookAdded.textContent = book.added;

      const bookStatus = document.createElement("p");
      bookStatus.textContent = book.status;

      const readButton = document.createElement("input");
      readButton.setAttribute("type", "button");
      readButton.setAttribute("id", book.id);
      readButton.setAttribute("value", book.status);
      readButton.setAttribute("class", "readButton");
      readButton.addEventListener("click", readBook);

      const removeButton = document.createElement("input");
      removeButton.setAttribute("type", "button");
      removeButton.setAttribute("id", book.id);
      removeButton.setAttribute("value", "Remove Book");
      removeButton.setAttribute("class", "removeButton");
      removeButton.addEventListener("click", removeBook);

      if (bookStatus.textContent === "Not read") {
        console.log(`${book.title}: ${bookStatus.textContent}`);
        bookCard.classList.toggle("unreadCard");
      }

      bookshelf.appendChild(bookCard);
      bookCard.appendChild(bookTitle);
      bookCard.appendChild(bookId);
      bookCard.appendChild(bookAuthor);
      bookCard.appendChild(bookPages);
      bookCard.appendChild(bookAdded);
      bookCard.appendChild(readButton);
      bookCard.appendChild(removeButton);
    });
  };

  const clearLibrary = () => {
    while (bookshelf.hasChildNodes()) {
      bookshelf.removeChild(bookshelf.childNodes[0]);
    }
  };

  const removeBook = (e) => {
    let index = myLibrary.map((o) => o.id).indexOf(Number(e.target.id));

    myLibrary.splice(index, 1);
    saveToLocal();
    refresh();
  };

  const readBook = (e) => {
    console.log(e.target);
    let index = myLibrary.map((o) => o.id).indexOf(Number(e.target.id));
    myLibrary[index].status =
      myLibrary[index].status === "Read" ? "Not read" : "Read";
    saveToLocal();
    refresh();
  };

  const addBook = () => {
    const newForm = document.createElement("div");
    bookshelf.appendChild(newForm);
    const titleField = document.createElement("input");
    titleField.setAttribute("type", "text");
    titleField.setAttribute("Id", "title");
    titleField.setAttribute("name", "title");
    titleField.setAttribute("class", "newBookForm");
    titleField.setAttribute("size", 30);
    titleField.setAttribute("placeholder", "Title");
    newForm.appendChild(titleField);

    const authorField = document.createElement("input");
    authorField.setAttribute("type", "text");
    authorField.setAttribute("Id", "author");
    authorField.setAttribute("name", "author");
    authorField.setAttribute("class", "newBookForm");
    authorField.setAttribute("size", 30);
    authorField.setAttribute("placeholder", "Author");
    newForm.appendChild(authorField);

    const pagesField = document.createElement("input");
    pagesField.setAttribute("type", "text");
    pagesField.setAttribute("name", "pages");
    pagesField.setAttribute("Id", "pages");
    pagesField.setAttribute("class", "newBookForm");
    pagesField.setAttribute("size", 30);
    pagesField.setAttribute("placeholder", "Pages");
    newForm.appendChild(pagesField);

    const statusField = document.createElement("input");
    statusField.setAttribute("type", "text");
    statusField.setAttribute("Id", "status");
    statusField.setAttribute("name", "status");
    statusField.setAttribute("class", "newBookForm");
    statusField.setAttribute("size", 30);
    statusField.setAttribute("placeholder", "Status");
    newForm.appendChild(statusField);

    const submitField = document.createElement("input");
    submitField.setAttribute("type", "submit");
    submitField.setAttribute("Id", "submit");
    submitField.setAttribute("value", "Submit");
    submitField.setAttribute("onclick", "submitBook()");
    newForm.appendChild(submitField);
    document.getElementById("submit").addEventListener("click", submitBook);

    console.log("Generate Form");
  };

  const submitBook = (e) => {
    let today = new Date();
    let day = `${today.getDate() < 10 ? "0" : ""}${today.getDate()}`;
    let month = `${today.getMonth() + 1 < 10 ? "0" : ""}${
      today.getMonth() + 1
    }`;
    let year = today.getFullYear();

    let book = {
      id: myLibrary.length + 1,
      title: document.getElementById("title").value,
      author: document.getElementById("author").value,
      pages: document.getElementById("pages").value,
      status: document.getElementById("status").value,
      added: `${day}/${month}/${year}`,
    };
    myLibrary.push(book);
    saveToLocal();
    refresh();
  };

  // const myTestObj = {
  //   name: "Darran",
  //   age: "39",
  // };

  // const testSave = () => {
  //   let testJSON = JSON.stringify(myTestObj);
  //   localStorage.setItem("test1", testJSON);
  //   console.log("saved");
  // };

  // const testGet = () => {
  //   let testJSONGet = JSON.parse(localStorage.getItem("test1"));
  //   console.dir(testJSONGet);
  // };

  const getFromLocal = () => {
    if (localStorage.getItem("myLibraryObj")) {
      console.log("Yessssss");
      let myLibraryDeJSON = JSON.parse(localStorage.getItem("myLibraryObj"));
      console.dir(myLibraryDeJSON);
      myLibrary = myLibraryDeJSON;
    } else {
      console.log("NNNNOOOOO");
    }
  };

  const saveToLocal = () => {
    let myLibraryJSON = JSON.stringify(myLibrary);
    localStorage.setItem("myLibraryObj", myLibraryJSON);
    console.log("saved");
  };

  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("addButton").addEventListener("click", addBook);
    getFromLocal();
    refresh();
  });

  //localstorage.clear();
})();
