const getId = document.location.search.replace(/^.*?\=/,'')
var choosedOption
const alertChoice = document.querySelector("#alert-objet")
//Affichage du produit et de la personnalisation
async function getList() {
    const api_url = `http://localhost:3000/api/teddies/${getId}`;
    const response = await fetch(api_url);
    const item = await response.json();
    //Produit
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
                <p>Prix : ${item.price*0.01} €</p>
                <p>description : ${item.description}</span></p>
                <button class="add-item" type="submit">
                <a href=#>Ajouter au panier</a>
                </button>
            </div>
    </div>
    `
    findDivPerso.append(newElement)
    //Personnalisation
    const itemPers = Object.values(item)[0]
    itemPers.forEach(opt => optItem(opt))
    //affichage personnalisation
    function optItem(opt){
    const findOpt = document.querySelector("#perso")
    const newOpt = document.createElement("option")
    newOpt.value = opt
    newOpt.innerHTML = opt
    findOpt.append(newOpt)
    //Ecoute de l'option
    findOpt.addEventListener('change', event =>{
        choosedOption = event.target.value
    })
    }
    //Panier
    let panier
    if(!localStorage.getItem("panier")){
        panier = []
    }else{
        panier = JSON.parse(localStorage.getItem("panier"))
    }

    
    //Enregistrement objet
    const addButton = newElement.querySelector(".add-item")
    addButton.addEventListener("click", event => {
        //Tableau objet + option (voir pour suppr finalArray)
        let idArray = [getId]
        if(choosedOption === undefined){
            alertChoice.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Sélectionner une option avant d'ajouter l'objet dans le panier
            </div>
            `
            const findOpt = document.querySelector("#perso")
            findOpt.className = "border border-danger"
        }
        else if(panier === null) {
            localStorage.setItem("panier",JSON.stringify(idArray))
            window.location.href = 'index.html'
        } else {
            panier.push(getId)
            localStorage.setItem("panier" , JSON.stringify(panier))
            window.location.href = 'index.html'
        }
    })

};
getList()