import {ENDPOINT} from '../config.js'
import Personnage from '../models/Personnage.js';

export default class CardsProvider {
    static fetchCards = async (limit = 10) => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await fetch(`${ENDPOINT}?limit=${limit}`, options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
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