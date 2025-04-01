import CardsProvider from '../../../services/CardsProvider.js';
import Utils from '../../../services/utils.js';
import addFavoris from '../../../services/AddFavoris.js';
import EquipeProvider from '../../../services/EquipeProvider.js';


export default class Equipe {
    static async render() {
        let cards = await CardsProvider.fetchCards(20);
        
        const template = `
            <div class="container my-5">
                <h2 class="mb-4 text-center">Choisis des cartes à ajouter à ton équipe</h2>
                <div class="row">
                    <div class="col-lg-9">
                        <div class="row" id="card-list">
                            ${cards.map(card => {
                                let imageUrl = card.imageURL || "https://static.wikia.nocookie.net/dbz-dokkanbattle/images/5/51/Card_3000270_thumb.png";
                                return `
                                <div class="col-sm-6 col-md-4 col-lg-3 mb-4">
                                    <div class="card h-100 shadow-sm border-0 draggable-card" 
                                         draggable="true" 
                                         data-card-id="${card.id}" 
                                         data-card-name="${card.name}"
                                         data-card-img="${imageUrl}">
                                        <img src="${imageUrl}" class="card-img-top" alt="${card.name}" onerror="this.src='https://static.wikia.nocookie.net/dbz-dokkanbattle/images/5/51/Card_3000270_thumb.png';">
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

                    <aside class="col-lg-3">
                        <div class="bg-light p-3 rounded shadow-sm sticky-top" style="top: 100px;">
                            <h4 class="text-center mb-3">Ton Équipe</h4>
                            <div class="d-flex flex-wrap justify-content-center gap-2" id="slots">
                                ${[1, 2, 3, 4, 5, 6].map(i => `
                                    <div class="slot border border-secondary rounded d-flex align-items-center justify-content-center" 
                                        data-slot-index="${i - 1}"
                                        style="width: 80px; height: 80px; background-color: #f8f9fa;"
                                        ondragover="event.preventDefault()"
                                        ondrop="window.dropCard(event)">
                                        <span class="text-muted">Slot ${i}</span>
                                    </div>
                                `).join('')}
                            </div>
                            <button class="btn btn-primary w-100 mt-3" id="saveEquipe">Enregistrer l'équipe</button>
                            <button class="btn btn-secondary w-100 mt-3"id="resetButton">Réinitialiser</button>
                        </div>
                    </aside>
                </div>
            </div>
        `;



        // Gestion du drag and drop des cartes
        document.body.innerHTML += template;

        const cards2 = document.querySelectorAll('.draggable-card');
        cards2.forEach(card => {
            card.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('card-id', card.dataset.cardId);
                e.dataTransfer.setData('card-name', card.dataset.cardName);
                e.dataTransfer.setData('card-img', card.dataset.cardImg);
                e.dataTransfer.setData('card-cost', card.dataset.cardCost);
            });
        });

        window.dropCard = function (event) {
            event.preventDefault();
            const slot = event.currentTarget;
        
            if (slot.querySelector('img')) return;
        
            const cardName = event.dataTransfer.getData('card-name');
            const cardImg = event.dataTransfer.getData('card-img');
            const cardId = event.dataTransfer.getData('card-id');
        
            slot.dataset.cardId = cardId; // ← on stocke l’id de la carte dans le slot
        
            slot.innerHTML = `
                <img src="${cardImg}" alt="${cardName}" class="img-fluid rounded" style="max-width: 100%; max-height: 100%;">
            `;
        };
        

        // Permet de raffraichir la page lorsqu'on clique sur le bouton "Réinitialiser"
        document.getElementById('resetButton').addEventListener('click', () => {
            window.location.reload();
        });

        // Permet d'ajouter une équipe dans mes équipe
        document.getElementById('saveEquipe').addEventListener('click', () => {
            let listeCard = [];
            const slots = document.querySelectorAll('.slot');
            
            slots.forEach(slot => {
                const img = slot.querySelector('img');
                if (img) {
                    // On récupère l'ID stocké dans le slot
                    const cardId = slot.dataset.cardId;
                    if (cardId) listeCard.push(cardId);
                }
            }); 
            EquipeProvider.createTeam(listeCard);
        });
        
    }
}