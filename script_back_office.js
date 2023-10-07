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
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFmMTQxOWM3Mjg4NzAwMTg4N2ZmMWIiLCJpYXQiOjE2OTY1MzU1NzcsImV4cCI6MTY5Nzc0NTE3N30.7UuxGWrA8TVoFpfvg1a-mX0FXSBmdigPkRW-UNqC6h8",
    // Aggiungi altri header se necessario
  },
};

const requestOptionsPut = {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFmMTQxOWM3Mjg4NzAwMTg4N2ZmMWIiLCJpYXQiOjE2OTY1MzU1NzcsImV4cCI6MTY5Nzc0NTE3N30.7UuxGWrA8TVoFpfvg1a-mX0FXSBmdigPkRW-UNqC6h8",
    // Aggiungi altri header se necessario
  },
};

const requestOptionsDelete = {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFmMTQxOWM3Mjg4NzAwMTg4N2ZmMWIiLCJpYXQiOjE2OTY1MzU1NzcsImV4cCI6MTY5Nzc0NTE3N30.7UuxGWrA8TVoFpfvg1a-mX0FXSBmdigPkRW-UNqC6h8",
    // Aggiungi altri header se necessario
  },
};

const productList = document.querySelector(".product-list-container");

// Identificazione pulsanti nel DOM
const addButton = document.querySelector(".add-button");
const updateButton = document.querySelector(".update-button");
const cancelButton = document.querySelector(".cancel-button");

// Identifico nel DOM gli elementi da aggiungere
const formAdd = document.querySelector("#form-add");
const nameToAdd = formAdd.querySelector("#name");
const descriptionToAdd = formAdd.querySelector("#description");
const brandToAdd = formAdd.querySelector("#brand");
const imageUrlToAdd = formAdd.querySelector("#imageUrl");
const priceToAdd = formAdd.querySelector("#price");

// Identifico nel DOM gli elementi da aggiornare
const formUpdate = document.querySelector("#form-update");
const idToUpdate = formUpdate.querySelector("#update-id");
const nameToUpdate = formUpdate.querySelector("#update-name");
const descriptionToUpdate = formUpdate.querySelector("#update-description");
const brandToUpdate = formUpdate.querySelector("#update-brand");
const imageUrlToUpdate = formUpdate.querySelector("#update-imageUrl");
const priceToUpdate = formUpdate.querySelector("#update-price");
const userIdToUpdate = formUpdate.querySelector("#update-userId");
const createdAtToUpdate = formUpdate.querySelector("#update-createdAt");
const updatedAtToUpdate = formUpdate.querySelector("#update-updatedAt");

// Identifico nel DOM gli elementi da eliminare
const formDelete = document.querySelector("#form-delete");
const idToDelete = formDelete.querySelector("#delete-id");
const userIdToDelete = formDelete.querySelector("#delete-userId");
const nameToDelete = formDelete.querySelector("#delete-name");
const descriptionToDelete = formDelete.querySelector("#delete-description");
const brandToDelete = formDelete.querySelector("#delete-brand");
const imageUrlToDelete = formDelete.querySelector("#delete-imageUrl");
const priceToDelete = formDelete.querySelector("#delete-price");
const createdAtToDelete = formDelete.querySelector("#delete-createdAt");
const updatedAtToDelete = formDelete.querySelector("#delete-updatedAt");

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
      <div class="col-3 attribute-value product-id">
          <span>${_id}</span>
      </div>
      <div class="col-4 attribute-value">
          <span>${name}</span>
      </div>
      <div class="col-3 attribute-value">
          <span>${formattedPrice}</span>
      </div>
      <div class="col-2">
          <button class="btn btn-primary edit-button" >Edit</button>
          <button class="btn btn-danger delete-button">Delete</button>
      </div>
    </div>

   `;
  });
  // Dopo aver caricato il contenuto
}

// Funzione per ottenere i libri dalla API iniziale
async function getProducts(link) {
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

    // Identifico gli edit e delete buttons nel DOM
    document.querySelectorAll(".edit-button").forEach((button) => {
      button.addEventListener("click", editButtonFunction);
    });
    document.querySelectorAll(".delete-button").forEach((button) => {
      button.addEventListener("click", deleteButtonFunction);
    });

  } catch (error) {
    console.error(error.message);
  }
}

async function editButtonFunction(event) {
  // Evito il caricamento automatico della pagina
  event.preventDefault();

  const button = event.target;
  const product = button.closest(".product");
  const productId = product.querySelector(".product-id span").textContent;
  console.log("Pulsante Edit cliccato");
  console.log(productId);

  // Controllo che l'ID sia presente nei prodotti aggiornati
  try {
    const response = await fetch(
      `${linkProducts}` + `${productId}`,
      requestOptionsGet
    );
    if (!response.ok) {
      throw new Error(
        `Errore nella richiesta: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    console.log(data);

    const {
      _id,
      name,
      description,
      brand,
      imageUrl,
      price,
      userId,
      createdAt,
      updatedAt,
    } = data;

    idToUpdate.value = _id;
    nameToUpdate.value = name;
    descriptionToUpdate.value = description;
    brandToUpdate.value = brand;
    imageUrlToUpdate.value = imageUrl;
    priceToUpdate.value = price;
    userIdToUpdate.value = userId;
    createdAtToUpdate.value = createdAt;
    updatedAtToUpdate.value = updatedAt;

  } catch (error) {
    console.error(error.message);
    // Notifica l'utente che il prodotto è stato eliminato o non è stato trovato
    alert("Il prodotto è stato eliminato o non è stato trovato.");
  }
}

