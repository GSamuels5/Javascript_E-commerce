//create modal variable
// const myModal = document.getElementById('myModal')
// const myInput = document.getElementById('myInput')
/*create a sort
let sortNew =
*/
let allItems = JSON.parse(localStorage.getItem('products'))

console.log(allItems);
Object.keys(allItems).forEach((watch) => {
    let watches = allItems[watch]
    let time = document.querySelector('[new-data]')
    console.log(watch);
    time.innerHTML +=
        ` <tr>
<td>${watches.make}</td>
<td class='image' ><img src='${watches.image}'id='newImage'></td>
<td>${watches.type}</td>
<td>R ${watches.price}</td>
<td><button id='editing' >Edit</button>
<button id='delete' >Delete</button></td>

</tr>`
})
//creating a function to pull modal data
document.addEventListener('DOMContentLoaded', () => {

    //create a variable
    let itembtn = document.querySelector('#newItem')
    let newMake = document.querySelector('#make')
    let newType = document.querySelector('#id')
    let newURL = document.querySelector('#url')
    let newPrice = document.querySelector('#price')
    //get local products
    let products = JSON.parse(localStorage.getItem('products')) || []
    /*add click event
    to allow input data to display in localstorage of cart
    */
    itembtn.addEventListener('click', () => {
            //get values for inputs
            let makeInput = newMake.value.trim()
            let typeInput = newType.value.trim()
            let priceInput = parseFloat(newPrice.value)
            let urlInput = newURL.value.trim()
            //go through input values and check if empty
            if (makeInput && typeInput && !isNaN(priceInput) && urlInput) {
                let adminItems = {
                    id: products.length + 1,
                    make: makeInput,
                    type: typeInput,
                    price: priceInput,
                    image: urlInput,
                }
                products.push(adminItems)
                localStorage.setItem('products', JSON.stringify(products))
                displayProducts()

                let modal = document.getElementById('exampleModal')
                let modalInstance = bootstrap.Modal.getInstance(modal)
                modalInstance.hide()

                newMake.value = ''
                newType.value = ''
                newPrice.value = ''
                newURL.value = ''
                alert('New product addded succesfully')
            } else {
                alert("Please fill in all fields!")
            }
        }

    )
})
/*edit button function*/
let editBtn = document.querySelector('#editing')
editBtn.addEventListener('click', () => {
    //declare a variable to acces local strorage and edit product from display

})
/*delete button function*/
let deleteBtn = document.querySelector('#delete')
deleteBtn.addEventListener('click', () => {
    //declare a variable to acces local strorage and edit product from display
})