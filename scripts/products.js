
/**
 * Asynchronously fetches product data from json file
 * @returns {Promise<any>}}
 */
async function loadProductDataAsync() {
  const response = await fetch("../vinyls.json");
  return response.json();
}

/**
 * Renders the product from the product-description html page
 * @returns {Promise<any>}}
 */
function renderProduct(vinyls, productId) {
  const product = vinyls.find((x) => x.id === productId);

  if (product) {
    const productImage = document.getElementById("productImage");
    const productOverview = document.getElementById("productOverview");
    const productDetails = document.getElementById("productDetails");

    // creates the elements
    const imageElement = document.createElement("a");
    const image = document.createElement("img");
    image.className = "image";
    image.src = product.image ?? "../images/no-image.jpg";
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

    button.setAttribute("onclick", `addToBasket(${productId});`);
    button.className = "cardButton btn btn-primary";
    button.id = "liveAlertBtn";
    button.addEventListener("click", () => {
      alert(
        `Product "${product.album} - ${product.artist}" added to cart`,
        "dark"
      );
    });

    const descriptionElement = document.createElement("p");
    descriptionElement.innerHTML = `${
      product.description ?? "no description available"
    }`;

    // Creates details for the elements
    const yearElement = document.createElement("p");
    yearElement.innerHTML = `Year: ${product.year}`;

    const genreElement = document.createElement("p");
    genreElement.innerHTML = `Genre: ${product.genre}`;

    const typeElement = document.createElement("p");
    typeElement.innerHTML = `Type: ${product.type}`;

    const labelElement = document.createElement("p");
    labelElement.innerHTML = `Label: ${product.label}`;

    // Append elements to html containers
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

/**
 * filters a list of vinyls, updates the URL and renders the filtered list
 * @param vinyls
 * @param category
 * @param subcategory
 */
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

/**
 * Displays feautured vinyls in carousel and sets background color based on current slide
 * @param vinyls
 */
function DisplayFeatured(vinyls) {
  const filteredProducts = vinyls.filter(
    (element) => element.featured === true
  );
  const carousel = document.getElementById("carousel-inner");
  const carouselCont = document.getElementById("carouselExampleCaptions");

  function setBg() {
    const activeSlide = document.querySelector(
      ".carousel .carousel-item.active"
    );
    carouselCont.style.backgroundColor = activeSlide.dataset.color;
  }

  carousel.innerHTML = "";
  for (let index = 0; index < filteredProducts.length; index++) {
    const element = filteredProducts[index];
    let html;
    if (index === 0) {
      html = `<div class="carousel-item active" data-color="${element.featuredColor}">`;
    } else {
      html = `<div class="carousel-item" data-color="${element.featuredColor}">`;
    }
    html +=
      '<div class="carousel-caption d-block">' +
      "<h2>" +
      `<a href="product-description.html?id=${element.id}"> ${element.album} - ${element.artist} →</a> ` +
      "</h2>" +
      "</div>" +
      `<a href="product-description.html?id=${
        element.id
      }"> <img class="d-block w-100" src=${
        element.image ?? "../images/no-image.jpg"
      } alt="Second slide" /> </a>` +
      "</div>";

    carousel.innerHTML += html;
  }

  carouselCont.addEventListener("slid.bs.carousel", setBg);
  setBg();

  console.log(filteredProducts);
}

/**
 * Clears the category filter applied to the product list
 */
function clearCategoryFilter() {
  window.history.replaceState(null, null, window.location.pathname);
  renderList(data);
}

/**
 * Renders a webpage dispalying a list of vinyl records from the json file
 * @param vinyls
 */
function renderPage(vinyls) {
  const selectedCategory = queryParams().category;
  if (selectedCategory) {
    const [categoryType, categoryValue] = selectedCategory.split(":");
    filterBy(vinyls, categoryType, categoryValue);
  } else {
    renderList(vinyls);
  }
}

/**
 * Renders the shopping card with the given information about the vinyl
 * @param element
 */
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
  button.className = "cardButton btn btn-primary";
  button.id = "liveAlertBtn";
  button.setAttribute("onclick", `addToBasket(${element.id});`);
  button.addEventListener("click", () => {
    alert(
      `Product "${element.album} - ${element.artist}" added to cart`,
      "dark"
    );
  });

  const imageElement = document.createElement("a");
  imageElement.href = "product-description.html?id=" + element.id;
  const image = document.createElement("img");
  image.className = "image";
  image.src = element.image ?? "../images/no-image.jpg";

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

/**
 * Renders all products based on the provided list of vinyls 
 * @param vinyls
 */
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
/**
 * Parses the query parameters from the current window URL and returns them as an object
 * @returns {Object} An object containing the parsed query parameters.
 */
function queryParams() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  return Object.fromEntries(urlSearchParams.entries());
}

const alertPlaceholder = document.getElementById("liveAlertPlaceholder");

const alert = (message, type) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible show fade run-animation" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" data-bs-target="#my-alert" aria-label="Close"></button>',
    "</div>",
  ].join("");

  alertPlaceholder.append(wrapper);
  const element = document.querySelector(".run-animation");

  let timer;

  /* 
  * Sets a timer that removes 'add to basket' pop up
  */
  function invoke() {
    timer = setTimeout(() => {
      alertPlaceholder.removeChild(wrapper);
    }, 3000);
  }

  invoke();
  element.addEventListener("mouseover", () => {
    window.clearTimeout(timer);
  });
  element.addEventListener("mouseout", () => {
    window.clearTimeout(timer);
    invoke();
    element.classList.remove("run-animation");
    void element.offsetWidth;
    element.classList.add("run-animation");
  });
};
