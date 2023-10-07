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
const sidecartDiv = document.querySelector(".nav");
let cartProducts = [];
// Ottieni la stringa JSON dal local storage con la chiave specifica
const cartProductsJSON = localStorage.getItem("cartProducts");
cartProducts = JSON.parse(cartProductsJSON);
// Ora cartProducts contiene i dati recuperati dal local storage
if (cartProducts) {
  refreshCart(cartProducts);
} else {
  cartProducts = [];
}


function refreshCart(array) {
  if (array.length === 0) {
    cartHeader.innerHTML = "";
    cartTitle.innerText = "Your cart is empty";
    sidecartDiv.innerHTML = "";
  } else {
    cartTitle.innerText = "Cart";

    cartProducts.forEach((element) => {
      const { name, imgUrl, price, _id, quantity } = element;
      const formattedPrice = `€ ${price.toFixed(2)}`;
      const formattedSubtotal = `€ ${(price.toFixed(2)) * quantity}`;


      sidecartDiv.innerHTML +=
        /*html*/
        `
      <li id = "${_id}" class="card-cart nav-link d-flex flex-wrap flex-row my-3">
        <div class="col-4 p-0">
          <img class="cart-img img-fluid" src=${imgUrl}
            alt="">
        </div>
        <div class="col-8 text-light d-flex align-items-start flex-column m-0">

          <div class="product-title m-0 p-0">Name:</div>
          <span class="products-title-val mb-3">${name}</span>

          <div class="product-quantity m-0 p-0">Quantity:</div>
          <span class="products-quantity-val mb-3">${quantity}</span>

          <div class="product-price m-0 p-0">Price:</div>
          <span class="products-price-val mb-3">€ ${formattedPrice}</span>
        
          <div class="product-price m-0 p-0">Sub-total:</div>
          <span class="products-price-val mb-3">€ ${formattedSubtotal}</span>

        </div>
        <button class="btn btn-danger mt-2 del-button" onclick="rimuovi(this)" data-action="remove">Rimuovi</button>
    </li>
    `;
    });

    const numeroProdotti = document.getElementById("products-value");
    const valoreCarrello = document.getElementById("products-total");
    numeroProdotti.innerText = sumProducts(cartProducts);
    valoreCarrello.innerText = sumPrices(cartProducts);
    cartHeader.innerHTML =
      /*html*/
      `
        <button class="btn btn-warning my-3 del-all-button" onclick="rimuoviTutto()" data-action="remove">Rimuovi tutto</button>

        <div class="cart-results my-3">
        
          <div class="text-light h6 text-left mx-3">Final value:
            <span id="products-total"></span>
          </div>

          <div class="text-light h6 text-left mx-3">Number of products:
            <span id="products-value"></span>
          </div>

        </div>
      `;

    const cartButton = document.querySelector(".toggle-cart-button");
    cartButton.classList.add("rotate-center");
    setTimeout(() => {
      cartButton.classList.remove("rotate-center");
    }, 600);
  }

  // Converte l'array del carrello e lo salva nel local storage
  const cartProductsJSON = JSON.stringify(cartProducts);
  localStorage.setItem("cartProducts", cartProductsJSON);
}
const requestOptionsGet = {
  method: "GET",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFmMTQxOWM3Mjg4NzAwMTg4N2ZmMWIiLCJpYXQiOjE2OTY1MzU1NzcsImV4cCI6MTY5Nzc0NTE3N30.7UuxGWrA8TVoFpfvg1a-mX0FXSBmdigPkRW-UNqC6h8",
    // Aggiungi altri header se necessario
  },
};

function loadProductDetails(data) {
  const {_id,name, imgSrc, price, description} = data;
  const formattedPrice = `€ ${price.toFixed(2)}`;

  searchResultDiv.innerHTML =
    /*html*/
    `
  <div class="card-container-details-page col-12">
    <div class="card card-details">
      <div class="w-100 d-flex justify-content-center align-items-center">
        <img src="${imgSrc}" alt="Product Image" class="center-image product-image">
      </div>
      <div class="card-body">
        <h2 class="product-id">Product ID: ${_id}</h2>
        <h2 class="product-title">Name: ${name}</h2>
        <p class="product-description">${description}</p>
        <p class="product-price">${formattedPrice}</p>
      </div>
    </div>
  </div>
  `;
}

function getProductsDetails(link) {
  // // searchResultDiv.innerHTML =
    // // /*html*/
    // // ` 
    // // <div class="spinner-border custom-spinner" role="status">
    // //   <span class="sr-only">Loading...</span>
    // // </div>
    // // `;

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