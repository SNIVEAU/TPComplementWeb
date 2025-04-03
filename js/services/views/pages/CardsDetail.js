import CardsProvider from "../../CardsProvider.js";
import addFavoris from "../../AddFavoris.js";

export default class DetailCard {
    constructor() {
        this.id = null;
    }
    
    static async render(request) {
        const id = request.id;
        let card = await CardsProvider.getCard(id);
        console.log(card);
        // le setimeout permet d'attendre que le dom soit généré avant d'ajouter la fonction
        // ce qui évite les erreurs
        setTimeout(() => { 
            const btn = document.getElementById("favorisBtn");
            if (btn) {
                btn.addEventListener("click", () => addFavoris(card));
            }
        }, 0);
        let defaultImage = "https://static.wikia.nocookie.net/dbz-dokkanbattle/images/5/51/Card_3000270_thumb.png";
        let template =`
        <div class="container my-5">
            <div class="card shadow-lg">
            <div class="card-header text-center bg-primary text-white">
            <h1>${card.name}</h1>
            </div>
            <div class="card-body">
            <div class="row">
            <div class="col-md-4 text-center">
                <img src="${card.imageURL}" class="img-fluid rounded" alt="${card.name}" onerror="this.src='${defaultImage}';">
            </div>
            <div class="col-md-8">
                <div class="mb-3">
                <h5 class="fw-bold">Aptitude Passive</h5>
                <p class="text-muted">${card.passive}</p>
                </div>
                <div class="mb-3">
                <h5 class="fw-bold">Capacité de Leader</h5>
                <p class="text-muted">${card.leaderSkill}</p>
                </div>
                <div class="mb-3">
                <h5 class="fw-bold">Attaque Spéciale</h5>
                <p class="text-muted">${card.superAttack}</p>
                ${card.ultraSuperAttack ? `
                <h5 class="fw-bold">Attaque Spéciale Ultime</h5>
                <p class="text-muted">${card.ultraSuperAttack}</p>
                ` : ''}
                </div>
            </div>
            </div>

            <hr>

            <div class="row">
            <div class="col-md-6">
                <h5 class="fw-bold text-center">Catégories</h5>
                <table class="table table-striped">
                <tbody>
                ${card.categories.reduce((rows, category, index) => {
                if (index % 2 === 0) {
                    rows.push(`<tr><td>${category}</td>`);
                } else {
                    rows[rows.length - 1] += `<td>${category}</td></tr>`;
                }
                return rows;
                }, []).join('')}
                ${card.categories.length % 2 !== 0 ? '<td></td></tr>' : ''}
                </tbody>
                </table>
            </div>
            <div class="col-md-6">
                <h5 class="fw-bold text-center">Liens</h5>
                <table class="table table-striped">
                <tbody>
                ${card.links.map(link => `<tr><td>${link}</td></tr>`).join('')}
                </tbody>
                </table>
            </div>
            </div>

            
            </div>
            </div>
        </div>
        `;

        let btnfavoris =`<div class="d-flex justify-content-center mt-4">
        <button id="favorisBtn" style="background-color: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Ajouter aux favoris</button>
    </div>`;

        let cardsfavoris = localStorage.getItem("favoris")
        if (cardsfavoris) {
            cardsfavoris = JSON.parse(cardsfavoris);
            let cardFavoris = cardsfavoris.find(favori => {
                return card.id == favori.id
            })
            if (cardFavoris) {
                btnfavoris = `<div class="d-flex justify-content-center mt-4">
                <button id="supprimerFavorisBtn" style="background-color: #dc3545; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Supprimer des favoris</button>
            </div>`;
                setTimeout(() => {
                    const btnSupprimer = document.getElementById("supprimerFavorisBtn");
                    if (btnSupprimer) {
                        btnSupprimer.addEventListener("click", () => {
                            const updatedFavoris = cardsfavoris.filter(favori => favori.id !== card.id);
                            localStorage.setItem("favoris", JSON.stringify(updatedFavoris));
                            alert("Carte supprimée des favoris !");
                            location.reload();
                        });
                    }
                }, 0);
            }
        }
        template += btnfavoris;
        return template;

        

        
    }
}
