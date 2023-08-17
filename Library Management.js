let searchInputEl = document.getElementById("searchInput");
let spinnerEl = document.getElementById("spinner");
let searchResultsEl = document.getElementById("searchResults");

function createAndAppendResult(result) {

    let {
        author,
        imageLink
    } = result;
    console.log(author);
    let colOne = document.createElement("div");
    colOne.classList.add("col-6");
    colOne.classList.add("card-1");


    let imgElOne = document.createElement("img");
    imgElOne.classList.add("img-card");
    imgElOne.src = imageLink;
    colOne.appendChild(imgElOne);

    let authorEl = document.createElement("p");
    authorEl.classList.add("pt-3");
    authorEl.textContent = author;
    colOne.appendChild(authorEl);
    searchResultsEl.appendChild(colOne);
}


function resultBooksCard(searchResults) {

    spinnerEl.classList.toggle("d-none");
    for (let result of searchResults) {
        createAndAppendResult(result);
    }



}

function resultBooks() {
    let options = {
        method: "GET"
    };

    fetch("https://apis.ccbp.in/book-store?title=" + searchInputEl.value, options)
        .then(function(res) {
            return res.json();
        })
        .then(function(jsonData) {

            let {
                search_results
            } = jsonData;
            console.log(search_results);
            resultBooksCard(search_results);
        });
}

searchInputEl.addEventListener("keydown", function(event) {
    if ("Enter" === event.key) {
        spinnerEl.classList.toggle("d-none");
        searchResultsEl.textContent = "";
        resultBooks();
    }
});