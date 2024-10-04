class Dice {
    constructor(side) {
        if (!Number.isInteger(side)){
            throw new Error('Value given should be an integer, and is of type ' + typeof side + ".");
        } else if (side <= 1){
            throw new Error("Number of sides should be at least 2.");
        }
        this.side = side; // Number of sides on the dice
    }

    // Method to roll the dice and return a random number
    roll() {
        return Math.floor(Math.random() * this.side) + 1;
    }
}

module.exports = Dice;
