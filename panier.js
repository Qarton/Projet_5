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
    let formData = {
        contact:
        {
            firstName: form.firstName.value,
            lastName: form.name.value,
            address: form.address.value,
            city: form.cityCode.value + form.city.value,
            email: form.email.value
        },
        products: panier
    }

    var nameErr = addressErr = cityErr = emailErr = cityCodeErr = true;
    function sendErr(id, color) {
        document.querySelector(`#${id}`).style.borderColor = color;
    }
    
    if (form.name.value == "") {
        sendErr("name","red");
        alert("Champ Nom vide");
    } else {
        var regex = /^[a-zA-Z-\s]+$/;
        if (regex.test(form.name.value) === false) {
            sendErr("name","red");
            alert("Champ Nom incorrect");
        } else {
            sendErr("name","#ced4da");
            nameErr = false;
        }
    }

    if (form.firstName.value == "") {
        sendErr("firstName","red");
        alert("Champ Prénom vide");
    } else {
        var regex = /^[a-zA-Z-\s]+$/;
        if (regex.test(form.firstName.value) === false) {
            sendErr("firstName","red");
            alert("Champ Prénom incorrect");
        } else {
            sendErr("firstName","#ced4da");
            firstNameErr = false;
        }
    }

    if (form.address.value == "") {
        sendErr("address","red");
        alert("Champ Adresse vide");
    } else {
        var regex = /^[a-zA-Z-\s]+$/;
        if (regex.test(form.address.value) === false) {
            sendErr("address","red");
            alert("Champ Adresse incorrect");
        } else {
            sendErr("address","#ced4da");
            addressErr = false;
        }
    }

    if (form.city.value == "") {
        sendErr("city","red");
        alert("Champ Ville vide");
    } else {
        var regex = /^[a-zA-Z-\s]+$/;
        if (regex.test(form.city.value) === false) {
            sendErr("city","red");
            alert("Champ Ville incorrect");
        } else {
            sendErr("city","#ced4da");
            cityErr = false;
        }
    }

    if (form.cityCode.value == "") {
        sendErr("cityCode","red");
        alert("Champ Code Postal vide");
    } else {
        var regex = /^[0-9]{5}$/;
        if (regex.test(form.cityCode.value) === false) {
            sendErr("cityCode","red");
            alert("Champ Code Postal incorrect");
        } else {
            sendErr("cityCode","#ced4da");
            cityCodeErr = false;
        }
    }

    if (form.email.value == "") {
        sendErr("email","red");
        alert("Champ Adresse Email vide");
    } else {
        var regex = /^\S+@\S+\.\S+$/;
        if (regex.test(form.email.value) === false) {
            sendErr("email","red");
            alert("Champ Adresse Email incorrect");
        } else {
            sendErr("email","#ced4da");
            emailErr = false;
        }
    }

    if ((nameErr || firstNameErr || addressErr || cityErr || emailErr || cityCodeErr) == true) {
        return false;
    } else {
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
    }


})

