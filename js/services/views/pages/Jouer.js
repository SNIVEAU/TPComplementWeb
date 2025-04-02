import EquipeProvider from '../../../services/EquipeProvider.js';
const defaultImage = "https://static.wikia.nocookie.net/dbz-dokkanbattle/images/5/51/Card_3000270_thumb.png";

export default class Jouer {
    static async render() {
        const teams = await EquipeProvider.fetchAllTeam();

        let view = `
        <div class="container my-5">
            <h2 class="mb-4 text-center">Jouer</h2>
            <div class="row">
                <div class="col-12">
                    <h4 class="text-center">Choisissez une équipe :</h4>
                    <div class="d-flex flex-wrap justify-content-center gap-3">
        `;

        if (teams.length === 0) {
            view += `
                <p class="text-muted text-center">Aucune équipe disponible. Créez une équipe pour commencer à jouer.</p>
                <div class="text-center">
                    <a href="#/equipecreate" class="btn btn-primary">Créer une équipe</a>
                </div>
            `;
        } else {
            teams.forEach((team, index) => {
                const teamLevel = team.level ?? 1;
                view += `
                    <div class="card shadow-sm border-0 team-card" data-team-id="${team.id}" style="width: 18rem; cursor: pointer;">
                        <div class="card-header bg-primary text-white text-center team-header" data-team-id="${team.id}">
                            Équipe ${index + 1} - Niveau <span class="team-level" id="level-${team.id}">${teamLevel}</span>
                        </div>
                        <div class="card-body d-flex flex-wrap justify-content-center gap-2">
                `;

                if (Array.isArray(team.listpersonnage)) {
                    team.listpersonnage.forEach(card => {
                        const imageUrl = card.imageURL || defaultImage;
                        view += `
                            <img src="${imageUrl}" alt="${card.name}" class="img-fluid rounded" style="width: 80px; height: 80px;" onerror="this.src='${defaultImage}';">
                        `;
                    });
                }

                view += `
                        </div>
                    </div>
                `;
            });
        }

        view += `
                    </div>
                </div>
            </div>
            <div class="row mt-5">
                <div class="col-12 text-center">
                    <h4>Équipe sélectionnée :</h4>
                    <div id="selected-team" class="my-3 text-center text-muted">Aucune équipe sélectionnée</div>
                    <button class="btn btn-success mt-3" id="playButton" disabled>Jouer</button>
                </div>
            </div>
        </div>
        `;

        return view;
    }

    static async after_render() {
        let selectedTeam = null;

        const teamCards = document.querySelectorAll('.team-card');
        const selectedTeamContainer = document.getElementById('selected-team');
        const playButton = document.getElementById('playButton');

        teamCards.forEach(card => {
            card.addEventListener('click', async () => {
                const teamId = card.dataset.teamId;
                const team = await EquipeProvider.fetchTeamById(teamId);

                if (team) {
                    selectedTeam = team;
                    selectedTeamContainer.innerHTML = `
                        <div class="card shadow-sm border-0 mx-auto" style="width: 18rem;">
                            <div class="card-header bg-success text-white">
                                Équipe Sélectionnée - Niveau ${team.level ?? 1}
                            </div>
                            <div class="card-body d-flex flex-wrap justify-content-center gap-2">
                                ${team.listpersonnage.map(p => `
                                    <img src="${p.imageURL || defaultImage}" class="img-fluid rounded" style="width: 80px; height: 80px;" />
                                `).join('')}
                            </div>
                        </div>
                    `;
                    playButton.disabled = false;
                }
            });
        });

        playButton.addEventListener('click', async () => {
            if (!selectedTeam) return;
            const success = Math.random() < 0.5;
            if (success) {
                const newLevel = (selectedTeam.level ?? 1) + 1;
                await EquipeProvider.levelUpTeam(selectedTeam.id, newLevel);
                const updatedTeam = await EquipeProvider.fetchTeamById(selectedTeam.id);
                selectedTeam.level = updatedTeam.level; // mise à jour locale
                document.getElementById(`level-${selectedTeam.id}`).textContent = updatedTeam.level;
                selectedTeamContainer.querySelector('.card-header').textContent = `Équipe Sélectionnée - Niveau ${updatedTeam.level}`;
                alert(`Félicitations ! L'équipe a gagné un niveau. Niveau actuel : ${updatedTeam.level}`);
            } else {
                alert(`Pas de chance... L'équipe n'a pas gagné de niveau cette fois.`);
            }
        });
    }
}
