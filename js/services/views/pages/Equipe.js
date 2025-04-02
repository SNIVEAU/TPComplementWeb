import CardsProvider from '../../../services/CardsProvider.js';
import EquipeProvider from '../../../services/EquipeProvider.js';

export default class Equipe {
    static async render() {
        let cards = await CardsProvider.fetchCards(20);
        let defaultImage = "https://static.wikia.nocookie.net/dbz-dokkanbattle/images/5/51/Card_3000270_thumb.png";

        const template = `
            <div class="container my-5">
                <h2 class="mb-4 text-center">Choisis des cartes à ajouter à ton équipe</h2>
                <div class="row">
                    <div class="col-lg-9">
                        <div class="row" id="card-list">
                            ${cards.map(card => {
                                let imageUrl = card.imageURL || defaultImage;
                                return `
                                    <div class="col-sm-6 col-md-4 col-lg-3 mb-4">
                                        <div class="card h-100 shadow-sm border-0 draggable-card" 
                                            draggable="true" 
                                            data-card-id="${card.id}" 
                                            data-card-name="${card.name}"
                                            data-card-img="${imageUrl}">
                                            <img src="${imageUrl}" class="card-img-top" alt="${card.name}" onerror="this.src='${defaultImage}';">
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
                                        style="width: 80px; height: 80px; background-color: #f8f9fa;">
                                        <span class="text-muted">Slot ${i}</span>
                                    </div>
                                `).join('')}
                            </div>
                            <button class="btn btn-primary w-100 mt-3" id="saveEquipe">Enregistrer l'équipe</button>
                            <button class="btn btn-secondary w-100 mt-3" id="resetButton">Réinitialiser</button>
                        </div>
                    </aside>
                </div>
            </div>
        `;
        return template;
    }

    static async after_render() {
        console.log("after_render appelé !");
        console.log("Cartes trouvées :", document.querySelectorAll('.draggable-card').length);
        console.log("Slots trouvés :", document.querySelectorAll('.slot').length);

        // Attendre que le DOM soit complètement chargé
        setTimeout(() => {
            // Drag des cartes
            const cards = document.querySelectorAll('.draggable-card');
            console.log('Cartes trouvées:', cards.length);
            
            cards.forEach(card => {
                card.addEventListener('dragstart', (e) => {
                    console.log('Drag start:', card.dataset.cardId);
                    e.dataTransfer.setData('text/plain', ''); // Nécessaire pour Firefox
                    e.dataTransfer.setData('card-id', card.dataset.cardId);
                    e.dataTransfer.setData('card-name', card.dataset.cardName);
                    e.dataTransfer.setData('card-img', card.dataset.cardImg);
                });
            });
    
            // Drop dans les slots
            const slots = document.querySelectorAll('.slot');
            console.log('Slots trouvés:', slots.length);
            
            slots.forEach(slot => {
                slot.addEventListener('dragover', event => {
                    event.preventDefault();
                    slot.classList.add('drag-over');
                });
                
                slot.addEventListener('dragleave', event => {
                    slot.classList.remove('drag-over');
                });
    
                slot.addEventListener('drop', event => {
                    event.preventDefault();
                    slot.classList.remove('drag-over');
                    
                    if (slot.querySelector('img')) return;
    
                    const cardId = event.dataTransfer.getData('card-id');
                    const cardName = event.dataTransfer.getData('card-name');
                    const cardImg = event.dataTransfer.getData('card-img');
                    
                    console.log('Drop card:', cardId, cardName);
    
                    slot.dataset.cardId = cardId;
    
                    slot.innerHTML = `
                        <img src="${cardImg}" alt="${cardName}" class="img-fluid rounded" style="max-width: 100%; max-height: 100%;">
                    `;
                });
            });
    
            // Bouton de réinitialisation
            document.getElementById('resetButton').addEventListener('click', () => {
                window.location.reload();
            });
    
            // Bouton d'enregistrement d'équipe
            document.getElementById('saveEquipe').addEventListener('click', () => {
                let listeCard = [];
                const slots = document.querySelectorAll('.slot');
    
                slots.forEach(slot => {
                    const img = slot.querySelector('img');
                    if (img) {
                        const cardId = slot.dataset.cardId;
                        if (cardId) listeCard.push(cardId);
                    }
                });
    
                EquipeProvider.createTeam(listeCard);

                alert("Équipe enregistrée !");
                
            });
        }, 100); // Petit délai pour s'assurer que le DOM est prêt
    }
}
