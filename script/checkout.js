let checkoutData = document.querySelector('[checkout-data]')
let itemCheck = JSON.parse(localStorage.getItem('cart'))

function displayItems() {
    checkoutData.innerHTML = ""
    let total = 0
    if (itemCheck) {
        itemCheck.forEach((purchase, i) => {
            checkoutData.innerHTML +=
                `
<tr>
  <td>${purchase.make}</td>
  <td>${purchase.type}</td>
  <td><input class="w-25%" type='number' value='${purchase.quantity}' data-index='${i}'></td>
  <td>R ${purchase.price}</td>
</tr>
`;
            total += parseFloat(purchase.price) * parseFloat(purchase.quantity)
            if(isNaN(total)){
                total = 0;
            }
        });
        checkoutData.innerHTML +=
            `<tr>
        <th colspan = '3'>Total</th>
        <td id="total"> R ${Intl.NumberFormat().format(total)}</td>
        </tr>`
    }
    document.getElementById('total').innerText = `R${total}`
}
displayItems()
//to clear all items
function clearCart() {
    localStorage.removeItem('cart')
    itemCheck = []
    location.reload()
    clearItems.innerHTML = ""
}
let clearItems = document.querySelector('[clear-items]')
clearItems.addEventListener('click', clearCart)
// })
// create an event for qauntity entered
checkoutData.addEventListener('keyup', (event) => {
    if (event.target.tagName === 'INPUT') {
        let index = parseInt(event.target.dataset.index);
        let newQuantity = parseFloat(event.target.value)
        if (!isNaN(newQuantity) && newQuantity >= 0 && itemCheck && itemCheck[index]) {
            itemCheck[index].quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(itemCheck))
            updateTotal()
        }

    }
})
updateTotal()
function updateTotal() {
    let total = 0
    itemCheck.forEach((purchase) => {
        total += parseFloat(purchase.price) * parseFloat(purchase.quantity)
    })
    
    
document.getElementById('total').innerText = total
displayItems()
}


//create pay buttonew
let payButton = document.querySelector('[pay-data]')

payButton.addEventListener('click', ()=> {

    alert('thank your for your purchase');
})