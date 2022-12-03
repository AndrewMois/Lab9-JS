$(document).ready(function () {

    let cartItems = JSON.parse(window.localStorage.getItem("cart"));
    console.log(cartItems);

    $.getJSON("https://raw.githubusercontent.com/AndrewMois/Lab9-JS/main/products.json", function (data) {
        const products = data.products;

        if (cartItems == null) {
            $(".cart-container").append("<p>🛒 Cart is empty</p>");
        } else {
            // In this double loop i'm getting the rest of data from the JSON 
            for (let i = 0; i < cartItems.length; i++) {

                let itemSet = cartItems[i];
                let name = itemSet[0];

                for (let index in products) {

                    let curObj = products[index];

                    if (curObj['name'] == name) {
                        var price = curObj['price'];
                        var author = curObj['author'];
                        var image = curObj['image'];
                        console.log(name, price, author, image);
                    }
                }
            addCartItem(image, name, author, price);
            }
            
        }


    });


    class CartItem {
        constructor(image, name, author, price, quantity) {
            this.image = image;
            this.name = name;
            this.author = author;
            this.price = price;

        }
        addHTML() {
            let bookHTML = `<div class="item-desc">
        <img src="${this.image}" alt="book cover">
        <h3>${this.name}</h3>
        <p class="author">${this.author}</p>
    </div>
    <div class="shop-item">
        <p class="quantity">Quantity: <span class="quantity-num">1</span></p>
        <p class="price">Price: <span class="price-num">${this.price}</span>$</p>

    </div>`
            $(".cart-container").append(bookHTML);



        }
    }
    function addCartItem(image, name, author, price) {
        let cartItem = new CartItem(image, name, author, price);
        cartItem.addHTML();

    }


});

// constructor(image, name, author, price, quantity) {
//     this.image = image;
//     this.name = name;
//     this.author = author;
//     this.price = price;
//     this.quantity = quantity;
// }
// addHTML() {
//     let bookHTML = `<div class="item-desc">
// <img src="${this.image}" alt="book cover">
// <h3>${this.name}</h3>
// <p class="author">${this.author}</p>
// </div>
// <div class="shop-item">
// <p class="quantity">Quantity: <span class="quantity-num">${this.quantity}</span></p>
// <p class="price">Price: <span class="price-num">${this.price}</span>$</p>

// </div>`
//     $(".cart-container").append(bookHTML);