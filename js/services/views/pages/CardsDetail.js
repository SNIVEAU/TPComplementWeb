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
        return `
        <section>
            
            <h1>${card.name}</h1>
            <div class="passive">
            <p>Aptitude passive</p>
            <p>${card.passive}</p>
            </div>
            <div class="leaderSkill">
            <p>Capacité de leader</p>
            <p>${card.leaderSkill}</p>
            </div>
            <img src="${card.imageURL}" alt="${card.name}" loading="lazy">
            <div class="attaquespeciale">
            <p>Attaque spéciale</p>
            <p>${card.superAttack}</p>
            ${card.ultraSuperAttack ? `
            <p>Attaque spéciale ultime</p>
            <p>${card.ultraSuperAttack}</p>` : ''}
            </div>
            <div class="categories">
            <table>
            <thead>
            <tr>
            <th>Catégories</th>
            </tr>
            </thead>
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
            <div class="liens">
            <table>
            <thead>
            <tr>
            <th>Liens</th>
            </tr>
            </thead>
            <tbody>
            ${card.links.map(link => `<tr><td>${link}</td></tr>`).join('')}
            </tbody>
            </table>
            </div>
            <div class="favoris">
            <button id="favorisBtn">Ajouter aux favoris</button>
            </div>
            
        </section>
        `;

        

        
    }
}