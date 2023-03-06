let basket = {};

function addToBasket(itemId) {
    basket[itemId] = true;
    console.log(`Added item ${itemId}`);
}

function renderBasketCard(vinyls, productId) {
    const product = vinyls.find((x) => x.id === productId);
    let html = '<div class="row mb-4 d-flex justify-content-between align-items-center">' +
        `<div class="col-md-2 col-lg-2 col-xl-2">` +
        `<img src="../${product.image}"  class="img-fluid rounded-3"></div>` +
        `<div class="col-md-3 col-lg-3 col-xl-3">` +
        `<h6 class="text-muted">${product.artist}</h6>` +
        `<h6 class="text-black mb-0">${product.album}</h6></div>` +
        `<div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">` +
        `<h6 class="mb-0">${product.price}</h6></div>` +
        `<div class="col-md-1 col-lg-1 col-xl-1 text-end">` +
        `<button onclick="removeItem(${productId});" class="text-muted">X</button></div></div>` +
        `<hr class="my-4">`;
    return html;
}

function renderBasketList(vinyls) {
    let html = "";
    for (const key in basket) {
        html += renderBasketCard(vinyls, key)
    }
    document.getElementById("basketList").innerHTML = html;
}

    // const basketCardContainer = document.createElement("div");
    // basketCardContainer.className
    //
    // const image = document.createElement("img");
    //
    // const removeButton = document.createElement("button");
    //
    // const albumElement = document.createElement("a");
    // albumElement.className = "productTitle";
    // albumElement.href = "product-description.html?id=" + element.id;
    // albumElement.innerHTML = `${element.album}`;
    //
    // const artistElement = document.createElement("p");
    // artistElement.className = "productArtist";
    // artistElement.innerHTML = `${element.artist}`;
    //
    // const priceElement = document.createElement("p");
    // priceElement.className = "productPrice";
    // priceElement.innerHTML = `${element.price},-`;
