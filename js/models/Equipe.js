export default class Equipe {
    constructor(id, listpersonnage, level = 1) {
        this.id = id;
        this.listpersonnage = listpersonnage;
        this.level = level;
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
    getLevel() {
        return this.level || 1;
    }    
}