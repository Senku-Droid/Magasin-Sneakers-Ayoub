// role: affiche les infos du hero dans la page
// parametres: data (objet JSON avec les donnees)
// return: rien (la fonction modifie juste le HTML)
function afficherHero(data) {
    document.querySelector("#titre").textContent = data.nomCommercial;
    document.querySelector("#accroche").textContent = data.phraseAccroche;
    document.querySelector("#action").textContent = data.texteAppelAction;
}

// role: met les 3 avantages clients dans les bon endroits
// parametres: data (objet JSON)
// return: rien
function afficherAvantages(data) {
    document.querySelector("#avantage-1").textContent = data.avantagesClients[0];
    document.querySelector("#avantage-2").textContent = data.avantagesClients[1];
    document.querySelector("#avantage-3").textContent = data.avantagesClients[2];
}

// role: cree les cards produits et les ajoutes dans le container
// parametres: data (objet JSON)
// return: rien (affichage des produits)
function afficherProduits(data) {
    const sneakersContainer = document.querySelector("#sneakers-container");
    sneakersContainer.innerHTML = "";

    data.produits.forEach((sneaker) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${sneaker.image}" alt="${sneaker.nom}" />
            <h3>${sneaker.nom}</h3>
            <p>${sneaker.description}</p>
        `;
        sneakersContainer.appendChild(card);
    });
}

// role: recupere le fichier json puis lance les fonctions d'affichage
// parametres: aucun
// return: rien
function chargerDonnees() {
    fetch("sneakers.json")
        .then((response) => response.json())
        .then((data) => {
            afficherHero(data);
            afficherAvantages(data);
            afficherProduits(data);
        });
}

chargerDonnees();






const header = document.querySelector("header");

// On garde la position du scroll precedente.
let ancienScroll = 0;

window.addEventListener("scroll", function () {
	// Position actuelle du scroll.
	const nouveauScroll = window.scrollY;

	// Si on descend, on cache le header.
	if (nouveauScroll > ancienScroll) {
		header.classList.add("header-hidden");
	} else {
		// Si on remonte, on affiche le header.
		header.classList.remove("header-hidden");
	}

	// On met a jour pour le prochain scroll.
	ancienScroll = nouveauScroll;
});