async function updateButtonFunction(event) {
  // Evito il caricamento automatico della pagina
  event.preventDefault();

  const productId = idToUpdate.value;
  console.log(productId)
  // Li aggiungo ad un oggetto e lo trasformo in stringa
  const newProductData = JSON.stringify({
    name: nameToUpdate.value,
    description: descriptionToUpdate.value,
    brand: brandToUpdate.value,
    imageUrl: imageUrlToUpdate.value,
    price: priceToUpdate.value,
  });

  console.log(newProductData);

  try {
    // Prima richiesta per controllare che l'ID sia presente nei prodotti aggiornati
    const checkResponse = await fetch(
      `${linkProducts}${productId}`,
      requestOptionsGet
    );
    if (!checkResponse.ok) {
      throw new Error(
        `Errore nella richiesta: ${checkResponse.status} ${checkResponse.statusText}`
      );
    }

    // Seconda richiesta per effettuare l'aggiornamento
    const updateResponse = await fetch(`${linkProducts}${productId}`, {
      ...requestOptionsPut,
      body: newProductData,
    });

    if (updateResponse.ok) {
      const responseData = await updateResponse.json();
      console.log("Prodotto aggiornato con successo:", responseData);
      alert("Prodotto aggiornato con successo!");
      getProducts(linkProducts);

      // Azzero i valori del form
      idToUpdate.value = "";
      nameToUpdate.value = "";
      descriptionToUpdate.value = "";
      brandToUpdate.value = "";
      imageUrlToUpdate.value = "";
      priceToUpdate.value = "";
      userIdToUpdate.value = "";
      createdAtToUpdate.value = "";
      updatedAtToUpdate.value = "";
    } else {
      console.error(
        "Errore nella richiesta:",
        updateResponse.status,
        updateResponse.statusText
      );
    }
  } catch (error) {
    console.error("Errore nella richiesta:", error.message);
  }
}

async function cancelButtonFunction(event) {
    // Evito il caricamento automatico della pagina
    event.preventDefault();

    const productId = idToDelete.value;

    try {
      // Prima richiesta per controllare che l'ID sia presente nei prodotti aggiornati
      const checkResponse = await fetch(
        `${linkProducts}${productId}`,
        requestOptionsGet
      );
      if (!checkResponse.ok) {
        throw new Error(
          `Errore nella richiesta: ${checkResponse.status} ${checkResponse.statusText}`
        );
      }
  
      // Seconda richiesta per effettuare l'eliminazione
      const updateResponse = await fetch(`${linkProducts}${productId}`, {
        ...requestOptionsDelete
      });
  
      if (updateResponse.ok) {
        const responseData = await updateResponse.json();
        console.log("Prodotto eliminato con successo:", responseData);
        alert("Prodotto eliminato con successo!");
        getProducts(linkProducts);
  
        // Azzero i valori del form
        idToDelete.value = "";
        nameToDelete.value = "";
        descriptionToDelete.value = "";
        brandToDelete.value = "";
        imageUrlToDelete.value = "";
        priceToDelete.value = "";
        userIdToDelete.value = "";
        createdAtToDelete.value = "";
        updatedAtToDelete.value = "";
      } else {
        console.error(
          "Errore nella richiesta:",
          updateResponse.status,
          updateResponse.statusText
        );
      }
    } catch (error) {
      console.error("Errore nella richiesta:", error.message);
    }
}

