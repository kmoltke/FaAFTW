
/* function loadProductData() {
  fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        return data; // this wont work
    });
} */

async function loadProductDataAsync() {
  const response = await fetch('./vinyls.json')
  return response.json()
}

function renderProduct(vinyls, productId){
  const product = vinyls[productId];
  console.log(product)
  if (product) {

  const productImage = document.getElementById('productImage');
  const productOverview = document.getElementById('productOverview');
  const productDetails = document.getElementById('productDetails');

  //create elements
  const albumElement = document.createElement('h1');
  albumElement.className = "productTitle";
  albumElement.innerHTML = `${product.album}`;

  const artistElement = document.createElement('h2');
  artistElement.className = "productArtist";
  artistElement.innerHTML = `${product.artist}`;

  const priceElement = document.createElement('p');
  priceElement.innerHTML = `Price: ${product.price}`;

  const yearElement = document.createElement('p');
  yearElement.innerHTML = `Year: ${product.year}`;

  const genreElement = document.createElement('p');
  genreElement.innerHTML = `Genre: ${product.genre}`;

  const descriptionElement = document.createElement('p');
  descriptionElement.innerHTML = `Description: ${product.description ?? 'no description available'}`;

  const imageElement = document.createElement('a');
  const image = document.createElement('img');
  image.className = "image";
  image.src = product.image;
  imageElement.appendChild(image)
 
  //append elements to html containers
  productOverview.appendChild(albumElement);
  productOverview.appendChild(artistElement);
  productOverview.appendChild(priceElement);
  productOverview.appendChild(descriptionElement);

  productImage.appendChild(imageElement);

  productDetails.appendChild(yearElement);
  productDetails.appendChild(genreElement);
}
else
{
  const productOuter = document.getElementById('dataContainer');
  const priceElement = document.createElement('p');
  priceElement.innerHTML = `cannot be found`;
  productOuter.appendChild(priceElement);
}
}

function renderList(vinyls) {
  const productList = document.getElementById('productList');
  console.log(vinyls);
  const list = Object.entries(vinyls);

  list.forEach(([id, element]) => {
  const productElement = document.createElement('div');
  productElement.className = "pElement";

  const anchorElement = document.createElement('a');
  anchorElement.href = 'product-description.html?id=' + id
  productElement.className = "Anchor";

  const albumElement = document.createElement('h1');
  albumElement.className = "productTitle";
  albumElement.innerHTML = `${element.album}`;

  const artistElement = document.createElement('h2');
  artistElement.className = "productArtist";
  artistElement.innerHTML = `${element.artist}`;

  const priceElement = document.createElement('p');
  priceElement.innerHTML = `Price: ${element.price}`;

  productElement.appendChild(albumElement);
  productElement.appendChild(artistElement);
  productElement.appendChild(priceElement);
  anchorElement.appendChild(productElement);
  productList.appendChild(anchorElement);
  });

}

// source: https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function queryParams() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  return Object.fromEntries(urlSearchParams.entries());
}

