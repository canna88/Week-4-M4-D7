const arrayElementi = [
  {
    "_id": "sdgergr",
    "name": "3310 cellphone",
    "description": "An unforgettable icon.",
    "brand": "Nokia",
    "imageUrl": "https://bit.ly/3ceXjRa",
    "price": 100,
    "userId": "admin",
    "createdAt": "2021-09-19T09:32:10.535Z",
    "updatedAt": "2021-09-19T09:32:10.535Z",
    "__v": 0
  },
  {
    "_id": "2dfeh3s",
    "name": "Smartphone X",
    "description": "The latest and greatest.",
    "brand": "Samsung",
    "imageUrl": "https://bit.ly/3cAweFJ",
    "price": 800,
    "userId": "user123",
    "createdAt": "2021-09-20T15:45:22.123Z",
    "updatedAt": "2021-09-20T15:45:22.123Z",
    "__v": 0
  },
  {
    "_id": "f34g5dh",
    "name": "E-Book Reader",
    "description": "Read your favorite books digitally.",
    "brand": "Amazon",
    "imageUrl": "https://bit.ly/3nR2YK9",
    "price": 150,
    "userId": "user456",
    "createdAt": "2021-09-21T12:18:05.789Z",
    "updatedAt": "2021-09-21T12:18:05.789Z",
    "__v": 0
  },
  {
    "_id": "gsd8h7f",
    "name": "Wireless Headphones",
    "description": "Enjoy music without the cords.",
    "brand": "Sony",
    "imageUrl": "https://bit.ly/3AlnhtP",
    "price": 120,
    "userId": "user789",
    "createdAt": "2021-09-22T08:57:30.222Z",
    "updatedAt": "2021-09-22T08:57:30.222Z",
    "__v": 0
  },
  {
    "_id": "p3j8sd9",
    "name": "Gaming Console",
    "description": "Experience the latest games.",
    "brand": "Microsoft",
    "imageUrl": "https://bit.ly/3yTrJuj",
    "price": 400,
    "userId": "user1011",
    "createdAt": "2021-09-23T17:29:15.654Z",
    "updatedAt": "2021-09-23T17:29:15.654Z",
    "__v": 0
  }
];



// Identificazione elementi nel DOM e l'API
const searchResultDiv = document.querySelector(".search-results");
const sidecartDiv = document.querySelector(".nav");
const linkProducts = "https://striveschool-api.herokuapp.com/books";
const searchInput = document.getElementById("search-input");
const reloadButton = document.getElementById("reload-button");
const cartHeader = document.querySelector(".cart-header");
const cartTitle = document.querySelector(".cart-title");

// Pulisco gli elemnti che mi interessano nel DOM
searchResultDiv.innerHTML = "";
sidecartDiv.innerHTML = "";

// VARIABILI E ARRAYS
let totalProducts = [];
let visibleProducts = [];
let deleteProducts = [];
let cartProducts = [];

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

// Funzione chiamata quando l'utente clicca sul pulsante "Acquista" su un libro
function acquista(button) {
  const card = button.closest(".card"); // Trova la card genitore
  const asinCode = card.querySelector(".book-asin").textContent;
  const libroTrovato = cartProducts.find((libro) => libro.asin === asinCode);

  if (libroTrovato) {
    alert(`Il libro è già presente nel carrello.`);
  } else {
    const nuovoLibroCart = visibleProducts.find(
      (libro) => libro.asin === asinCode
    );

    if (cartProducts.length === 0) {
      cartTitle.innerText = "Cart";
      cartHeader.innerHTML =
        /*html*/
        `
        <button class="btn btn-warning my-3 del-all-button" onclick="rimuoviTutto()" data-action="remove">Rimuovi
          tutto</button>

        <div class="cart-results my-3">
        <div class="text-light h6 text-left mx-3">Final value:
        <span id="products-total"></span>
      </div>
          <div class="text-light h6 text-left mx-3">Number of products:
            <span id="products-value"></span>
            
          </div>

        </div>
      `;
    }

    cartProducts.push(nuovoLibroCart);

    // Aggiungi e rimuovi la classe di rotazione al pulsante del carrello
    const cartButton = document.querySelector(".toggle-cart-button");
    cartButton.classList.add("rotate-center");
    setTimeout(() => {
      cartButton.classList.remove("rotate-center");
    }, 600);

    console.log("aggiungi", cartProducts);
    
    sidecartDiv.innerHTML +=
      /*html*/
      `
      <li class="card-cart nav-link d-flex flex-wrap flex-row my-3">
      <div class="col-4 p-0">
        <img class="cart-img img-fluid" src=${nuovoLibroCart.img}
          alt="">
      </div>
      <div class="col-8 text-light d-flex align-items-start flex-column m-0">

        <div class="product-title m-0 p-0">Title:</div>
        <span class="products-title-val mb-3">${nuovoLibroCart.title}</span>

        <div class="product-quantity m-0 p-0">Quantity:</div>
        <span class="products-quantity-val mb-3">1</span>

        <div class="product-price m-0 p-0">Price:</div>
        <span class="products-price-val mb-3">€ ${nuovoLibroCart.price}</span>
      </div>
      <p class="book-asin d-none">${nuovoLibroCart.asin}</p>
      <button class="btn btn-danger mt-2 del-button" onclick="rimuovi(this)" data-action="remove">Rimuovi</button>
    </li>
    `;
  }

  const numeroProdotti = document.getElementById("products-value");
  const valoreCarrello = document.getElementById("products-total");
  numeroProdotti.innerText = cartProducts.length;
  valoreCarrello.innerText = sumPrices(cartProducts);
}

