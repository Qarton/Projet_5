//Contenu du panier dans le local storage
let panier = (!localStorage.getItem("panier")) ? [] : JSON.parse(localStorage.getItem("panier"))
let totalPrice = 0
//Affichage du panier
for (var i = 0; i < panier.length; i++) {
    let idProduct = panier[i]
    //Récupération des informations des objets du panier en fonction des ID enregistrer dans le local storage
    async function getItem(id) {
        const api_url = `http://localhost:3000/api/teddies/${id}`;
        const response = await fetch(api_url);
        const item = await response.json();
        return item
    };
    getItem(idProduct).then(item => panierList(item))

    function panierList(item) {
        const findDiv = document.querySelector("#panier")
        const findPanier = document.querySelector("#num_panier")
        const findTotal = document.querySelector("#num_total")
        //Affichage du prix total et du nombre d'objet
        totalPrice += item.price;
        findPanier.innerHTML = panier.length
        findTotal.innerHTML = `${totalPrice * 0.01} €`
        //Affichage du contenu du panier
        const newElement = document.createElement("div")
        newElement.innerHTML = `
                <div class="row">
                <div class="col-8 p-2 text-center border rounded">
                    <p class="m-0">Modèle : ${item.name} Prix : ${item.price * 0.01} €</p>
                </div>
                <div class="col-4">
                    <button class="del-item btn btn-secondary">Supprimer</button>
                </div>
                </div>
        `
        findDiv.append(newElement)
        //Bouton de suppression d'un objet
        const delButton = newElement.querySelector(".del-item")
        delButton.addEventListener("click", () => {
            function removeElement(panier, item) {
                var index = panier.indexOf(item._id);
                if (index > -1) {
                    panier.splice(index, 1);
                }
            }
            removeElement(panier, item)
            localStorage.setItem("panier", JSON.stringify(panier))
            newElement.innerHTML = ""
        })
    }
}
//Enregistrement et envoi du formulaire puis enregsitrement ID commande et montant total
const form = document.querySelector("#formulaire")
form.addEventListener("submit", event => {
    event.preventDefault()
    //Création des données du formulaire
    let emailID = form.email.value;
    atpos = emailID.indexOf("@");
    dotpos = emailID.lastIndexOf(".");
    if (form.name.value === "") {
        alert("Saisir un nom");

    }
    if (form.firstName.value === "") {
        alert("Saisir un prénom");

    }
    if (form.address.value === "") {
        alert("Saisir une adresse");

    }
    if (form.city.value === "") {
        alert("Saisir une ville");

    }
    if (atpos < 1 || (dotpos - atpos < 2)) {
        alert("Adresse mail incorrecte ou vide")

    }
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
    //Envoi des données du formulaire
    fetch('http://localhost:3000/api/teddies/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
        .then(response => response.json())
        .then(data => {
            //Suppression du contenu du panier
            panier.splice(0, panier.length)
            localStorage.setItem("panier", JSON.stringify(panier))
            //Enregistrement ID de la commande et prix total
            window.document.location = './confirm.html' + '?orderId=' + data.orderId + '|' + totalPrice
        });
})
