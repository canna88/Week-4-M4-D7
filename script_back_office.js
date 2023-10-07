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
const requestOptionsPost = {
  method: "POST",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFmMTQxOWM3Mjg4NzAwMTg4N2ZmMWIiLCJpYXQiOjE2OTY1MzU1NzcsImV4cCI6MTY5Nzc0NTE3N30.7UuxGWrA8TVoFpfvg1a-mX0FXSBmdigPkRW-UNqC6h8",
    // Aggiungi altri header se necessario
  },
};
const productList = document.querySelector(".product-list-container");

// Identificazione pulsanti nel DOM
const addButton = document.querySelector(".add-button");

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
          <button class="btn btn-primary edit-button-row">Edit</button>
          <button class="btn btn-danger delete-button-row">Delete</button>
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

async function addProduct() {
  event.preventDefault();
  const formAdd = document.querySelector("#form-add");

  const newProductData = JSON.stringify({
    name: formAdd.querySelector("#name").value,
    description: formAdd.querySelector("#description").value,
    brand: formAdd.querySelector("#brand").value,
    imageUrl: formAdd.querySelector("#imageUrl").value,
    price: formAdd.querySelector("#price").value,
  });

  console.log(newProductData);

  // Funzione per aggiungere il prodotto

  try {
    const response = await fetch(linkProducts, {
      requestOptionsPost,
      body: newProductData,
    });
    if (response.ok) {
      const responseData = await response.json();
      console.log("Prodotto aggiunto con successo:", responseData);
      getProducts(linkProducts)
    } else {
      console.error("Errore nella richiesta:", response.status, response.statusText);

    }
  } catch (error) {
    console.error("Errore nella richiesta:", error.message);
  }
}

// FUNZIONI: ESECUZIONE

getProducts(linkProducts); // Chiamiamo la funzione getProducts() per ottenere e visualizzare i libri iniziali dalla API
addButton.addEventListener("click", addProduct);
