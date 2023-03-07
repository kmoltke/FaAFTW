// let basket = {};

async function loadProductDataAsync() {
    const response = await fetch("../vinyls.json");
    return response.json();
}

function addToBasket(itemId) {
    // Format to int
    let id = +itemId;

    // // let basket = 0;
    //
    // if (localStorage.getItem("basket")===undefined) {basket = {};}
    // // let basket = JSON.parse(localStorage.getItem("basket"));

    let basket = localStorage.getItem("basket") === 'undefined' ? {} : JSON.parse(localStorage.getItem("basket"));

    basket[id] = true;
    // localStorage.setItem("basket", JSON.stringify(basket));
    localStorage.setItem("basket", JSON.stringify(basket));
    console.log(`Added item ${id}`);
}

function renderBasketCard(product) {
    return '<div class="row mb-4 d-flex justify-content-between align-items-center">' +
        `<div class="col-md-2 col-lg-2 col-xl-2">` +
        `<img src="../${product.image}" class="img-fluid rounded-3"></div>` +
        `<div class="col-md-3 col-lg-3 col-xl-3">` +
        `<h6 class="text-muted">${product.artist}</h6>` +
        `<h6 class="text-black mb-0">${product.album}</h6></div>` +
        `<div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">` +
        `<h6 class="mb-0">${product.price}</h6></div>` +
        `<div class="col-md-1 col-lg-1 col-xl-1 text-end">` +
        `<button onclick="removeItem(${product.id});" class="text-muted">X</button></div></div>` +
        `<hr class="my-4">`;
}

//TODO: implement renderEmptyList
function renderEmptyList() {
    console.log("The basket is empty");
}

function renderBasketList(vinyls) {
    // let html = ""

    // let b = localStorage.getItem("basket")==='undefined' ? {} : JSON.parse(localStorage.getItem("basket"));


    // if (localStorage.getItem("basket") === 'undefined') {
    //     renderEmptyList();
    // } else {
    //     let b = JSON.parse(localStorage.getItem("basket"));
    //     Object.keys(b).forEach((id) => {
    //         console.log(id);
    //     });
    // }

    if (localStorage.getItem("basket") === 'undefined') {
        renderEmptyList();
    } else {
        let b = JSON.parse(localStorage.getItem("basket"));
        let htmlBasket = document.getElementById("basketList");
        Object.keys(b).forEach((prodId) => {
            const product = vinyls.find((v) => v.id === parseInt(prodId));
            if (product) {
                htmlBasket.innerHTML += renderBasketCard(product);
                console.log(product.album);
            }
        });
    }


    // for (const key in b) {
    //     // html += renderBasketCard(vinyls, key);
    //     // let basketElem = vinyls.find((v) => v.id === key);
    //     // document.getElementById("basketList").innerHTML += renderBasketCard(basketElem);
    //
    // }


    // for (const bElement of b) {
    //
    // }
}


// function renderBasketCard(vinyls, productId) {
//     const product = vinyls.find((x) => x.id === productId);
//     if (product) {
//         let html = '<div class="row mb-4 d-flex justify-content-between align-items-center">' +
//             `<div class="col-md-2 col-lg-2 col-xl-2">` +
//             `<img src="../${product.image}" class="img-fluid rounded-3"></div>` +
//             `<div class="col-md-3 col-lg-3 col-xl-3">` +
//             `<h6 class="text-muted">${product.artist}</h6>` +
//             `<h6 class="text-black mb-0">${product.album}</h6></div>` +
//             `<div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">` +
//             `<h6 class="mb-0">${product.price}</h6></div>` +
//             `<div class="col-md-1 col-lg-1 col-xl-1 text-end">` +
//             `<button onclick="removeItem(${productId});" class="text-muted">X</button></div></div>` +
//             `<hr class="my-4">`;
//         return html;
//     }
// }

// document.getElementById("basketList").innerHTML = html;
// console.log(`Rendered from basket:\n${basket}`);
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
