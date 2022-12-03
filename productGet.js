$(document).ready(function () {

    //////////////////////////////////////////
    // Receiving data from the JSON file and displaying it on the main page
    //////////////////////////////////////////



    // Here we are using the jQuery getJSON method to retrieve the data from the JSON file and display it on the page using function.
    $.getJSON("https://raw.githubusercontent.com/AndrewMois/Lab9-JS/main/products.json", function (data) {
        const products = data.products;
        let cartList = [];
        for (book of products) {
            createBook(book.image, book.name, book.author, book.price);
        }
        // adding the event listener to each button
        // i'm taking only the name. All rest info i'm getting from the JSON file in another script file
        $(".btn").click(function (index) {
            let name = $(this).parent().find(".title").text();
            let cartItem = [name];
            cartList.push(cartItem);


            // saving the cartList array to the local storage
            let existingCart = JSON.parse(window.localStorage.getItem("cart"));
            console.log(existingCart);
            if (existingCart == null) {
                window.localStorage.setItem("cart", JSON.stringify(cartList));
                // updating the cart value, because we added a new item
                existingCart = JSON.parse(window.localStorage.getItem("cart"));
                // CART QUANTITY ON CLICK
                $("#cart-quantity").text(existingCart.length);
            } else {
                existingCart.push(cartItem);
                window.localStorage.setItem("cart", JSON.stringify(existingCart));
                // CART QUANTITY ON CLICK
                $("#cart-quantity").text(existingCart.length);
            }


        });
    });

    // CART QUANTITY ON LOAD
    if (window.localStorage.getItem("cart") != null) {
        let itemQuantity = JSON.parse(window.localStorage.getItem("cart")).length;
        $("#cart-quantity").text(itemQuantity);
    }


    // This class creates a new book object and have a method to append it to the page.
    class Book {
        constructor(image, name, author, price) {
            this.image = image;
            this.name = name;
            this.author = author;
            this.price = price;
        }
        addHTML() {
            let bookHTML = `<div class="item-image">
        <img src="${this.image}" alt="Book picture">
    </div>
    <div class="shop-item">
        <h3 class="title">${this.name}</h3>
        <p class="author">${this.author}</p>
        <p class="price">Price: <span class="price-num">${this.price}</span>$</p>

        <button class="btn">Add to cart</button>
    </div>`
            $(".shop-container").append(bookHTML);



        }
    }

    // This function is needed to call a class method inside a JSON fetch loop 
    function createBook(image, name, author, price) {
        let book = new Book(image, name, author, price);
        book.addHTML();

    }


});

