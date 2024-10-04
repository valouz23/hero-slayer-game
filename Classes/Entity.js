const Dice = require("./Dice");

class Entity {
    constructor(name, health, damage) {
        if (typeof name !== 'string' || name.length < 4){
            throw new Error('First parameter given is of type ' + typeof name + " when it should be of type string.");
        } else if (typeof health !== 'number' || !Number.isInteger(health)){
            throw new Error('Second parameter given should be an integer, and is of type ' + typeof health + ".");
        } else if (!(damage instanceof Dice)){
            throw new Error('Third parameter given is of type ' + typeof damage + " when it should be an instance of Dice.");
        }
        this.name = name;         // Name of the entity
        this.health = health;     // Health points
        this.damage = damage; // damage for attacks
    }

    // Method to attack another entity
    attack(target) {
        if (!(target instanceof Entity)){
            throw new Error("Target should be of instance Entity, but is of type " + typeof target + '.');
        } else if (target == this){
            throw new Error("Target should not be oneself.");
        } else if (!target.isAlive()){
            throw new Error("Target should be alive.");
        }
        const damage = this.damage.roll();
        console.log(`${this.name} attacks ${target.name} for ${this.damage} damage.`);
        target.takeDamage(damage);
    }

    // Method to take damage and reduce health
    takeDamage(amount) {
        if (typeof amount !== 'number' || !Number.isInteger(amount)){
            throw new Error('Parameters should be an integer, and is of type ' + typeof amount + '.')
        }
        if (amount < 1){
            throw new Error('Amount of damage should be at least 1.')
        }
        if (amount <= this.health){
            this.health -= amount;
            console.log(`${this.name} takes ${amount} damage. Health left: ${this.health}`);
        } else {
            this.health = 0;
            console.log(`${this.name} takes ${amount} damage. ${this.name} has been defeated`);
        }
    }

    isAlive() {
        return this.health > 0
    }
}

module.exports = Entity;
