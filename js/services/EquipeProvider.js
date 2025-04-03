import Equipe from '../models/Equipe.js';
export default class EquipeProvider {


    static async fetchTeamById(id) {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
    
        try {
            const response = await fetch(`http://localhost:3000/team/${id}`, options);
            if (!response.ok) {
                throw new Error(`Erreur lors de la récupération de l'équipe avec l'ID ${id}`);
            }
    
            const data = await response.json();
    
            // Reconstituer les cartes depuis leurs ID
            const cards = await Promise.all(data.ids.map(async cardId => {
                try {
                    const cardResponse = await fetch(`http://localhost:3000/cards/${cardId}`, options);
                    if (!cardResponse.ok) {
                        throw new Error(`Erreur carte ${cardId}`);
                    }
                    return await cardResponse.json();
                } catch (error) {
                    console.error(`Erreur carte ${cardId}:`, error);
                    return null;
                }
            }));
    
            const validCards = cards.filter(c => c !== null);
            const level = data.level || 1; 
            return new Equipe(data.id, validCards, data.level ?? 1); 
    
        } catch (error) {
            console.error("Erreur dans fetchTeamById :", error);
            return null;
        }
    }
    
    

    static async fetchAllTeam() {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await fetch(`http://localhost:3000/team`, options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const json = await response.json();

            const teams = await Promise.all(json.map(async data => {
                const cards = await Promise.all(data.ids.map(async id => {
                    try {
                        const cardResponse = await fetch(`http://localhost:3000/cards/${id}`, options);
                        if (!cardResponse.ok) {
                            throw new Error(`HTTP error! status: ${cardResponse.status}`);
                        }
                        return await cardResponse.json();
                    } catch (error) {
                        console.error(`Erreur lors de la récupération de la carte avec l'id ${id}:`, error);
                        return null;
                    }
                }));

                const validCards = cards.filter(card => card !== null);
                const equipe = new Equipe(data.id, validCards, data.level ?? 1);
                return equipe;
            }));

            return teams;
        } catch (error) {
            console.error("Il y a eu une erreur lors de la récupération des équipes:", error);
            return [];
        }
    }
    static async createTeam(listcard, level = 1) {
        if (!Array.isArray(listcard) || listcard.length !== 6) {
            console.error("Erreur : La liste doit contenir exactement 6 éléments.");
            return null;
        }
    
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ids: listcard, level }) // ← inclure le niveau
        };
    
        try {
            const response = await fetch('http://localhost:3000/team', options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Erreur lors de la création de l'équipe:", error);
            return null;
        }
    }
    
    static async deleteTeam(id) {
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await fetch(`http://localhost:3000/team/${id}`, options);
            if (response.status === 200 || response.status === 204) {
                return true;
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error("Erreur lors de la suppression de l'équipe:", error);
            return false;
        }
    }

    // une méthode pour que les teams montent de niveau
    static async levelUpTeam(id, currentLevel) {
        const shouldLevelUp = Math.random() < 0.5; // on a 1 chance sur 2 de level up
        if (!shouldLevelUp) return false;
    
        const newLevel = currentLevel + 1;
    
        try {
            const response = await fetch(`http://localhost:3000/team/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ level: newLevel })
            });
    
            if (!response.ok) {
                throw new Error(`Erreur lors du level up : ${response.status}`);
            }
    
            return true;
        } catch (error) {
            console.error("Erreur pendant le level up :", error);
            return false;
        }
    }
    
}