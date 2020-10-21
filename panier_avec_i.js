var panier = JSON.parse(localStorage.getItem("add"))
const findPanier = document.querySelector("#num_panier")

var totalPrice = 0
for(var i = 0; i < panier.length; i++) {
    totalPrice += panier[i].price;
    console.log(i)

    const findDiv = document.querySelector("#list")

    const newElement = document.createElement("div")
    newElement.className = "content"
    newElement.innerHTML = `
    <div class="row p-5">
        <div class="col-4">
            <img class="img-fluid" src="${panier[i].image}"></img>
        </div>
            <div class="col-8">
                <p>Modèle : ${panier[i].name}</p>
                <p>Prix : ${panier[i].price*0.01} €</p>
                <button class="del-item">Supprimer</button>
            </div>
    </div>
    `
    findDiv.append(newElement)

    const delButton = newElement.querySelector(".del-item")
    delButton.addEventListener("click", event => {
        console.log(panier[i])
    })


}

findPanier.innerHTML = `nombre d'objet : ${panier.length} prix total : ${totalPrice*0.01} €`
