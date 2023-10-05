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
const id = params.get("id")

const linkBooks = `https://striveschool-api.herokuapp.com/books/${id}`; 

const searchResultDiv = document.querySelector(".search-results");


function loadBookDetails(data) {
  const { title, img, price, category, asin } = data;
  const formattedPrice = `€ ${price.toFixed(2)}`;

  searchResultDiv.innerHTML = 
    /*html*/
    `
    <div class="card-container col-md-6">
    <div class="card">
        <img src="${img}" alt="Book Cover" class="center-image book-image">
        <div class="card-body">
            <h2 class="book-title">${title}</h2>
            <p class="book-category">${category}</p>
            <p class="book-description">Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p class="book-price">${formattedPrice}</p>
        </div>
    </div>
  </div>
  `
}

function getBooksDetals(link) {
  searchResultDiv.innerHTML = 
  /*html*/
  ` 
  <div class="spinner-border custom-spinner" role="status">
  <span class="sr-only">Loading...</span>
</div>
  `

  fetch(link)
    .then((response) => response.json())
    .then((data) => {
      loadBookDetails(data);
    })
    .catch((error) => {
      console.log(error.message);
    });
}

getBooksDetals(linkBooks)