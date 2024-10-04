const Fight = require('../Classes/Fight.js');
const Hero = require('../Classes/Hero.js');
const Dragon = require('../Classes/Dragon.js');
const Dice = require('../Classes/Dice.js');

const DRAGON_HP = 40;
const D20 = new Dice(20);
const HERO_HP = 20;
const D6 = new Dice(6);
const MAX_DAMAGE_POINTS = 100;
const COOLDOWN = 2;
const GOLD = 10;

describe('constructor', () => {
    test('should construct a fight when parameters given are of the right type', () => {
        // Given
        var hero = new Hero('Natsu', HERO_HP, D6, GOLD);
        var dragon = new Dragon('Smaug', DRAGON_HP, D20, COOLDOWN)
        // When
        var fight = new Fight(hero, dragon);
        // Then
        expect(fight).toBeInstanceOf(Fight);
        expect(fight.attacker).toBe(hero);
        expect(fight.defender).toBe(dragon);
        expect(fight.turn).toBe(0);
    });
});

describe('start', () => {
    test("should launch a fight where the hero starts attacking", () => {
        // Given
        var hero = new Hero('Natsu', HERO_HP, D6, GOLD);
        var dragon = new Dragon('Smaug', 1, D20, COOLDOWN)
        var fight = new Fight(hero, dragon);
        // When
        fight.start();
        // Then
        expect(dragon.isAlive()).toBeFalsy();
    })

    test("should stop the fight when one of the opponents is dead and the other should still be alive", () => {
        // Given
        var hero = new Hero('Natsu', HERO_HP, D6, GOLD);
        var dragon = new Dragon('Smaug', DRAGON_HP, D20, COOLDOWN)
        var fight = new Fight(hero, dragon);
        const heroTakeDamageSpy = jest.spyOn(hero, 'takeDamage');
        const dragonTakeDamageSpy = jest.spyOn(dragon, 'takeDamage');
        jest.spyOn(D6, 'roll').mockReturnValue(4);
        jest.spyOn(D20, 'roll').mockReturnValue(10);
        // When
        fight.start();
        // Then
        expect(hero.isAlive()).toBeFalsy();
        expect(dragon.isAlive()).toBeTruthy();
        expect(heroTakeDamageSpy).toHaveBeenCalledWith(10);
        expect(dragonTakeDamageSpy).toHaveBeenCalledWith(4);

        jest.restoreAllMocks();
    })

    test("should add gold to the dragon's lair if it won the fight", () => {
        // Given
        var hero = new Hero('Natsu', 1, D6, GOLD);
        var dragon = new Dragon('Smaug', DRAGON_HP, D20, COOLDOWN)
        var fight = new Fight(hero, dragon);
        // When
        fight.start();
        // Then
        expect(hero.isAlive()).toBeFalsy();
        expect(dragon.isAlive()).toBeTruthy();
        expect(dragon.lair).toBe(GOLD);
    })
})