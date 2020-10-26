//Id du produit sélectionné
const getId = document.location.search.replace(/^.*?\=/, '')
//Contenu du panier dans le local storage
let panier = (!localStorage.getItem("panier")) ? [] : JSON.parse(localStorage.getItem("panier"))
//Personnalisation de l'objet
let choosedOption


//Récupération des informations du produit
fetch(`http://localhost:3000/api/teddies/${getId}`)
    .then(response => response.json())
    .then(item => getItem(item))
//Affichage des informations du produit
function getItem(item) {
    const findDivPerso = document.querySelector("#item-perso")
    const newElement = document.createElement("div")
    newElement.className = "content"
    newElement.innerHTML = `
    <div class="row p-5">
        <div class="col-4">
            <img class="img-fluid" src="${item.imageUrl}"></img>
        </div>
            <div class="col-8">
                <p>Modèle : ${item.name}</p>
                <p>Prix : ${item.price * 0.01} €</p>
                <p>description : ${item.description}</span></p>
                <button class="add-item btn btn-secondary" type="submit">
                <a href=# class="text-reset">Ajouter au panier</a>
                </button>
            </div>
    </div>
    `
    findDivPerso.append(newElement)
    //Affichage et choix de la personnalisation
    const itemPers = Object.values(item)[0]
    itemPers.forEach(opt => optItem(opt))
    //Affichage
    function optItem(opt) {
        const findOpt = document.querySelector("#perso")
        const newOpt = document.createElement("option")
        newOpt.value = opt
        newOpt.innerHTML = opt
        findOpt.append(newOpt)
        //Ecoute de l'option
        findOpt.addEventListener('change', event => {
            choosedOption = event.target.value
        })
    }
    //Ajout de l'objet au panier
    const addButton = newElement.querySelector(".add-item")
    addButton.addEventListener("click", () => {
        //Controle de selection de l'option
        if (choosedOption === undefined) {
            const alertChoice = document.querySelector("#alert-objet");
            alertChoice.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Sélectionner une option avant d'ajouter l'objet dans le panier
            </div>
            `
            const findOpt = document.querySelector("#perso")
            findOpt.className = "border border-danger"
        }
        else {
            panier.push(getId)
            localStorage.setItem("panier", JSON.stringify(panier))
            window.location.href = 'index.html'
        }
    })
}