// Funzione chiamata quando l'utente rimuove un libro dal carrello
function rimuovi(button) {
  const liElement = button.closest("li"); // Trova l'elemento <li> genitore
  const asinCode = liElement.querySelector(".book-asin").textContent;
  cartProducts = cartProducts.filter((item) => item.asin !== asinCode);
  liElement.remove();

  console.log("rimuovi", cartProducts);

  const allCard = document.querySelectorAll(".card");

  for (const card of allCard) {
    const cardAsin = card.querySelector(".book-asin").textContent; // Ottieni il testo del .book-asin
    if (cardAsin === asinCode) {
      card.classList.remove("buy-card");
    }
  }
  console.log("Il totale del carrello è: ", sumPrices(cartProducts));
  const numeroProdotti = document.getElementById("products-value");
  const valoreCarrello = document.getElementById("products-total");
  numeroProdotti.innerText = cartProducts.length;
  valoreCarrello.innerText = sumPrices(cartProducts);

  if (cartProducts.length === 0) {
    cartHeader.innerHTML = "";
    cartTitle.innerText = "Your cart is empty";
  }
}

// Funzione chiamata quando l'utente rimuove tutti i libri dal carrello
function rimuoviTutto() {
  sidecartDiv.innerHTML = "";
  console.log("Prima elimina tutti: ", cartProducts);
  cartProducts = [];
  console.log("Dopo elimina tutti: ", cartProducts);
  const allCard = document.querySelectorAll(".card");

  console.log("Il totale del carrello è: ", sumPrices(cartProducts));
  const numeroProdotti = document.getElementById("products-value");
  const valoreCarrello = document.getElementById("products-total");
  numeroProdotti.innerText = cartProducts.length;
  valoreCarrello.innerText = sumPrices(cartProducts);

  console.log(cartProducts.length);

  if (cartProducts.length === 0) {
    cartHeader.innerHTML = "";
    cartTitle.innerText = "Your cart is empty";
  }
}


// Funzione per caricare i libri iniziali dalla API e visualizzarli
function loadProducts(bookList) {
  searchResultDiv.innerHTML = "";

  bookList.forEach((element) => {
    const { title, img, price, category, asin } = element;
    const formattedPrice = `€ ${price.toFixed(2)}`;

    searchResultDiv.innerHTML +=
      /*html*/
      `
    <div class = "card-container">
      <div class="card mb-5">
          <img src=${img} class="card-img-top"
            alt="Immagine del Libro">
          <div class="card-body">
          <h5 class="card-title book-title">${title}</h5>
          <p class="card-text book-author">${category}</p>
            <div class="m-0 card-info">

              <p class="card-text book-price">${formattedPrice}</p>
              <p class="book-asin d-none">${asin}</p>

              <button class="btn btn-primary mt-2 buy-button" onclick="acquista(this)" data-action="buy">Buy</button>
              <a href="/pagina_prodotto.html?id=${asin}" class="btn btn-info mt-2 details-button" data-action="remove">Details</a>

              </div>
          </div>
        </div>
    </div>
   `;
  });
  // Dopo aver caricato il contenuto
}

// Funzione per ottenere i libri dalla API iniziale
function getProducts(link) {
  fetch(link)
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
searchInput.addEventListener("input", filterProducts); // Aggiungiamo un ascoltatore di eventi all'input di ricerca per filtrare i libri in tempo reale
reloadButton.addEventListener("click", function () { // Aggiungiamo un ascoltatore di eventi al pulsante "Reload" per ricaricare i libri dalla API
  getProducts(linkProducts);   // Chiamiamo nuovamente la funzione getProducts() per ricaricare i libri
  searchInput.value = ""; // Ripristiniamo il valore dell'input di ricerca a una stringa vuota
});
