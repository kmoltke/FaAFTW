/* function loadProductData() {
  fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        return data; // this wont work
    });
} */

async function loadProductDataAsync() {
  const response = await fetch("./vinyls.json");
  return response.json();
}

function renderProduct(vinyls, productId) {
  const product = vinyls.find((x) => x.id === productId);
  console.log(product);
  if (product) {
    const productImage = document.getElementById("productImage");
    const productOverview = document.getElementById("productOverview");
    const productDetails = document.getElementById("productDetails");

    //create elements
    const albumElement = document.createElement("h1");
    albumElement.className = "productTitle";
    albumElement.innerHTML = `${product.album}`;

    const artistElement = document.createElement("h2");
    artistElement.className = "productArtist";
    artistElement.innerHTML = `${product.artist}`;

    const priceElement = document.createElement("p");
    priceElement.innerHTML = `Price: ${product.price}`;

    const yearElement = document.createElement("p");
    yearElement.innerHTML = `Year: ${product.year}`;

    const genreElement = document.createElement("p");
    genreElement.innerHTML = `Genre: ${product.genre}`;

    const descriptionElement = document.createElement("p");
    descriptionElement.innerHTML = `Description: ${
      product.description ?? "no description available"
    }`;

    const imageElement = document.createElement("a");
    const image = document.createElement("img");
    image.className = "image";
    image.src = product.image;
    imageElement.appendChild(image);

    //append elements to html containers
    productOverview.appendChild(albumElement);
    productOverview.appendChild(artistElement);
    productOverview.appendChild(priceElement);
    productOverview.appendChild(descriptionElement);

    productImage.appendChild(imageElement);

    productDetails.appendChild(yearElement);
    productDetails.appendChild(genreElement);
  } else {
    const productOuter = document.getElementById("dataContainer");
    const priceElement = document.createElement("p");
    priceElement.innerHTML = `cannot be found`;
    productOuter.appendChild(priceElement);
  }
}
//categories: all, genre(rock,pop,r&b,jazz), lpformat(vinyl lp, double vinyl lp)

function filterGenre(vinyls, genre) {
  console.log(vinyls);
  const filteredproductList = vinyls.filter(
    (element) => element.genre === genre
  );
  return filteredproductList;
}

function renderList(vinyls) {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";
  console.log(vinyls);

  vinyls.forEach((element) => {
    const productCard = document.createElement("div");
    productCard.className = "productCard";

    const productDetailsContainer = document.createElement("div");
    productDetailsContainer.className = "productDetails";

    const albumElement = document.createElement("a");
    albumElement.className = "productTitle";
    albumElement.href = "product-description.html?id=" + element.id;
    albumElement.innerHTML = `${element.album}`;

    const artistElement = document.createElement("p");
    artistElement.className = "productArtist";
    artistElement.innerHTML = `${element.artist}`;

    const priceElement = document.createElement("p");
    priceElement.className = "productPrice";
    priceElement.innerHTML = `${element.price},-`;

    const button = document.createElement("button");
    button.innerHTML = "Add to Cart";
    button.className = "cardButton";

    const imageElement = document.createElement("a");
    imageElement.href = "product-description.html?id=" + element.id;
    const image = document.createElement("img");
    image.className = "image";
    image.src = element.image ?? "images/istockphoto-1041993546-612x612.jpg";

    imageElement.appendChild(image);

    productDetailsContainer.appendChild(albumElement);
    productDetailsContainer.appendChild(artistElement);

    productCard.appendChild(imageElement);
    productCard.appendChild(productDetailsContainer);
    productCard.appendChild(priceElement);
    productCard.appendChild(button);
    productList.appendChild(productCard);
  });

  const missing = 4 - vinyls.length;

  if (missing > 0) {
    for (let i = 0; i < missing; i++) {
      productList.appendChild(document.createElement("div"));
    }
  }
}

// source: https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function queryParams() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  return Object.fromEntries(urlSearchParams.entries());
}
