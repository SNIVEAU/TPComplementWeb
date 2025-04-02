import EquipeProvider from '../../../services/EquipeProvider.js';

// filepath: /home/iut45/Etudiants/o22204836/Documents/complementweb/TPComplementWeb/js/services/views/pages/MesEquipe.js

export default class MesEquipe {
    static async render() {
        let teams = await EquipeProvider.fetchAllTeam();

        window.deleteTeam = async function (id) {
            console.log("Suppression de l'équipe avec l'ID :", id);
            const success = await EquipeProvider.deleteTeam(id);
            if (success) {
                alert("Équipe supprimée avec succès !");
                location.reload();
            } else {
                alert("Erreur lors de la suppression de l'équipe.");
            }
        };
        
        console.log("Équipes récupérées:", teams);
        const defaultImage = "https://static.wikia.nocookie.net/dbz-dokkanbattle/images/5/51/Card_3000270_thumb.png";

        let view = `
            <div class="container my-5">
                <h2 class="mb-4 text-center">Mes Équipes</h2>
                <div class="row">
        `;

        if (teams.length === 0) {
            view += `
                <div class="col-12 text-center">
                    <p class="text-muted">Aucune équipe enregistrée pour le moment.</p>
                </div>
            `;
        } else {
            teams.forEach((team, index) => {
                console.log("Équipe:", team.id)
                const level = team.level || 1;

                view += `
                    <div class="col-md-6 col-lg-4 mb-4">
                        <div class="card shadow-sm border-0">
                            <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                                <span>Équipe ${index + 1} - Niveau ${level}</span>
                                <button class="btn btn-danger btn-sm" onclick="deleteTeam('${team.id}')">Supprimer</button>
                            </div>
                            <div class="card-body d-flex flex-wrap justify-content-center gap-2">
                `;

                if (Array.isArray(team.listpersonnage)) {
                    team.listpersonnage.forEach(card => {
                        let imageUrl = card.imageURL || defaultImage;
                        view += `
                            <img src="${imageUrl}" alt="${card.name}" class="img-fluid rounded" style="width: 80px; height: 80px;" onerror="this.src='${defaultImage}';">
                        `;
                    });
                } else {
                    console.warn(`Expected an array for team.listpersonnage at index ${index}, but got:`, team.listpersonnage);
                }

                view += `
                            </div>
                        </div>
                    </div>
                `;
            });
        }

        view += `
                </div>
                <div class="text-center">
                    <a href="#/equipecreate" class="btn btn-primary">Créer une nouvelle équipe</a>
                </div>
            </div>
        `;

        return view;
    }
}
