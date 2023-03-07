let vinyls = null;

function saveData(data) {
    vinyls = data;
    console.log("data saved");
}


async function loadProductDataAsync() {
    const response = await fetch("../vinyls.json");
    return response.json();
}

function addToBasket(itemId) {
    let basket = localStorage.getItem("basket") === 'undefined' ? {} : JSON.parse(localStorage.getItem("basket"));

    basket[itemId] = true;
    localStorage.setItem("basket", JSON.stringify(basket));
    console.log(`Added item ${itemId}`);
}

function removeItem(itemId) {
    let basket = localStorage.getItem("basket") === 'undefined' ? console.log("Basket is empty") : JSON.parse(localStorage.getItem("basket"));
    delete basket[itemId];
    localStorage.setItem("basket", JSON.stringify(basket));
    // reset basketList
    document.getElementById("basketList").innerHTML = "";
    // rerender
    renderBasketList(vinyls);
}

function renderBasketCard(product) {
    return '<div class="row mb-4 d-flex justify-content-between align-items-center">' +
        `<div class="col-md-2 col-lg-2 col-xl-2">` +
        `<img src="../${product.image}" class="img-fluid rounded-3"></div>` +
        `<div class="col-md-3 col-lg-3 col-xl-3">` +
        `<h6 class="text-muted">${product.artist}</h6>` +
        `<h6 class="text-black mb-0">${product.album}</h6></div>` +
        `<div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">` +
        `<h6 class="mb-0">DKK ${product.price}</h6></div>` +
        `<div class="col-md-1 col-lg-1 col-xl-1 text-end">` +
        `<button onclick="removeItem(${product.id});" class="text-muted">X</button></div></div>` +
        `<hr class="my-4">`;
}

//TODO: implement renderEmptyList
function renderEmptyList() {
    return `<h3>Your cart is empty...</h3>`;
}

function renderTotalPrice(price) {
    document.getElementById("totalPrice").innerHTML = price;
}

function renderBasketList(vinyls) {
    let htmlBasket = document.getElementById("basketList");
    if (localStorage.getItem("basket") === '{}') {
        htmlBasket.innerHTML = renderEmptyList();
    } else {
        let b = JSON.parse(localStorage.getItem("basket"));
        let totalPrice = 0;
        Object.keys(b).forEach((prodId) => {
            const product = vinyls.find((v) => v.id === parseInt(prodId));
            if (product) {
                htmlBasket.innerHTML += renderBasketCard(product);
                totalPrice += product.price;
                console.log(product.album);
            }
        });
        renderTotalPrice(totalPrice);
    }
}
