//Id du produit sélectionné
const getId = document.location.search.replace(/^.*?\=/, '')
//Contenu du panier dans le local storage
let panier = (!localStorage.getItem("panier")) ? [] : JSON.parse(localStorage.getItem("panier"))
//Personnalisation de l'objet
let choosedOption
//Récupération des informations du produit
async function getItem(id) {
    const api_url = `http://localhost:3000/api/teddies/${id}`;
    const response = await fetch(api_url);
    const item = await response.json();
    return item
};
getItem(getId).then(item => showItem(item))
//Affichage du produit
function showItem(item) {
    const findDivPerso = document.querySelector("#item-perso")
    const newElement = document.createElement("div")
    newElement.className = "item"
    newElement.innerHTML = `
    <div class="row p-5">
        <div class="col-lg-4">
            <img class="img-fluid img-responsive" src="${item.imageUrl}"></img>
        </div>
            <div class="col-lg-8">
                <p>Modèle : ${item.name}</p>
                <p>Prix : ${item.price * 0.01} €</p>
                <p>description : ${item.description}</p>
                <button class="add-item btn btn-secondary" type="submit">
                Ajouter au panier
                </button>
            </div>
    </div>
    `
    findDivPerso.append(newElement)
    //Affichage et choix de la personnalisation
    const itemPers = Object.values(item)[0]
    itemPers.forEach(opt => optItem(opt))
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
    addButton.addEventListener("click", (event) => {
        event.preventDefault();
        //Controle de selection de l'option
        if (choosedOption === undefined) {
            const alertChoice = document.querySelector("#alert-objet");
            alertChoice.className = "text-danger"
            alertChoice.innerHTML = `Sélectionner une couleur`;

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
