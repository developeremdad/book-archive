// global value declearation
const foundFiled = document.getElementById('found');
const inputFiled = document.getElementById('input-filed');
const displayContainer = document.getElementById('display-container');
const spinner = document.getElementById('spinner');

// get input value in search field
const getInputValue = () => {
    spinner.style.display = 'block';
    const inputValue = inputFiled.value;
    loadData(inputValue);
    inputFiled.value = '';
};

// load data when search anything 
const loadData = async (bookName) => {
    const url = `https://openlibrary.org/search.json?q=${bookName}`;
    const res = await fetch(url);
    const data = await res.json();
    spinner.style.display = 'none';
    const foundData = data.numFound;
    foundFiled.style.display = 'block';
    if (foundData === 0) {
        foundFiled.classList.remove('text-primary');
        foundFiled.classList.add('text-danger');
        foundFiled.innerText = `Book Not Found. invalid name/empty name. try again !`;
        displayContainer.innerHTML = '';
    }
    else {
        foundFiled.classList.remove('text-danger');
        foundFiled.classList.add('text-primary');
        foundFiled.innerText = `Book Found : ${foundData}`;
        displayData(data.docs);
    }
};

// Display data in container 
const displayData = (allBooks) => {
    const someBooks = allBooks.slice(0, 30);
    // display container clear
    displayContainer.innerHTML = '';
    someBooks.forEach(book => {

        // select all needed property 
        const bookName = book.title;
        const coverImg = book.cover_i;
        const authorName = book.author_name;
        const publishDate = book.first_publish_year;
        const publisher = book.publisher;

        // create a new div and set needed tags 
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div>
                <div class="card">
                    <img  src="https://covers.openlibrary.org/b/id/${coverImg}-M.jpg" class="card-img-top img-fluid" alt="'Image not found'+'${bookName}'">
                    <div class="card-body">
                        <h5 class="card-title "><b>Name:</b> ${typeof (bookName) === 'undefined' ? 'Not Found' : bookName}</h5>
                        <p class="card-text"><b>Publisher:</b> ${typeof (publisher) === 'undefined' ? 'Not Found' : publisher}</p>
                        <p class="card-text "><b>Writer:</b> ${authorName}</p>
                        <p><b>First Publish:</b> ${typeof (publishDate) === 'undefined' ? 'Not Found' : publishDate}</p>
                        <div>
                            <div class="d-grid gap-2">
                                <button class="btn btn-warning" type="button">Read Book</button>
                            </div>
                        </div>
                    
                    </div>
                </div>
            </div>
        `;
        displayContainer.appendChild(div);
    });
}

/* --------------------------------------------End javascript custom code ---------------------------------------------*/