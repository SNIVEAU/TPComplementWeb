import CardsProvider from '../../../services/CardsProvider.js';
import Utils from '../../../services/utils.js';
import addFavoris from '../../../services/AddFavoris.js';
export default class Equipe {
    static async render() {
        let cards = await CardsProvider.fetchCards(20);

        // Create a template for the main content
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
            if (!groupedCards[type]) {
            groupedCards[type] = [];
            }
            groupedCards[type].push(card);
        });

        const template = `
            <div class="container my-5">
            <h2 class="mb-4 text-center">Les Cartes Classées par Type</h2>
            ${Object.keys(groupedCards).map(type => {
                let bgClass = typeColors[type] || "bg-secondary text-white";
                return `
                <div class="mb-5">
                    <h3 class="p-3 ${bgClass} text-center rounded">${type}</h3>
                    <div class="row">
                    ${groupedCards[type].map(card => {
                        let imageUrl = card.imageURL || "https://static.wikia.nocookie.net/dbz-dokkanbattle/images/5/51/Card_3000270_thumb.png";
                        return `
                        <div class="col-sm-6 col-md-4 col-lg-3 mb-4">
                            <div class="card h-100 shadow-sm border-0">
                            <a href="#/cards/${card.id}">
                                <img src="${imageUrl}" class="card-img-top" alt="${card.name}" onerror="this.src='https://static.wikia.nocookie.net/dbz-dokkanbattle/images/5/51/Card_3000270_thumb.png';">
                            </a>
                            <div class="card-body text-center">
                                <h5 class="card-title">${card.name}</h5>
                                <p class="mb-1"><strong>${card.title}</strong></p>
                                <span class="badge bg-dark">${card.rarity}</span>
                                <span class="badge bg-info">Max Lvl: ${card.maxLevel}</span>
                                <span class="badge bg-warning text-dark">Coût: ${card.cost}</span>
                            </div>
                            </div>
                        </div>
                        `;
                    }).join('')}
                    </div>
                </div>
                `;
            }).join('')}
            </div>
        `;

        // Append the template to the body or a specific element
        document.body.innerHTML += template;
    }
}