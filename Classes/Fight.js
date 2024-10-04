const Dragon = require("./Dragon");

class Fight {
    constructor(hero, dragon) {
        super(name, maxHealth, damage);
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
        console.log('blop')
    }
}

module.exports = Fight;