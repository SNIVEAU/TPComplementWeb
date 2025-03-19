export default class Personnage {
    constructor(data) {
        this.name = data.name;
        this.title = data.title;
        this.maxLevel = data.maxLevel;
        this.rarity = data.rarity;
        this.cost = data.cost;
        this.id = data.id;
        this.imageURL = data.imageURL;
        this.leaderSkill = data.leaderSkill;
        this.superAttack = data.superAttack;
        this.ultraSuperAttack = data.ultraSuperAttack;
        this.passive = data.passive;
        this.links = data.links;
        this.categories = data.categories;
        this.baseHP = data.baseHP;
        this.maxLevelHP = data.maxLevelHP;
        this.freeDupeHP = data.freeDupeHP;
        this.rainbowHP = data.rainbowHP;
        this.baseAttack = data.baseAttack;
        this.maxLevelAttack = data.maxLevelAttack;
        this.freeDupeAttack = data.freeDupeAttack;
        this.rainbowAttack = data.rainbowAttack;
        this.baseDefence = data.baseDefence;
        this.maxDefence = data.maxDefence;
        this.freeDupeDefence = data.freeDupeDefence;
        this.rainbowDefence = data.rainbowDefence;
        this.kiMultiplier = data.kiMultiplier;
        this.transformations = data.transformations;
    }
    toJson() {
        return JSON.stringify(this);
    }
}