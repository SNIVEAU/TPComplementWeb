import CardsProvider from "../../CardsProvider.js";
import Utils from "../../utils.js"; // ← pour lire l'URL (on le suppose ici)

export default class CardsAll {
    static async render(request) {
        const limit = 20;
        const currentPage = parseInt(request?.query?.page || "1");

        const cards = await CardsProvider.fetchCards(limit, currentPage);
        const defaultImage = "https://static.wikia.nocookie.net/dbz-dokkanbattle/images/5/51/Card_3000270_thumb.png";

        const typeColors = {
            "INT": "bg-purple text-white",
            "STR": "bg-danger text-white",
            "PHY": "bg-warning text-dark",
            "AGL": "bg-primary text-white",
            "TEQ": "bg-success text-white"
        };

        let groupedCards = {};
        cards.forEach(card => {
            let type = card.type || "AUTRE";
            if (!groupedCards[type]) groupedCards[type] = [];
            groupedCards[type].push(card);
        });

        let view = `<div class="container my-5">
            <h2 class="mb-4 text-center">Les Cartes Classées par Type</h2>

            <div class="mb-4">
                <input type="text" id="searchInput" class="form-control" placeholder="Rechercher une carte...">
            </div>
        `;

        Object.keys(groupedCards).forEach(type => {
            let bgClass = typeColors[type] || "bg-secondary text-white";
            view += `
            <div class="mb-5">
                <h3 class="p-3 ${bgClass} text-center rounded">${type}</h3>
                <div class="row">`;

            groupedCards[type].forEach(card => {
                let imageUrl = card.imageURL || defaultImage;
                view += `
                    <div class="col-sm-6 col-md-4 col-lg-3 mb-4 card-item" data-name="${card.name.toLowerCase()}">
                        <div class="card h-100 shadow-sm border-0">
                            <a href="#/cards/${card.id}">
                                <img src="${imageUrl}" class="card-img-top" alt="${card.name}" onerror="this.src='${defaultImage}';">
                            </a>
                            <div class="card-body text-center">
                                <h5 class="card-title">${card.name}</h5>
                                <p class="mb-1"><strong>${card.title}</strong></p>
                                <span class="badge bg-dark">${card.rarity}</span>
                                <span class="badge bg-info">Max Lvl: ${card.maxLevel}</span>
                                <span class="badge bg-warning text-dark">Coût: ${card.cost}</span>
                            </div>
                        </div>
                    </div>`;
            });

            view += `</div></div>`;
        });

        // Pagination
        view += `
            <div class="d-flex justify-content-between align-items-center mt-4">
                <button class="btn btn-outline-primary" id="prevPage" ${currentPage <= 1 ? "disabled" : ""}>Page précédente</button>
                <span class="fw-bold">Page ${currentPage}</span>
                <button class="btn btn-outline-primary" id="nextPage">Page suivante</button>
            </div>
        `;

        view += `</div>`; // Fin du container

        // Event bindings
        setTimeout(() => {
            document.getElementById("searchInput").addEventListener("keyup", function () {
                const input = this.value.toLowerCase();
                const cards = document.querySelectorAll(".card-item");

                cards.forEach(card => {
                    const name = card.getAttribute("data-name");
                    card.style.display = name.includes(input) ? "block" : "none";
                });
            });

            // Gestion pagination
            document.getElementById("prevPage")?.addEventListener("click", () => {
                if (currentPage > 1) {
                    window.location.hash = `#/cards?page=${currentPage - 1}`;
                }
            });

            document.getElementById("nextPage")?.addEventListener("click", () => {
                window.location.hash = `#/cards?page=${currentPage + 1}`;
            });
        }, 0);

        return view;
    }
}
