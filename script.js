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

        if (sneaker.nom === "Sneakers Classic") {
            card.innerHTML = `
                <img class="classic-product-image" src="${sneaker.image}" alt="${sneaker.nom}" />
                <h3>${sneaker.nom}</h3>
                <p>${sneaker.description}</p>
                <div class="classic-colors" aria-label="Choisir une couleur pour ${sneaker.nom}">
                    <button class="classic-color-option is-active" type="button" data-image="assets/diff-couleur/beige.png" aria-label="Beige" style="background-color: #d8c7aa;"></button>
                    <button class="classic-color-option" type="button" data-image="assets/diff-couleur/grise.png" aria-label="Gris" style="background-color: #6e6e6e;"></button>
                    <button class="classic-color-option" type="button" data-image="assets/diff-couleur/marron.png" aria-label="Marron" style="background-color: #4a3121;"></button>
                    <button class="classic-color-option" type="button" data-image="assets/diff-couleur/verte.png" aria-label="Vert" style="background-color: #6b704c;"></button>
                </div>
            `;
        } else {
            card.innerHTML = `
                <img src="${sneaker.image}" alt="${sneaker.nom}" />
                <h3>${sneaker.nom}</h3>
                <p>${sneaker.description}</p>
                <div class="classic-colors classic-colors-static" aria-hidden="true">
                    ${cercleNoir(sneaker.nom)}
                </div>
            `;
        }

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
            <button class="service-btn" type="button">${service.bouton}</button>
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
        const etoiles = "⭐".repeat(avis.note);

        const avisDiv = document.createElement("div");
        avisDiv.classList.add("avis");
        avisDiv.innerHTML = `
            <div class="avis-header">
                <span class="etoiles">${etoiles}</span>
                <span class="experience">${avis.typeExperience}</span>
            </div>
            <p class="avis-texte">${avis.commentaire}</p>
            <div class="client">
                <img src="${avis.image}" alt="${avis.nom || avis.prenom}" />
                <span class="name">${avis.nom || avis.prenom}</span>
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
        });
}

chargerDonnees();

const couleursParProduit = {
    "Sneakers Urbaines": ["#1f1f1f", "#4f46e5", "#0ea5e9", "#f97316"],
    "Sneakers Légères": ["#f5f5f4", "#a8a29e", "#60a5fa", "#34d399"],
    "Sneakers Hautes Performance": ["#111827", "#dc2626", "#f59e0b", "#16a34a"],
    "Sneakers Vintage Éco-sourcées": ["#a16207", "#92400e", "#6b7280", "#5b8f5a"],
    "Sneakers Minimal Éco": ["#e5e7eb", "#9ca3af", "#6b7280", "#374151"]
};

// role: fait un contour noir quand on clique dessus
function cercleNoir(nomSneaker) {
    const couleurs = couleursParProduit[nomSneaker] || [];

    return couleurs
        .map((couleur, index) => {
            const activeClass = index === 0 ? " is-active" : "";
            return `<button class="classic-color-dot${activeClass}" type="button" style="background-color: ${couleur};" aria-label="Couleur ${index + 1}"></button>`;
        })
        .join("");
}




// role: affiche ou cache le header en fonction du scroll
const header = document.querySelector("header");

window.addEventListener("scroll", function () {
    // Le header revient quand on et57
    if (window.scrollY <= 0) {
        header.classList.remove("header-hidden");
    } else {
        header.classList.add("header-hidden");
    }
});

// role: changer la couleur de la sneakker clasic
// parametres: aucun 
// return: rien la fonction mofidie l'html
function changerCouleursSneakersClassic() {
    const sneakersContainer = document.querySelector("#sneakers-container");

    sneakersContainer.addEventListener("click", function (event) {
        const boutonCouleur = event.target.closest(".classic-color-option");

        if (!boutonCouleur) {
            return;
        }

        const carte = boutonCouleur.closest(".card");
        const imageProduit = carte.querySelector(".classic-product-image");

        imageProduit.src = boutonCouleur.dataset.image;

        carte.querySelectorAll(".classic-color-option").forEach((autreBouton) => {
            autreBouton.classList.remove("is-active");
        });

        boutonCouleur.classList.add("is-active");
    });
}

changerCouleursSneakersClassic();

// role: mettre contour noir
// parametres: aucun juste effet visule
// return: rien la fonction change l'html
function activerContourProduits() {
    const sneakersContainer = document.querySelector("#sneakers-container");

    sneakersContainer.addEventListener("click", function (event) {
        const boutonCouleur = event.target.closest(".classic-colors-static .classic-color-dot");

        if (!boutonCouleur) {
            return;
        }

        const blocCouleurs = boutonCouleur.closest(".classic-colors-static");

        blocCouleurs.querySelectorAll(".classic-color-dot").forEach((autreBouton) => {
            autreBouton.classList.remove("is-active");
        });

        boutonCouleur.classList.add("is-active");
    });
}

activerContourProduits();

