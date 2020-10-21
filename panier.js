//Panier

let panier = (!localStorage.getItem("panier")) ? [] : JSON.parse(localStorage.getItem("panier"))
const findPanier = document.querySelector("#num_panier")
const findTotal = document.querySelector("#num_total")
const form = document.querySelector("#formulaire")
const idShop = document.querySelector("#idShop")



const findDiv = document.querySelector("#panier")

var totalPrice = 0
for (var i = 0; i < panier.length; i++) {
    var idProduct = panier[i]
    fetch(`http://localhost:3000/api/teddies/${idProduct}`)
        .then(response => response.json())
        .then(data => panierList(data))
    function panierList(data) {
        //Affichage du prix total et du nombre d'objet
        totalPrice += data.price;
        findPanier.innerHTML = panier.length
        findTotal.innerHTML = `${totalPrice * 0.01} €`
        //Affichage du contenu du panier
        const newElement = document.createElement("div")
        newElement.innerHTML = `
                <div class="row">
                <div class="col-8 p-2 text-center border rounded">
                    <p class="m-0">Modèle : ${data.name} Prix : ${data.price * 0.01} €</p>
                </div>
                <div class="col-4">
                    <button class="del-item btn btn-secondary">Supprimer</button>
                </div>
                </div>
        `
        findDiv.append(newElement)
        //Bouton de suppression d'un objet
        const delButton = newElement.querySelector(".del-item")
        delButton.addEventListener("click", event => {
            function removeElement(panier, data) {
                var index = panier.indexOf(data._id);
                if (index > -1) {
                    panier.splice(index, 1);
                }
            }
            removeElement(panier, data)
            localStorage.setItem("panier", JSON.stringify(panier))
            newElement.innerHTML = ""
        })
    }
}
//Enregistrement et envoi du formulaire et enregistrement idShop
form.addEventListener("submit", event => {
    event.preventDefault()
    let formData = {
        contact:
        {
            firstName: form.firstName.value,
            lastName: form.name.value,
            address: form.address.value,
            city: form.city.value,
            email: form.email.value
        },
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
            //Suppression du panier
            panier.splice(0, panier.length)
            localStorage.setItem("panier", JSON.stringify(panier))
            //Enregistrement idShop et prix total
            window.document.location = './confirm.html' + '?orderId=' + data.orderId + '|' + totalPrice
        })
        .catch((error) => {
            console.error('Error:', error);
        });
})

