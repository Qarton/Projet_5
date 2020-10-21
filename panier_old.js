//Panier
var panier = JSON.parse(localStorage.getItem("add"))
const findPanier = document.querySelector("#num_panier")
//Affichage et prix du panier
var totalPrice = 0
for(var i = 0; i < panier.length; i++) {
    totalPrice += panier[i].price;  // Iterate over your first array and then grab the second element add the values up
    console.log(panier[i].name)
}

findPanier.innerHTML = `nombre d'objet : ${panier.length} prix total : ${totalPrice*0.01} €`

//Affichage liste des objets
function getList() {
    panier.forEach(item => getItem(item));
}; 

const findDiv = document.querySelector("#list")
function getItem(item){
    
    const newElement = document.createElement("div")
    newElement.className = "content"
    newElement.innerHTML = `
    <div class="row p-5">
        <div class="col-4">
            <img class="img-fluid" src="${item.image}"></img>
        </div>
            <div class="col-8">
                <p>Modèle : ${item.name}</p>
                <p>Prix : ${item.price*0.01} €</p>
                <p>Option : ${item.option}</p>
                <button class="del-item">Supprimer</button>
            </div>
    </div>
    `
    findDiv.append(newElement)
//Bouton de suppression de l'objet
    const delButton = newElement.querySelector(".del-item")
    delButton.addEventListener("click", event => {
        
        function removeElement(panier, item) {
            console.log(panier)
            var index = panier.indexOf(item);
            if (index > -1) {
                panier.splice(index, 1);
            }
        }
        removeElement(panier, item)
        localStorage.setItem("add" , JSON.stringify(panier))
    })
}
getList();