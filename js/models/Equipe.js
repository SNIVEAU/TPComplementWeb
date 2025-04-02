export default class Equipe {
    constructor(id,listpersonnage) {
        this.id = id;
        this.listpersonnage = listpersonnage;   
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