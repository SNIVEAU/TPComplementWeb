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

        console.log("fetchCards appelée avec page :", page);
        try {
            const response = await fetch(`${ENDPOINT}?_page=${page}&_per_page=${limit}`, options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const json = await response.json();
            if (!Array.isArray(json)) {
                if (json.data && Array.isArray(json.data)) {
                    return json.data.map(data => new Personnage(data));
                }
                throw new Error("Unexpected response format: expected an array or an object with a 'data' array");
            }
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
