export default class Equipe {
    constructor(listpersonnage) {
        this.listpersonnage = this.listpersonnage;
    }
    addPersonnage(personnage) {
        this.listpersonnage.push(personnage);
    }
    removePersonnage(personnage) {
        this.listpersonnage = this.listpersonnage.filter(p => p.id !== personnage.id);
    }
    getPersonnages() {
        return this.listpersonnage;
    }
    getPersonnageById(id) {
        return this.listpersonnage.find(p => p.id === id);
    }
}