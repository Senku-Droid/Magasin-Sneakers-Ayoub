// role: affiche les infos du hero dans la page
// parametres: data objet JSON avec les donnees
// return: rien la fonction modifie juste le HTML
function afficherHero(data) {
    document.querySelector("#titre").textContent = data.nomCommercial;
    document.querySelector("#accroche").textContent = data.phraseAccroche;
    document.querySelector("#action").textContent = data.texteAppelAction;
}

// role: met les 3 avantages clients dans les bon endroits
// parametres: data objet JSON
// return: rien
function afficherAvantages(data) {
    document.querySelector("#avantage-1").textContent = data.avantagesClients[0];
    document.querySelector("#avantage-2").textContent = data.avantagesClients[1];
    document.querySelector("#avantage-3").textContent = data.avantagesClients[2];
}

// role: cree les cards produits et les ajoutes dans le container
// parametres: data objet JSON
// return: rien affichage des produits
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

// role: affiche les services dans la section correspondante
// parametres: data objet JSON
// return: rien
function afficherServices(data) {
    const servicesContainer = document.querySelector("#services-container");
    servicesContainer.innerHTML = "";
    data.services.forEach((service) => {
        const serviceDiv = document.createElement("div");
        serviceDiv.classList.add("service");
        serviceDiv.innerHTML = `
            <img src="${service.image}" alt="${service.nom}" />
            <h3>${service.nom}</h3>
            <p>${service.description}</p>
        `;
        servicesContainer.appendChild(serviceDiv);
    });
}

// role: affiche les avis clients
// parametres: data objet JSON
// return: rien
function afficherAvis(data) {
    const avisContainer = document.querySelector("#avis-container");
    avisContainer.innerHTML = "";
    const avisClients = data.temoignages || data.avis || [];

    avisClients.forEach((avis) => {
        // Creer des etoiles a partir de la note
        const etoiles = "⭐".repeat(avis.note || 5);
        
        const avisDiv = document.createElement("div");
        avisDiv.classList.add("avis");
        avisDiv.innerHTML = `
            <div class="avis-header">
                <span class="etoiles">${etoiles}</span>
                <span class="experience">${avis.typeExperience || ""}</span>
            </div>
            <p class="avis-texte">${avis.commentaire}</p>
            <div class="client">
                <img src="${avis.image || "assets/logo-bon-pied1.png"}" alt="${avis.nom || avis.prenom || "Client"}" />
                <span class="name">${avis.nom || avis.prenom || "Client"}</span>
            </div>
        `;
        avisContainer.appendChild(avisDiv);
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
            afficherServices(data);
            afficherAvis(data);
        })
}

chargerDonnees();






const header = document.querySelector("header");

window.addEventListener("scroll", function () {
    // Le header revient seulement quand on est tout en haut.
    if (window.scrollY <= 0) {
        header.classList.remove("header-hidden");
    } else {
        header.classList.add("header-hidden");
    }
});

