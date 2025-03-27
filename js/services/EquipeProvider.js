export default class EquipeProvider {
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
            return json.map(data => new Equipe(data));
        } catch (error) {
            console.error("Il y a eu une erreur lors de la récupération des cartes:", error);
            return [];
        }

    }

    static async createTeam(listcard) {
        if (!Array.isArray(listcard) || listcard.length !== 6) {
            console.error("Erreur : La liste doit contenir exactement 6 éléments.");
            return null;
        }
    
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ids: listcard })
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
}