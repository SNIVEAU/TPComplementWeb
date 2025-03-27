export default class FavoriCardAll{
    static async render(){
        let cards = localStorage.getItem("favoris")
        console.log(cards);
        if (cards) {
            cards = JSON.parse(cards);
            let defaultImage = "https://static.wikia.nocookie.net/dbz-dokkanbattle/images/5/51/Card_3000270_thumb.png";

            let view = `<div class="container my-5">
                <h2 class="mb-4 text-center">Mes Cartes Favoris</h2>
                <div class="row">`;

            view += cards.map(card => {
                let imageUrl = card.imageURL ? card.imageURL : defaultImage;
                return `
                    <div class="col-sm-6 col-md-4 col-lg-3 mb-4">
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
                    </div>
                `;
            }).join('');

            view += `</div></div>`;
            return view;
        } else {
            return `<div class="container my-5">
                <h2 class="mb-4 text-center">Mes Cartes Favoris</h2>
                <p class="text-center">Aucune carte en favoris pour le moment.</p>
            </div>`;
        }
        return
    }
}