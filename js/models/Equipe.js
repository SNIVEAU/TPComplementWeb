export default class Equipe {
    constructor(id, listpersonnage, level = 1) {
        this.id = id;
        this.listpersonnage = listpersonnage;
        this.level = level;
    }
    // Permet l'ajout d'une equipe
    addPersonnage(personnage) {
        this.listpersonnage.push(personnage);
    }

    // Permet de retirer une equipe
    removePersonnage(personnage) {
        this.listpersonnage = this.listpersonnage.filter(p => p.id !== personnage.id);
    }
    // permet de recuperer toutes les equipe
    getPersonnages() {
        return this.listpersonnage;
    }
    //permet de recuper
    getPersonnageById(id) {
        return this.listpersonnage.find(p => p.id === id);
    }

    getLevel() {
        return this.level;
    }

    levelUp() {
        this.level = (this.level ?? 1) + 1;
    }
}
