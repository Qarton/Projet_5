//Récupération des informations sur les produits
fetch("http://localhost:3000/api/teddies")
        .then(response => response.json())
        .then(items => {items.forEach(item => getItem(item));
        });
/*async function getList() {
    const api_url = "http://localhost:3000/api/teddies";
    const response = await fetch(api_url);
    const list = await response.json();
    list.forEach(item => getItem(item));
};
getList();*/
//Affichage de la liste des produits
function getItem(item){
    const findDiv = document.querySelector("#items-box");
    const newElement = document.createElement("div")
    newElement.className = "item"
    newElement.innerHTML = `
    <div class="row p-1 m-5 border rounded">
        <div class="col-3 m-auto">
            <img class="img-fluid" src="${item.imageUrl}"></img>
        </div>
            <div class="col-9">
                <p>Modèle : ${item.name}</p>
                <p>Prix : ${item.price*0.01} €</p>
                <p>Description : ${item.description}</span></p>
                <div class="text-center">
                <button class="pers-item btn btn-secondary">
                    Personnaliser objet
                </button>
                </div>
            </div>
    </div>
    `
    findDiv.append(newElement)
    //Enregistrement de l'ID de l'objet selectionne et ouverture de la page de personnalisation
    const persButton = newElement.querySelector(".pers-item")
    persButton.addEventListener("click", () => {
        window.document.location = './produit.html' + '?id=' + item._id
    })
}






