const Dice = require("./Dice");

class Entity {
    constructor(name, maxHealth, damage) {
        if (typeof name !== 'string' || name.length < 4){
            throw new Error('First parameter given is of type ' + typeof name + " when it should be of type string.");
        } else if (typeof maxHealth !== 'number' || !Number.isInteger(maxHealth)){
            throw new Error('Second parameter given should be an integer, and is of type ' + typeof maxHealth + ".");
        } else if (!(damage instanceof Dice)){
            throw new Error('Third parameter given is of type ' + typeof damage + " when it should be an instance of Dice.");
        }
        this.name = name;
        this.currentHealth = maxHealth;
        this.maxHealth = maxHealth;
        this.damage = damage;
    }

    // Method to attack another entity
    attack() {
        const damage = this.damage.roll();
        return damage;
    }

    // Method to take damage and reduce maxHealth
    takeDamage(amount) {
        if (typeof amount !== 'number' || !Number.isInteger(amount)){
            throw new Error('Parameters should be an integer, and is of type ' + typeof amount + '.')
        }
        if (amount < 1){
            throw new Error('Amount of damage should be at least 1.')
        }
        if (amount <= this.currentHealth){
            this.currentHealth -= amount;
            console.log(`${this.name} takes ${amount} damage. Health left: ${this.currentHealth}`);
        } else {
            this.currentHealth = 0;
            console.log(`${this.name} takes ${amount} damage. ${this.name} has been defeated`);
        }
    }

    isAlive() {
        return this.currentHealth > 0
    }
}

module.exports = Entity;
