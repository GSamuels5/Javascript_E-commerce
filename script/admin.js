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
<td><img href='${watches.image}'</></td>
<td>${watches.type}</td>
<td>R ${watches.price}</td>
<td><button>Edit</button>
<button>Delete</button></td>

</tr>`
})