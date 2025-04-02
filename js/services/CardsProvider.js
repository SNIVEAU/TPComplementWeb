import { ENDPOINT } from '../config.js';
import Personnage from '../models/Personnage.js';

export default class CardsProvider {
    static fetchCards = async (limit = 10, page = 1) => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await fetch(`${ENDPOINT}?_limit=${limit}&_page=${page}`, options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const totalCount = response.headers.get('X-Total-Count'); // Optionnel, utile si tu veux savoir combien de pages
            const json = await response.json();
            return json.map(data => new Personnage(data));
        } catch (error) {
            console.error("Il y a eu une erreur lors de la récupération des cartes:", error);
            return [];
        }
    }

    static getCard = async (id) => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await fetch(`${ENDPOINT}/${id}`, options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return new Personnage(data);
        } catch (error) {
            console.error("Il y a eu une erreur lors de la récupération de la carte:", error);
            return null;
        }
    }
}
