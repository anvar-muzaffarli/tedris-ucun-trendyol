let products = []

let cart = []

let wishlist = []


AOS.init();


// Eger mehsul varsa localStorageden onlari getir :)

if(localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
    updateCartUI()
}

if(localStorage.getItem('wishlist')) {
    wishlist = JSON.parse(localStorage.getItem('wishlist'));
    updateWishlistUI()
}

fetch('https://fakestoreapi.com/products')
.then((response) => response.json())
.then(data=> {
    products = data
    displayProducts()
})

.catch(err=> {
    console.log(`Mehsullari getirerken xeta bash verdi ${err.message}`)
})

function displayProducts() {
    const productLists = document.getElementById('product-list')

    products.forEach(product => {
        const productElement = document.createElement('div')
        productElement.classList.add('col-md-4', 'mb-3', 'p-2', 'col-12', 'product','ms-2')
        productElement.setAttribute("data-aos", "fade-right")
        // data-aos-duration="3000"

        productElement.setAttribute("data-aos-duration", `${product.id}00`)


        const image = document.createElement('img')
        image.classList.add('product-image')
        image.src= product.image
        image.alt=product.title
        productElement.appendChild(image)

        productElement.innerHTML += `
        <h3>${product.title}</h3>
        <p>Fiyat: $${product.price}</p>
        <button onclick="addToCart(${product.id})"><i class="fa-solid fa-basket-shopping"></i></button>
        <button onclick="addToWishlist(${product.id})"><i class="fa-regular fa-heart"></i></button>
        
        `

        productLists.appendChild(productElement)
    })
}

function addToCart(productId) {
    const product = products.find(p=> p.id===productId)
    cart = [...cart, product]
    updateCartUI()
    saveCartToLocalStorage()
}


function addToWishlist(productId) {
    const product = products.find(p=> p.id===productId)
    wishlist = [...wishlist, product]
    updateWishlistUI()
    saveWishlistToLocalStorage()
}

function updateCartUI() {
    const cartItemsElement = document.getElementById('cart-items')
    cartItemsElement.innerText = `${cart.length}`;

}

function updateWishlistUI() {
    const wishlistItemsElement = document.getElementById('wishlist-items');
    wishlistItemsElement.innerText = `${wishlist.length}`;
}

function saveCartToLocalStorage(){
    localStorage.setItem("cart", JSON.stringify(cart))
}

function saveWishlistToLocalStorage() {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

function showCart() {
    const modal = document.getElementById('cart-modal')
    modal.style.display='block'
    displayCartItems()
}


function closeCartModal() {
    const modal = document.getElementById('cart-modal')
    modal.style.display='none'
}

function clearCart() {
    cart=[]
    updateCartUI()
    closeCartModal()
}

function showWishlist() {
    const modal = document.getElementById('wishlist-modal')
    modal.style.display='block'
    displayWishListItems()
}

function closeWishlistModal() {
    const modal = document.getElementById('wishlist-modal');
  modal.style.display = 'none';
}

function displayCartItems() {
    const cartItemsList = document.getElementById('cart-items-list')
    cartItemsList.innerHTML=""
    cart.forEach(item=> {
        const li = document.createElement('li')
        li.textContent = item.title
        cartItemsList.appendChild(li)
    })
}

function displayWishListItems() {
    const wishlistItemsList = document.getElementById('wishlist-items-list')

    wishlistItemsList.innerHTML = ''

    wishlist.forEach(item=> {
        const li = document.createElement('li')
        li.textContent = item.title
        wishlistItemsList.appendChild(li)
    })
}