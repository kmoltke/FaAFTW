// GLOBAL VARIABLES:
let vinyls = null;

/**
 * Fetch vinyl json data
 * @returns {Promise<any>}
 */
async function loadProductDataAsync() {
    const response = await fetch("../vinyls.json");
    return response.json();
}

/**
 * Fetch vinyl json data
 * @returns {Promise<any>}
 */
function getBasket() {
    if (localStorage.getItem("basket") == undefined || localStorage.getItem("basket") === '{}' || localStorage.getItem("basket") === 'null') {
        return {};
    } else {
        return JSON.parse(localStorage.getItem("basket"));
    }
}

/**
 * Save vinyl json data
 * @param data
 */
function saveData(data) {
    vinyls = data;
    console.log("data saved");
}

/**
 * Adds a vinyl to the shopping cart
 * @param itemId
 */
function addToBasket(itemId) {
    let basket = getBasket();
    basket[itemId] = true;
    localStorage.setItem("basket", JSON.stringify(basket));
    console.log(`Added item ${itemId}`);
}

/**
 * Removes an item from the basket
 * @param itemId
 */
function removeItem(itemId) {
    let basket = getBasket();
    delete basket[itemId];
    // update localStorage
    localStorage.setItem("basket", JSON.stringify(basket));
    // reset basketList
    document.getElementById("basketList").innerHTML = "";
    // rerender
    renderBasketList(vinyls);
}

/**
 * Renders each shopping cart element
 * @param product
 * @returns string
 */
function renderBasketCard(product) {
    return (
        '<div class="row mb-4 d-flex justify-content-between align-items-center">' +
        `<div class="col-md-2 col-lg-2 col-xl-2">` +
        `<img src="../${product.image}" class="img-fluid rounded-3"></div>` +
        `<div class="col-md-3 col-lg-3 col-xl-3">` +
        `<h6 class="text-muted">${product.artist}</h6>` +
        `<h6 class="text-black mb-0">${product.album}</h6></div>` +
        `<div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">` +
        `<h6 class="mb-0">DKK ${product.price}</h6></div>` +
        `<div class="col-md-1 col-lg-1 col-xl-1 text-end">` +
        `<button onclick="removeItem(${product.id});" class="text-muted">X</button></div></div>` +
        `<hr class="my-4">`
    );
}

/**
 * Default message when the shopping cart is empty
 * @returns string
 */
function renderEmptyList() {
    renderTotalPrice(0);
    return "<h3>Your cart is empty...</h3>";
}

/**
 * Renders the total shopping cart price
 * BTW: Maybe the most overkill function declaration, but I like it
 * @param price
 */
function renderTotalPrice(price) {
    document.getElementById("totalPrice").innerHTML = price;
}

/**
 * RenderBasketList takes the json vinyls and builds the shopping cart
 * @param vinyls
 */
function renderBasketList(vinyls) {
    let htmlBasket = document.getElementById("basketList");

    // Render empty list:
    if (localStorage.getItem("basket") == undefined || localStorage.getItem("basket") === '{}' || localStorage.getItem("basket") === 'null') {
        console.log("EMPTY BASKET");
        htmlBasket.innerHTML = renderEmptyList();
        // Go through the set of vinyl id's in the basket from local storage
        // and render each basket element
    } else {
        let b = getBasket();
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
