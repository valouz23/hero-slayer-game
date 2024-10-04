const Entity = require("./Entity");

class Dragon extends Entity {
    constructor(name, maxHealth, damage, maxCooldown) {
        super(name, maxHealth, damage);
        if (!Number.isInteger(maxCooldown) || maxCooldown < 1){
            throw new Error('Forth parameter given should be a strictly positive integer but is of type ' + typeof maxCooldown);
        }
        this.maxCooldown = maxCooldown;
        this.currentCooldown = maxCooldown;
        this.lair = 0;
    }

    specialAttack(){
        if (this.currentCooldown != 0){
            throw new Error('the dragon still needs to cooldown before using this attack.')
        }
        var damage = this.attack();
        damage += this.attack();
        this.currentCooldown = this.maxCooldown;
        return damage;
    }
}

module.exports = Dragon;