async function deleteButtonFunction(event) {
  // Evito il caricamento automatico della pagina
  event.preventDefault();

  const button = event.target;
  const product = button.closest(".product");
  const productId = product.querySelector(".product-id span").textContent;
  console.log("Pulsante Delete cliccato");
  console.log(productId);

  // Controllo che l'ID sia presente nei prodotti aggiornati
  try {
    const response = await fetch(
      `${linkProducts}` + `${productId}`,
      requestOptionsGet
    );
    if (!response.ok) {
      throw new Error(
        `Errore nella richiesta: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    console.log(data);

    const {
      _id,
      name,
      description,
      brand,
      imageUrl,
      price,
      userId,
      createdAt,
      updatedAt,
    } = data;

    // Imposto i valori dei campi con i dati del prodotto
    idToDelete.value = _id;
    userIdToDelete.value = userId;
    nameToDelete.value = name;
    descriptionToDelete.value = description;
    brandToDelete.value = brand;
    imageUrlToDelete.value = imageUrl;
    priceToDelete.value = price;
    createdAtToDelete.value = createdAt;
    updatedAtToDelete.value = updatedAt;
  } catch (error) {
    console.error(error.message);
    // Notifica l'utente che il prodotto è stato eliminato o non è stato trovato
    alert("Il prodotto è stato eliminato o non è stato trovato.");
  }
}

async function addProduct() {
  // Evito il caricamento automatico della pagina
  event.preventDefault();

 // Li aggiungo ad un oggetto e lo trasformo in stringa
  const newProductData = JSON.stringify({
    name: nameToAdd.value,
    description: descriptionToAdd.value,
    brand: brandToAdd.value,
    imageUrl: imageUrlToAdd.value,
    price: priceToAdd.value,
  });

  console.log(newProductData);

  // Funzione per aggiungere il prodotto
  try {
    const response = await fetch(linkProducts, {
      ...requestOptionsPost,
      body: newProductData,
    });
    if (response.ok) {
      const responseData = await response.json();
      console.log("Prodotto aggiunto con successo:", responseData);
      alert("Prodotto aggiunto con successo!");
      getProducts(linkProducts);

      // Azzero i valori del form
      nameToAdd.value = "";
      descriptionToAdd.value = "";
      brandToAdd.value = "";
      imageUrlToAdd.value = "";
      priceToAdd.value = "";
    } else {
      console.error(
        "Errore nella richiesta:",
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    console.error("Errore nella richiesta:", error.message);
  }
}

// async function suggestImage(event) {
//   const accessKey = "28jmzXXtV1tHdDkUgVSpV44dBtQBV4wfrevh04FubOxgqBGfZhnDSpgl";
//   const linkImage = "https://api.pexels.com/v1/search?query=";
//   const headerAuthorizationImage = { headers: { Authorization: `${accessKey}` } };

//   let page = 1;

//   const inputName = document.getElementById("name");
//   const productName = inputName.value;

//   try {
//     const response = await fetch(
//       `${linkImage}${productName}&page=${page}`,
//       headerAuthorizationImage
//     );
//     if (!response.ok) {
//       throw new Error(
//         `Errore nella richiesta: ${response.status} ${response.statusText}`
//       );
//     }
//     const data = await response.json();

//     if (data.photos && data.photos.length > 0) {
//       const suggestedImageUrl = data.photos[0].src.original;
//       const imageUrlInput = document.getElementById("imageUrl");
//       imageUrlInput.value = suggestedImageUrl; // Imposta l'URL dell'immagine nell'input
//     } else {
//       console.error("Nessuna immagine trovata per questo prodotto.");
//     }
//   } catch (error) {
//     console.error(error.message);
//   }
// }



// FUNZIONI: ESECUZIONE

getProducts(linkProducts); // Chiamiamo la funzione getProducts() per ottenere e visualizzare i libri iniziali dalla API
updateButton.addEventListener("click",updateButtonFunction)
cancelButton.addEventListener("click",cancelButtonFunction)

// document.querySelectorAll(".suggest-image-button").forEach((button) => {
//   button.addEventListener("click", suggestImage);
// });