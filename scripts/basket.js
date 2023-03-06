let basket = {};
basket[1] = true;

function addToBasket(itemId) {
    console.log(`Hey ${itemId}`);
}

function renderBasketCard(vinyls, productId) {
    const product = vinyls.find((x) => x.id === productId);

    const basketCardContainer = document.createElement("div");
    basketCardContainer.className

    const image = document.createElement("img");

    const removeButton = document.createElement("button");

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
}

function renderBasketList() {

}
