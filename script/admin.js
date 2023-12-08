//create modal variable
// const myModal = document.getElementById('myModal')
// const myInput = document.getElementById('myInput')
/*create a sort
let sortNew =
*/
let allItems = JSON.parse(localStorage.getItem('products'))

console.log(allItems);
Object.keys(allItems).forEach((watch)=>{
    let watches = allItems[watch]
    let time = document.querySelector('[new-data]')
console.log(watch);
time.innerHTML +=
` <tr>
<td>${watches.make}</td>
<td class='image' ><img src='${watches.image}'id='newImage'></td>
<td>${watches.type}</td>
<td>R ${watches.price}</td>
<td><button>Edit</button>
<button>Delete</button></td>

</tr>`
})
//creating a function to pull modal data
document.addEventListener('DOMContentLoaded',()=>{

    //create a variable
    let itembtn = document.querySelector('#newItem')
    let newMake = document.querySelector('#make')
    let newType = document.querySelector('#id')
    let newURL = document.querySelector('#url')
    let newPrice = document.querySelector('#price')
    /*add click event
    to allow input data to display in localstorage of cart
    */
    itembtn.addEventListener('click',()=>{
    //get values for inputs
    let makeInput = newMake.value.trim()
    let typeInput = newType.value.trim()
    let priceInput = parseFloat(newPrice.value)
    let urlInput = newURL.value.trim()
//go through input values and check if empty

    }
    
    )
})

