// Get buy button
let carts = document.getElementsByClassName('buybutton');
//Get cart button
var cartBtn = document.getElementById('modalBtn');


let products = [
{
    name: 'Cod',
    tag: 'cod',
    price: 11,
    inCart: 0
},
{
    name: 'Pollock',
    tag: 'pollock',
    price: 10,
    inCart: 0
},
{
    name: 'Redsnapper',
    tag: 'redsnapper',
    price: 12,
    inCart: 0
},
{
    name: 'Salmon',
    tag: 'salmon',
    price: 15,
    inCart: 0
},
{
    name: 'Haddock',
    tag: 'haddock',
    price: 8,
    inCart: 0
},
{
    name: 'White Fish',
    tag: 'whitefish',
    price: 5,
    inCart: 0
}
];


for (let i=0; i < carts.length; i++){
    carts[i].addEventListener('click', () =>{
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers){
        document.getElementsByClassName('.cart span').textContent = productNumbers;

    }

}

function cartNumbers(product){
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if(productNumbers){
        localStorage.setItem('cartNumbers',productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    }
    else{
        localStorage.setItem('cartNumbers',1)
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);
    

}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {
        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    }
    else{
        product.inCart = 1;
        cartItems = {
            [product.tag]:product
        }
    }



    localStorage.setItem("productsInCart",JSON.stringify(cartItems));

}


function totalCost(product){
    //console.log('The product price is', product.price);
    let cartCost = localStorage.getItem('totalCost');
    console.log('My cartCost is', cartCost);

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + product.price);
    }
    else{
        localStorage.setItem('totalCost', product.price);
    }
    
}

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');
    
    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <img src="${item.tag}.jpeg">
                <span>${item.name}</span>
            </div>
            <div class="price">$${item.price}.00</div>
            <div class="quantity">
                <span>${item.inCart}</span>
            </div>
            <div class="total">
                $${item.inCart * item.price}.00
            </div>

            `;
        });

        productContainer.innerHTML += `
            <div class ="basketTotalContainer">
                <h4 class="grandTotal">
                    Grand Total: $${cartCost}.00
                </h4>
        `;
    }

}

onLoadCartNumbers();
displayCart();
