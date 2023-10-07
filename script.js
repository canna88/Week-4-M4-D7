// Identificazione elementi nel DOM e l'API
const searchResultDiv = document.querySelector(".search-results");
const sidecartDiv = document.querySelector(".nav");
const linkProducts = "https://striveschool-api.herokuapp.com/api/product/";
const requestOptionsGet = {
  method: "GET",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFmMTQxOWM3Mjg4NzAwMTg4N2ZmMWIiLCJpYXQiOjE2OTY1MzU1NzcsImV4cCI6MTY5Nzc0NTE3N30.7UuxGWrA8TVoFpfvg1a-mX0FXSBmdigPkRW-UNqC6h8",
    // Aggiungi altri header se necessario
  },
};
const searchInput = document.getElementById("search-input");
const reloadButton = document.getElementById("reload-button");
const cartHeader = document.querySelector(".cart-header");
const cartTitle = document.querySelector(".cart-title");

// Pulisco gli elemnti che mi interessano nel DOM
// searchResultDiv.innerHTML = "";
sidecartDiv.innerHTML = "";

// VARIABILI E ARRAYS
let totalProducts = [];
let visibleProducts = [];
let cartProducts = [];

// Ottieni la stringa JSON dal local storage con la chiave specifica
const cartProductsJSON = localStorage.getItem('cartProducts');
cartProducts = JSON.parse(cartProductsJSON);
// Ora cartProducts contiene i dati recuperati dal local storage
if (cartProducts) {
  refreshCart(cartProducts)
} else {
  cartProducts = []
}

//  FUNZIONI: DICHIARAZIONE

// Funzione per filtrare e visualizzare i libri in base alla ricerca dell'utente
function filterProducts() {
  const searchText = searchInput.value.toLowerCase(); // Testo inserito nell'input in minuscolo
  visibleProducts = totalProducts.filter((book) =>
    book.title.toLowerCase().includes(searchText)
  );
  searchResultDiv.innerHTML = ""; // Svuota la visualizzazione attuale dei libri
  loadProducts(visibleProducts); // Carica i libri filtrat
}

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

// Funzione per calcolare il prezzo totale dei prodotti nel carrello
function sumPrices(products) {
  const totalPrice = products.reduce((accumulator, currentProduct) => {
    return accumulator + currentProduct.price;
  }, 0);
  const formattedTotalPrice = totalPrice.toFixed(2);
  const totalPriceWithEuroSymbol = `€ ${formattedTotalPrice}`;
  return totalPriceWithEuroSymbol; // Arrotonda a due decimali e restituisce una stringa
}

function sumProducts(products) {
  const totalQuantity = products.reduce((accumulator, currentProduct) => {
    return accumulator + currentProduct.quantity;
  }, 0);

  return totalQuantity; // Arrotonda a due decimali e restituisce una stringa
}

// Funzione chiamata quando l'utente rimuove tutti i libri dal carrello
function rimuoviTutto() {
  sidecartDiv.innerHTML = "";
  console.log("Prima dell'eliminazione: ", cartProducts);
  cartProducts = [];
  console.log("Dopo l'eliminazione: ", cartProducts);
  console.log(cartProducts.length);

  if (cartProducts.length === 0) {
    cartHeader.innerHTML = "";
    cartTitle.innerText = "Your cart is empty";
  }
}

function addToCart(arrayCart, arrayTotal, productId, quantity) {
  // Verifica se il prodotto è già nel carrello
  const existingProduct = arrayCart.find(
    (product) => product._id === productId
  );

  if (existingProduct) {
    // Se il prodotto è già presente, incrementa la quantità
    existingProduct.quantity += quantity;
  } else {
    // Se il prodotto non è presente, aggiungilo al carrello con la quantità specificata
    let productToAdd = arrayTotal.find((product) => product._id === productId);
    productToAdd = { ...productToAdd, quantity };
    arrayCart.push(productToAdd);
  }
}

function acquista(button) {
  // Trova la card genitore
  const card = button.closest(".card-container");
  // Aggiorna la quantità nella card dell'homepage
  const quantityElement = card.querySelector(".quantity");
  const initialQuantity = parseInt(
    quantityElement.getAttribute("data-quantity")
  );
  let quantity = parseInt(quantityElement.textContent);
  // Trova l'ID del prodotto della card
  const productId = card.querySelector(".card").id;
  addToCart(cartProducts, totalProducts, productId, quantity);
  refreshCart(cartProducts);
  quantityElement.textContent = initialQuantity.toString(); // Reimposta la quantità a 1
}

function increaseQuantity(button) {
  // Trova la card genitore
  const card = button.closest(".card-container");
  // Aggiorna la quantità nella card dell'homepage
  const quantityElement = card.querySelector(".quantity");
  let quantity = parseInt(quantityElement.textContent);
  quantity += 1;
  quantityElement.textContent = quantity;
}

function decreaseQuantity(button) {
  // Trova la card genitore
  const card = button.closest(".card-container");
  // Aggiorna la quantità nella card dell'homepage
  const quantityElement = card.querySelector(".quantity");
  let quantity = parseInt(quantityElement.textContent);
  if (quantity > 1) {
    quantity -= 1;
    quantityElement.textContent = quantity;
  } else {
    alert("La quantità minima acquistabile è 1");
  }
}

function refreshCart(array) {
  if (array.length === 0) {
    cartHeader.innerHTML = "";
    cartTitle.innerText = "Your cart is empty";
    sidecartDiv.innerHTML = "";
  } else {
    cartTitle.innerText = "Cart";

    cartProducts.forEach((element) => {
      const { name, imgUrl, price, _id } = element;
      const formattedPrice = `€ ${price.toFixed(2)}`;
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

// Funzione chiamata quando l'utente rimuove un libro dal carrello
function rimuovi(button) {
  const productId = button.closest("li.card-cart").id; // Trova l'elemento <li> genitore
  const productIndex = cartProducts.findIndex(
    (product) => product._id === productId
  );

  if (productIndex !== -1) {
    // Rimuovi il prodotto dalla lista del carrello
    cartProducts.splice(productIndex, 1);
    refreshCart(cartProducts);
    console.log("rimuovi", cartProducts);
  }
}



// FUNZIONI: ESECUZIONE

getProducts(linkProducts); // Chiamiamo la funzione getProducts() per ottenere e visualizzare i libri iniziali dalla API
searchInput.addEventListener("input", filterProducts); // Aggiungiamo un ascoltatore di eventi all'input di ricerca per filtrare i libri in tempo reale
reloadButton.addEventListener("click", function () {
  // Aggiungiamo un ascoltatore di eventi al pulsante "Reload" per ricaricare i libri dalla API
  getProducts(linkProducts); // Chiamiamo nuovamente la funzione getProducts() per ricaricare i libri
  searchInput.value = ""; // Ripristiniamo il valore dell'input di ricerca a una stringa vuota
});

