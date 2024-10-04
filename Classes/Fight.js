const Dragon = require("./Dragon");

class Fight {
    constructor(hero, dragon) {
        if (!(hero instanceof Hero)){
            throw new Error('First parameter should be instance of Hero but is of type ' + typeof maxCooldown);
        }
        if (!(dragon instanceof Dragon)){
            throw new Error('Second parameter should be instance of Dragon but is of type ' + typeof maxCooldown);
        }
        this.hero = hero;
        this.dragon = dragon;
        this.turn = 0;
    }

    start(){
        while (this.dragon.isAlive() && this.hero.isAlive()){
            this.dragon.takeDamage(this.hero.attack());
            if (this.dragon.isAlive()){
                if (this.dragon.currentCooldown == 0){
                    this.hero.takeDamage(this.dragon.specialAttack());
                } else {
                    this.hero.takeDamage(this.dragon.attack());
                }
            }
            this.turn =+ 1;
            this.dragon.currentCooldown -= 1;
        }
        if (this.dragon.isAlive()){
            return 'Dragon has won the battle, and now has this much gold : ' + this.dragon.lair;
        } else {
            return 'Dragon has died. Oh well. You should start again';
        }
    }
}

module.exports = Fight;