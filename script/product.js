document.querySelector('#footEdit').innerText = new Date().getUTCFullYear()
// putting products in an array
let products = JSON.parse(localStorage.getItem('products')) ?
    JSON.parse(localStorage.getItem('products')) : localStorage.setItem('products',
        JSON.stringify(
            [{
                    'id': 1,
                    'make': 'crown',
                    'type': 'Antique',
                    'price': 4396.83,
                    'year': 1920,
                    'image': 'https://i.postimg.cc/c1h1LxQ0/Antique-Crown-Watch-Co-pocket-as170a11992b.jpg'

                },
                {
                    'id': 2,
                    'make': 'Seiko prestage',
                    'type': 'Mens',
                    'price': 20592,
                    'year': 1950,
                    'image': 'https://i.postimg.cc/9f1ngM9x/image.jpg'
                },
                {
                    'id': 3,
                    'make': 'Rolex',
                    'type': 'Mens',
                    'price': 15000,
                    'year': 1963,
                    'image': 'https://i.postimg.cc/3xZk65xS/Microsoft-Teams-image-10-1000x.jpg'
                },
                {
                    'id': 4,
                    'make': 'kiroh',
                    'type': 'Womens',
                    'price': 4500,
                    'year': 2003,
                    'image': 'https://i.postimg.cc/htmkPcds/rtz5g-512.webp'
                },
                {
                    'id': 5,
                    'make': 'kiroh',
                    'type': 'Womens',
                    'price': 3500,
                    'year': 2001,
                    'image': 'https://i.postimg.cc/N0HmzCZ5/71ng-D-Rf8-LL-SX679.jpg'
                },
            ]
        ))
//display all products
let allProducts = document.querySelector('[data-everyItem]')
let cartProducts = JSON.parse(localStorage.getItem('cart')) || []

function displayProducts() {
    allProducts.innerHTML = "";
    const loading = document.querySelector('#spinner')
    if (products) {
        products.forEach((product) => {
            allProducts.innerHTML +=
                `<div class="card m-4" >
        <div class="card-header">
          <h5>${product.type} watches</h5>
        </div>
        <div class="card-body">
         
          <p class="card-text"> price: R${product.price}</p>
          <p>Make: ${product.make}</p>
          <img src="${product.image}" alt="antique" loading="lazy" class="card-img">
          </div>
          <div class="card-footer">
      <button class="btn btn-primary" onclick='cartItems(${JSON.stringify(product)})' data-cart>ADD TO CART</button>
    </div>
    
          
        </div>`
        });

    } else {
        allProducts.innerHTML = `<h1>No products found</h1>`
    }
    spinner.classList.add('d-none')
}
displayProducts()
//create search input
let inputSearch = document.querySelector('[search-product]')


//addevent

inputSearch.addEventListener('keyup', () => {
    let spinner = document.getElementById('spinner')
    spinner.classList.remove('d-none')
    try {
        let SearchItem = products.filter(
            prod => {
                return prod.type.toLowerCase().includes(inputSearch.value.toLowerCase())
            }
        )
        if (SearchItem) {
            allProducts.innerHTML = ""
            SearchItem.forEach(
                item => {
                    allProducts.innerHTML +=
                        `<div class="card m-4" >
                    <div class="card-header">
                      <h5>${item.type} watches</h5>
                    </div>
                    <div class="card-body">
                     
                      <p class="card-text"> price: R${item.price}</p>
                      <p>Make: ${item.make}</p>
                      <img src="${item.image}" alt="antique" loading="lazy" class="card-img">
                      </div>
                      <div class="card-footer">
                  <button class="btn btn-primary" onclick='cartItems(${JSON.stringify(item)})' data-cart>ADD TO CART</button>
                </div>
                
                      
                    </div>`

                }

            )
        } else {
            allProducts.innerHTML = `<h1>Product not found </h1>`
        }
    } catch (e) {
        `product not found`
    }
    spinner.classList.add('d-none')
})


//create sort button
let sortBtn = document.querySelector('[data-sort]')

//create click event to sort items according to the prices
sortBtn.addEventListener('click',
    function sortValues() {
        let assendingOrder = true
        products.sort((a, b) => {
            if (assendingOrder) {
                return a.price - b.price
            } else {
                return b.price - a.price
            }
        })
        assendingOrder = !assendingOrder
        displayProducts()
    })

//create an empty array for add to cart 
//push empty array to local storage 
//onclick add objects to new array 
//create variable 
function cartItems(item) {
    if (item) {
        cartProducts.push(item)
        localStorage.setItem('cart', JSON.stringify(cartProducts))
    }
    alert(`item added to cart`)
}