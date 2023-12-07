let checkoutData = document.querySelector('[checkout-data]')
let itemCheck = JSON.parse(localStorage.getItem('cart'))
function displayItems(){
    checkoutData.innerHTML = ""
    let total = 0
    if (itemCheck) {
        itemCheck.forEach((purchase, i)=> {
            checkoutData.innerHTML +=
            `
<tr>
  <th>${purchase.make}</th>
  <td>${purchase.type}</td>
  <td><input type='number' value='${purchase.quantity}' ></input></td>
  <td>${purchase.price}</td>
</tr>
`;
total += purchase.price*purchase.quantity
        });
        checkoutData.innerHTML +=
        `<tr>
        <th colspan = '3'>Total</th>
        <td>${total}</td>
        </tr>`
    }

}
displayItems()
let clearItems = document.querySelector('[clear-items]')

clearItems.addEventListener('click', ()=> {
    localStorage.removeItem('cart')
    clearItems.innerHTML = " "
}
)
// create an event for qauntity entered
checkoutData.addEventListener('keyup', (event)=>{
    if (event.target.tagName === 'INPUT') {
        let index = event.target.dataset.index;
        let newQuantity = parseInt(event.target.value)
        if (!isNaN(newQuantity) && newQuantity >= 0 && itemCheck && itemCheck[index]){
itemCheck[index].quantity = newQuantity;
localStorage.setItem('cart',JSON.stringify(itemCheck))
updateTotal()
        }
        
    }
})
function updateTotal(){
    let total = 0
    itemCheck.forEach((purchase) =>{
        total += purchase.price * purchase.quantity
    })
    document.getElementById('total').innerText = total
}
// let clearItems.addEventListener('click', ()=>{
//     localStorage.removeItem('cart')
//     itemCheck = []
//     checkoutData.innerHTML = ""
//     document.getElementById('total').innerText = '0'
// })