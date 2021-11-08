let myLibrary = []

function Book(title, author, totalPages, readStatus) {
    this.title = title;
    this.author = author;
    this.totalPages = totalPages;
    this.readStatus = readStatus;
}

const addBook = document.getElementById('addBook')
const addBookForm = document.getElementById('addBookForm')
const exitBookForm = document.getElementById('exitBookForm')
const submitBook = document.getElementById('submitBook')
const inputs = document.querySelectorAll('.formInput')
const bookContainer = document.querySelector('.container')
const confirmInLibrary = document.getElementById('confirmInLibrary')
const popupConfirm = document.getElementById('popupConfirm')
let readStatus = document.getElementById('readStatus')
let checkRead = document.getElementsByClassName('checkRead')


addBook.addEventListener('click', function() {
    addBookForm.classList.add('active')
    overlay.classList.add('active')
})

exitBookForm.addEventListener('click', clearInputs)

readStatus.onclick = readStatusUpdate
checkRead = false

function readStatusUpdate() {
    if(checkRead) {
        checkRead = false
        readStatus.classList.remove('active')
    } else {
        checkRead = true
        readStatus.classList.add('active')
    }
}

submitBook.addEventListener('click', function() {
    getInputs()
})

function getInputs() {
    inputs.forEach(input => input.classList.remove("error"))
    let title = document.getElementById("title").value
    let author = document.getElementById("author").value
    let totalPages = document.getElementById("totalPages").value
    let readStatus = checkRead

    checkInputs(title, author, totalPages, readStatus)
}

function checkInputs(title, author, totalPages, readStatus) {

    let checkInputsArr = [title, author, totalPages]
    let controlArr = []

    for(let i = 0; i < checkInputsArr.length; i++) {
        if(!checkInputsArr[i] == '') {
            controlArr.push(checkInputsArr[i])
        }
    }

    if(controlArr.length < 3) {
        inputs.forEach(input =>  {
            if(input.value === '') {
                input.classList.add('error')  
            }
        })
    } else {
        addBookToLibrary(title, author, totalPages, readStatus)
    }
}

function addBookToLibrary(title, author, totalPages, readStatus) {
    let newBook = new Book(title, author, totalPages, readStatus)
    if(existsInLibrary(newBook)) {
        confirmInLibrary.classList.add('active')
        popupConfirm.addEventListener('click', function() {
            confirmInLibrary.classList.remove('active')
        })
        return
    }
    myLibrary.push(newBook)
    createCard()
    clearInputs()
}

function existsInLibrary(newBook) {
    return myLibrary.find(book => book.title === newBook.title)
}

function clearInputs() {
    inputs.forEach(input => input.value = '')
    checkRead = false
    readStatus.classList.remove('active')
    addBookForm.classList.remove('active')
    overlay.classList.remove('active')
}

function createCard() {
    clearBookCards()
    for (let books of myLibrary) {

        let newCard = document.createElement('div')
        let title = document.createElement('div')
        let author = document.createElement('div')
        let totalPages = document.createElement('div')
        let cardFooter = document.createElement('div')
        let toggleButton = document.createElement('button')
        let deleteButton = document.createElement('button')
        let id = myLibrary.indexOf(books)
        

        newCard.classList.add('bookCard')
        newCard.setAttribute('id', id)
        title.classList.add('title')
        author.classList.add('author')
        totalPages.classList.add('totalPages')
        cardFooter.classList.add('cardFooter')
        toggleButton.classList.add('toggleButton')
        deleteButton.classList.add('deleteButton')
        toggleButton.onclick = toggleRead
        deleteButton.onclick = deleteBook
        
        
        bookContainer.appendChild(newCard)
        newCard.appendChild(title)
        newCard.appendChild(author)
        newCard.appendChild(totalPages)
        newCard.appendChild(cardFooter)
        cardFooter.appendChild(toggleButton)
        cardFooter.appendChild(deleteButton)

        title.textContent = books.title
        author.textContent = 'by ' + books.author
        totalPages.textContent = 'Pages: ' + books.totalPages
        if(books.readStatus) {
            toggleButton.textContent = 'Read'
            toggleButton.classList.add('read')
        } else {
            toggleButton.textContent = 'Not Read'
            toggleButton.classList.add('notRead')
        }
    }

}

function clearBookCards() {
    while (bookContainer.lastChild) {
        bookContainer.removeChild(bookContainer.lastChild)
    }
}

function findBook(id) {
    let foundBook = id.target.parentNode.parentNode.id
    return myLibrary[foundBook]
}

function deleteBook(id) {
    let deleteBook = findBook(id)
    myLibrary = myLibrary.filter(book => book != deleteBook)
    createCard()
}

function toggleRead(id) {
    let bookStatus = findBook(id)
    if(bookStatus.readStatus) {
        bookStatus.readStatus = false
    } else {
        bookStatus.readStatus =  true
    }
    createCard()
}

addBookToLibrary("Richest Man in Babylon", "George S. Clason", "144", true)
addBookToLibrary("How to Win Friends and Influence People", "Dale Carnegie", "291", false)