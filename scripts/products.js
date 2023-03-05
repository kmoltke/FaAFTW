/* function loadProductData() {
  fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        return data; // this wont work
    });
} */

// global variables

async function loadProductDataAsync() {
  const response = await fetch("./vinyls.json");
  return response.json();
}

//function used to render the product in product-description html page
function renderProduct(vinyls, productId) {
  const product = vinyls.find((x) => x.id === productId);
  console.log(product);
  if (product) {
    const productImage = document.getElementById("productImage");
    const productOverview = document.getElementById("productOverview");
    const productDetails = document.getElementById("productDetails");

    //create elements
    const imageElement = document.createElement("a");
    const image = document.createElement("img");
    image.className = "image";
    image.src = product.image ?? "images/no-image.jpg";
    imageElement.appendChild(image);

    const albumElement = document.createElement("h1");
    albumElement.className = "productTitle";
    albumElement.innerHTML = `${product.album}`;

    const artistElement = document.createElement("h3");
    artistElement.className = "productArtist";
    artistElement.innerHTML = `${product.artist}`;

    const priceElement = document.createElement("p");
    priceElement.className = "productPrice";
    priceElement.innerHTML = `${product.price},-`;

    const button = document.createElement("button");
    button.innerHTML = "Add to Cart";
    button.className = "cardButton";

    const descriptionElement = document.createElement("p");
    descriptionElement.innerHTML = `${
      product.description ?? "no description available"
    }`;

    // details elements
    const yearElement = document.createElement("p");
    yearElement.innerHTML = `Year: ${product.year}`;

    const genreElement = document.createElement("p");
    genreElement.innerHTML = `Genre: ${product.genre}`;

    const typeElement = document.createElement("p");
    typeElement.innerHTML = `Type: ${product.type}`;

    const labelElement = document.createElement("p");
    labelElement.innerHTML = `Label: ${product.label}`;

    //append elements to html containers
    productOverview.append(
      albumElement,
      artistElement,
      priceElement,
      button,
      descriptionElement
    );

    productImage.appendChild(imageElement);

    productDetails.append(yearElement, genreElement, typeElement, labelElement);
  } else {
    const productOuter = document.getElementById("dataContainer");
    const priceElement = document.createElement("p");
    priceElement.innerHTML = `cannot be found`;
    productOuter.appendChild(priceElement);
  }
}

//categories: all, genre(rock,pop,r&b,jazz), lpformat(vinyl lp, double vinyl lp)
function filterBy(vinyls, category, subcategory) {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set("category", `${category}:` + subcategory);
  const queryString = searchParams.toString();
  window.history.replaceState(null, null, "?" + queryString);

  const filteredProducts = vinyls.filter(
    (element) => element[category] === subcategory
  );
  renderList(filteredProducts);
  console.log(filteredProducts);
}

function DisplayFeatured(vinyls) {
  const filteredProducts = vinyls.filter(
    (element) => element.featured === true
  );
  const carousel = document.getElementById("carousel-inner");
  carousel.innerHTML = "";
  for (let index = 0; index < filteredProducts.length; index++) {
    const element = filteredProducts[index];
    let html;
    if (index === 0) {
      html = '<div class="carousel-item active">';
    } else {
      html = '<div class="carousel-item">';
    }
    html +=
      '<div class="carousel-caption d-block">' +
      "<h2>" +
      `<a href="product-description.html?id=2"> ${element.album} - ${element.artist} →</a> ` +
      "</h2>" +
      "</div>" +
      `<img class="d-block w-100" src=${
        element.image ?? "images/no-image.jpg"
      } alt="Second slide" /> ` +
      "</div>";

    carousel.innerHTML += html;
  }
  console.log(filteredProducts);
}

function clearCategoryFilter() {
  window.history.replaceState(null, null, window.location.pathname);
  renderList(data);
}

function renderPage(vinyls) {
  const selectedCategory = queryParams().category;
  if (selectedCategory) {
    const [categoryType, categoryValue] = selectedCategory.split(":");
    filterBy(vinyls, categoryType, categoryValue);
  } else {
    renderList(vinyls);
  }
}

function renderCard(element) {
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
  image.src = element.image ?? "images/no-image.jpg";

  imageElement.appendChild(image);

  productDetailsContainer.appendChild(albumElement);
  productDetailsContainer.appendChild(artistElement);

  productCard.append(
    imageElement,
    productDetailsContainer,
    priceElement,
    button
  );
  return productCard;
}

//fnction used for index.html to render all products based on provided list(vinyls)
function renderList(vinyls) {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";
  vinyls.forEach((element) => {
    const productCard = renderCard(element);
    productList.appendChild(productCard);
  });

  // hack to make the size of the cards the same if elements listed are smaller than 4
  const missing = 5 - vinyls.length;
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

// When the user scrolls down 80px from the top of the document, resize the navbar's padding and the logo's font size
function myFunction() {
  var x = document.getElementById("navbar-right");
  if (x.className === "navbar-right") {
    x.className += " responsive";
  } else {
    x.className = "navbar-right";
  }
}
