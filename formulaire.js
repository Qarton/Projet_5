//Validation du formulaire et enregistrement idShop


form.addEventListener("submit", event => {
  event.preventDefault()
  let formData = { contact:
      {firstName : form.firstName.value,
      lastName : form.name.value,
      address : form.address.value,
      city : form.city.value,
      email : form.email.value},
      products: panier
  }
  fetch('http://localhost:3000/api/teddies/order', {
method: 'POST',
headers: {
  'Content-Type': 'application/json',
},
body: JSON.stringify(formData),
})
.then(response => response.json())
.then(data => {
panier.splice(0, panier.length)
localStorage.setItem("panier" , JSON.stringify(panier))
window.document.location = './confirm.html' + '?orderId=' + data.orderId
})
.catch((error) => {
console.error('Error:', error);
});
})