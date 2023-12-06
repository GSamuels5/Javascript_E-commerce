let checkoutData = document.querySelector('[checkout-data]')
let itemCheck = JSON.parse(localStorage.getItem('cart'))
function displayItems(){
    checkoutData.innerHTML = ""
    if (itemCheck) {
        itemCheck.forEach((purchase, i)=> {
            checkoutData.innerHTML +=
            `
<tr>
  <th scope="row">${purchase.make}</th>
  <td>${purchase.type}</td>
  <td><inputtype='number' >${purchase.id}</input></td>
  <td>${purchase.price}</td>
</tr>
`
        });
    }

}
displayItems()
let clearItems = document.querySelector('[clear-items]')

clearItems.addEventListener('click', ()=> {
    
}
)