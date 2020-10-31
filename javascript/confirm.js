//ID de la commande et montant total du panier
const orderId = document.location.search.replace(/^.*?\=/, '')
var order = orderId.split("|")
//Affichage du message de confirmation de commande
const orderConfirm = document.querySelector('#orderConfirm')
orderConfirm.innerHTML = `Merci pour votre Achat. Votre commande a bien été effectué pour un montant de : ${order[1] * 0.01} € .</br>
L'id de la commande est : ${order[0]}`
