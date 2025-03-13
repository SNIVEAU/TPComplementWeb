import CardsProvider from "../../CardsProvider.js";

export default class CardsAll {
    static async render(){
        let card = await CardsProvider.fetchCards(20);
        let view = `
        <h2> Les Carte </h2>
        <ul>
        ${card.map(card =>`
            <li><a href="#/cards/${card.id}">${card.name}</a></li>`).join('')}
        </ul>
        `;
        return view;
    }
}