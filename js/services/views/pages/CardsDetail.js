import CardsProvider from "../../CardsProvider.js";

export default class DetailCard {
    constructor() {
        this.id = null;
    }

    static async render(request) {
        const id = request.id;
        let card = await CardsProvider.getCards(id);
        return `
        <section>
        <h2> Article Index ${card.id}</h2>
        <p>${card.name}</p>
        </section>
        `;
    }
}