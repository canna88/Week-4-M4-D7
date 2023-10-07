// Funzione per aprire/chiudere il carrello
function toggleCart() {
  document.querySelector(".sidecart").classList.toggle("open-cart");
  document
    .querySelector(".toggle-cart-button")
    .classList.toggle("toggle-cart-button-open");
  // Aggiungi e rimuovi la classe di rotazione al pulsante del carrello
  const cartButton = document.querySelector(".toggle-cart-button");
  cartButton.classList.add("rotate-center");
  setTimeout(() => {
    cartButton.classList.remove("rotate-center");
  }, 1000);
}

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const linkProduct = `https://striveschool-api.herokuapp.com/api/product/${id}`;
const searchResultDiv = document.querySelector(".search-results");
console.log(params)

const requestOptionsGet = {
  method: "GET",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFmMTQxOWM3Mjg4NzAwMTg4N2ZmMWIiLCJpYXQiOjE2OTY1MzU1NzcsImV4cCI6MTY5Nzc0NTE3N30.7UuxGWrA8TVoFpfvg1a-mX0FXSBmdigPkRW-UNqC6h8",
    // Aggiungi altri header se necessario
  },
};

function loadProductDetails(data) {
  const {name, img, price, description, _id} = data;
  const formattedPrice = `€ ${price.toFixed(2)}`;

  searchResultDiv.innerHTML =
    /*html*/
    `
    <div class="card-container col-6">
    <div class="card">
        <img src="${img}" alt="Book Cover" class="center-image book-image">
        <div class="card-body">
            <h2 class="book-title">${name}</h2>
            <p class="book-description">${description}</p>
            <p class="book-price">${formattedPrice}</p>
        </div>
    </div>
  </div>
  `;
}

function getProductsDetails(link) {
  searchResultDiv.innerHTML =
    /*html*/
    ` 
    <div class="spinner-border custom-spinner" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    `;

  fetch(link, requestOptionsGet)
    .then((response) => response.json())
    .then((data) => {
      loadProductDetails(data);
    })
    .catch((error) => {
      console.log(error.message);
    });
}
getProductsDetails(linkProduct);