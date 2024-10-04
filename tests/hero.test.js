const Dice = require('../Classes/Dice.js');
const Hero = require('../Classes/Hero.js');

const HERO_HP = 20;
const D6 = new Dice(6);
const GOLD = 10;
const MAX_DAMAGE_POINTS = 100;

describe('constructor', () => {
    test('should construct a hero when parameters given are of the right type', () => {
        // Given
        // When
        var hero = new Hero('Smaug', HERO_HP, D6, GOLD);
        // Then
        expect(hero).toBeInstanceOf(Hero);
        expect(hero.name).toBe('Hero');
        expect(hero.currentHealth).toBe(HERO_HP);
        expect(hero.maxHealth).toBe(HERO_HP);
        expect(hero.damage).toBe(D6);
        expect(hero.gold).toBe(GOLD);
    });

    test('should throw an error when the given argument for gold is not a strictly positive integer', () => {
        // Given
        const NOT_STRICTLY_POSITIVE_INTEGERS = [
            'xs',
            -45,
            0,
            3.14,
            ['list', 'of', 'things'],
            true,
            null,
            {json: 'yes'},
            undefined,
            () => {console.log('this is a function')},
            new Date(),
            NaN,
        ];
        NOT_STRICTLY_POSITIVE_INTEGERS.forEach((value) => {
            // When
            const construction = () => {new Hero('Natsu', HERO_HP, D6, value)};
            // Then
            expect(construction).toThrow();
        })
    })
});