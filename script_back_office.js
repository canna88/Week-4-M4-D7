// Identificazione elementi nel DOM e l'API
const searchResultDiv = document.querySelector(".search-results");
const linkProducts = "https://striveschool-api.herokuapp.com/api/product/";
const requestOptionsGet = {
  method: "GET",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFmMTQxOWM3Mjg4NzAwMTg4N2ZmMWIiLCJpYXQiOjE2OTY1MzU1NzcsImV4cCI6MTY5Nzc0NTE3N30.7UuxGWrA8TVoFpfvg1a-mX0FXSBmdigPkRW-UNqC6h8",
    // Aggiungi altri header se necessario
  },
};

const productList = document.querySelector(".product-list-container");

// Funzione per caricare i libri iniziali dalla API e visualizzarli
function loadProducts(bookList) {
  productList.innerHTML = "";

  bookList.forEach((element) => {
    const { name, price, _id } = element;
    const formattedPrice = `€ ${price.toFixed(2)}`;

    productList.innerHTML +=
      /*html*/
      `
    <div class="row d-flex align-items-center product">
      <div class="col-3 attribute-value">
          <span>${_id}</span>
      </div>
      <div class="col-4 attribute-value">
          <span>${name}</span>
      </div>
      <div class="col-3 attribute-value">
          <span>${formattedPrice}</span>
      </div>
      <div class="col-2">
          <button class="btn btn-primary">Edit</button>
          <button class="btn btn-danger">Delete</button>
      </div>
    </div>

   `;
  });
  // Dopo aver caricato il contenuto
}

// Funzione per ottenere i libri dalla API iniziale
function getProducts(link) {
  fetch(link, requestOptionsGet)
    .then((response) => response.json())
    .then((data) => {
      totalProducts = data;
      visibleProducts = data;
      loadProducts(data);
    })
    .catch((error) => {
      console.log(error.message);
    });
}

// FUNZIONI: ESECUZIONE

getProducts(linkProducts); // Chiamiamo la funzione getProducts() per ottenere e visualizzare i libri iniziali dalla API
