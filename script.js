//  FUNZIONI: DICHIARAZIONE

//Salvare
function cartToLocalStorage(array) {
  const cartProductsJSON = JSON.stringify(array);
  localStorage.setItem("cartProducts", cartProductsJSON);
}

// Funzione per filtrare e visualizzare i libri in base alla ricerca dell'utente
function filterProducts() {
  const searchText = searchInput.value.toLowerCase(); // Testo inserito nell'input in minuscolo
  visibleProducts = totalProducts.filter((product) =>
    product.name.toLowerCase().includes(searchText)
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
    return accumulator + currentProduct.price * currentProduct.quantity;
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
  cartProducts = [];
  if (cartProducts.length === 0) {
    cartHeader.innerHTML = "";
    cartTitle.innerText = "Your cart is empty";
  }

  cartToLocalStorage(cartProducts);
}

// Funzione per caricare i libri iniziali dalla API e visualizzarli
function loadProducts(productsList) {
  searchResultDiv.innerHTML = "";

  productsList.forEach((element) => {
    const { name, imageUrl, brand, price, description, _id } = element;
    const formattedPrice = `€ ${price.toFixed(2)}`;

    searchResultDiv.innerHTML +=
      /*html*/
      `
      <div class="card-container">
      <div id="${_id}" class="card mb-5">
        <div class="d-flex justify-content-center align-items-center">
          <img
            src=${imageUrl}
            class="card-img-top" alt="Immagine del Prodotto 2">
        </div>
        <div class="card-body">
        <div>          
        <h5 class="card-title">${name}</h5>
          <h6 class="card-brand">${brand}</h6>
          </div>
          <div class="card-info">
            <p class="card-price">${formattedPrice}</p>
            <div class="quantity-control d-flex">
              <button class="btn btn-secondary" onclick="decreaseQuantity(this)">-</button>
              <div class="quantity d-flex justify-content-center align-items-center" data-quantity="1">1</div>
              <button class="btn btn-secondary" onclick="increaseQuantity(this)">+</button>
              <button class="btn btn-primary buy-button" onclick="acquista(this)" data-action="buy">Buy</button>

            </div>
            <a href="/pagina_prodotto.html?id=${_id}" class="btn btn-info mt-2 details-button"
              data-action="remove">Details</a>
          </div>
        </div>
      </div>
    </div>
   `;
  });
  // Dopo aver caricato il contenuto
}

// Funzione per ottenere i libri dalla API iniziale
async function getProducts(link) {
  searchResultDiv.innerHTML =
    /*html*/
    `
    <div class="spinner-border custom-spinner" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    `;

  try {
    const response = await fetch(link, requestOptionsGet);
    if (!response.ok) {
      throw new Error(
        `Errore nella richiesta: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    totalProducts = data;
    visibleProducts = data;
    loadProducts(data);
    refreshCart(cartProducts);
  } catch (error) {
    console.error(error.message);
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
  quantityElement.innerText = 1;
  refreshCart(cartProducts);
  quantityElement.textContent = "1"; // Reimposta la quantità a 1
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
    sidecartDiv.innerHTML = "";
    cartTitle.innerText = "Cart";
    console.log(array);
    array.forEach((element) => {
      const { name, imageUrl, price, _id, quantity } = element;
      const formattedPrice = `€ ${price.toFixed(2)}`;
      const formattedSubtotal = `€ ${(price * quantity).toFixed(2)}`;

      sidecartDiv.innerHTML +=
        /*html*/
        `
      <li id = "${_id}" class="card-cart nav-link d-flex flex-wrap flex-row my-3">
        <div class="col-4 p-0">
          <img class="cart-img img-fluid" src="${imageUrl}"
            alt="">
        </div>
        <div class="col-8 text-light d-flex align-items-start flex-column m-0">

          <div class="product-title mb-1 p-0">Name:
          <span class="products-title-val mb-3">${name}</span>
          </div>
          <div class="product-quantity mb-1 p-0">Quantity:
          <span class="products-quantity-val mb-3">${quantity}</span>
          </div>
          <div class="product-price mb-3 p-0">Price:
          <span class="products-price-val mb-3">${formattedPrice}</span>
          </div>
          <div class="product-subtotal mb-1 p-0">Sub-total:
          <span class="products-subtotal-val mb-3">${formattedSubtotal}</span>
          </div>
        </div>
        <button class="btn btn-danger mt-2 del-button" onclick="rimuovi(this)" data-action="remove">Rimuovi</button>
    </li>
    `;
    });
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
    const numeroProdotti = document.getElementById("products-value");
    const valoreCarrello = document.getElementById("products-total");
    numeroProdotti.innerText = sumProducts(array);
    valoreCarrello.innerText = sumPrices(array);

    const cartButton = document.querySelector(".toggle-cart-button");
    cartButton.classList.add("rotate-center");
    setTimeout(() => {
      cartButton.classList.remove("rotate-center");
    }, 600);
  }

  // Converte l'array del carrello e lo salva nel local storage
  cartToLocalStorage(array);
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
  }
}

// Identificazione elementi nel DOM e l'API
const searchResultDiv = document.querySelector(".search-results");
const sidecartDiv = document.querySelector(".nav");
const linkProducts = "https://striveschool-api.herokuapp.com/api/product/";
const requestOptionsGet = {
  method: "GET",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTM3ZmIwYTc3Y2RhYTAwMTQ2ZGYzODMiLCJpYXQiOjE2OTgxNjc1NjIsImV4cCI6MTY5OTM3NzE2Mn0.c1a_v_-jtk5AO1RmpBerwNPt3UTg6A3Zvyvkhe_-Rm8",
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
console.log(cartProducts);

// Ottieni la stringa JSON dal local storage con la chiave specifica
const cartProductsJSON = localStorage.getItem("cartProducts");

// Converti la stringa JSON in un array JavaScript
cartProducts = JSON.parse(cartProductsJSON);

// Ora cartProducts contiene i dati recuperati dal local storage
if (cartProducts) {
  refreshCart(cartProducts);
} else {
  cartProducts = [];
}

// FUNZIONI: ESECUZIONE

getProducts(linkProducts); // Chiamiamo la funzione getProducts() per ottenere e visualizzare i libri iniziali dalla API
searchInput.addEventListener("input", filterProducts); // Aggiungiamo un ascoltatore di eventi all'input di ricerca per filtrare i libri in tempo reale
reloadButton.addEventListener("click", function () {
  // Aggiungiamo un ascoltatore di eventi al pulsante "Reload" per ricaricare i libri dalla API
  getProducts(linkProducts); // Chiamiamo nuovamente la funzione getProducts() per ricaricare i libri
  searchInput.value = ""; // Ripristiniamo il valore dell'input di ricerca a una stringa vuota
});
