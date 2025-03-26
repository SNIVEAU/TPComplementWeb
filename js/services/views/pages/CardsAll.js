import CardsProvider from "../../CardsProvider.js";

export default class CardsAll {
    static async render(){
        let card = await CardsProvider.fetchCards(20);
        console.log(card)
        let view = `
        <h2> Les Cartes </h2>
        <ul>
        ${card.map(card =>`
            <img src="${card.imageURL}" alt="${card.name}" loading="lazy">
            <li><a href="#/cards/${card.id}">${card.name}</a></li>`).join('')}
        </ul>
        `;
        return view;
    }
}