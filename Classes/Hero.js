const Entity = require("./Entity");

class Hero extends Entity {
    constructor(name, maxHealth, damage, gold) {
        super(name, maxHealth, damage);
        if (!Number.isInteger(gold) || gold < 1){
            throw new Error('Forth parameter given should be a strictly positive integer but is of type ' + typeof maxCooldown);
        }
        this.gold = gold;
    }
}

module.exports = Hero;