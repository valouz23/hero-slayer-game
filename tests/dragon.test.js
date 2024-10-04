const Dice = require('../Classes/Dice.js');
const Dragon = require('../Classes/Dragon.js');

const DRAGON_HP = 40;
const D20 = new Dice(20);
const COOLDOWN = 2;

describe('constructor', () => {
    test('should construct a dragon when given the right type of arguments', () => {
        // Given
        // When
        var dragon = new Dragon('Smaug', DRAGON_HP, D20, COOLDOWN);
        // Then
        expect(dragon).toBeInstanceOf(Dragon);
        expect(dragon.name).toBe('Smaug');
        expect(dragon.currentHealth).toBe(DRAGON_HP);
        expect(dragon.maxHealth).toBe(DRAGON_HP);
        expect(dragon.damage).toBe(D20);
        expect(dragon.lair).toBe(0);
        expect(dragon.maxCooldown).toBe(COOLDOWN);
        expect(dragon.currentCooldown).toBe(COOLDOWN);
    });

    test('should throw an error when the given argument for maxCooldown is not a strictly positive integer', () => {
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
            const construction = () => {new Dragon('Smaug', DRAGON_HP, D20, value)};
            // Then
            expect(construction).toThrow();
        })
    })
});

describe('specialAttack', () => {
    test("should return an integer between 2 and twice the number of sides of the entity's dice", () => {
        // Given
        var dragon = new Dragon('Smaug', DRAGON_HP, D20, COOLDOWN);
        dragon.currentCooldown = 0;
        // When
        var damage = dragon.specialAttack();
        // Then
        expect(damage).toBeGreaterThanOrEqual(2);
        expect(damage).toBeLessThanOrEqual(40);
    })

    test("should set currentCooldown of dragon back to maxCoolDown", () => {
        // Given
        var dragon = new Dragon('Smaug', DRAGON_HP, D20, COOLDOWN);
        dragon.currentCooldown = 0;
        // When
        dragon.specialAttack();
        // Then
        expect(dragon.currentCooldown).toBeGreaterThanOrEqual(COOLDOWN);
    })

    test("should not execute the special attack when entity's currentCooldown is not at 0", () => {
        // Given
        var dragon = new Dragon('Smaug', DRAGON_HP, D20, COOLDOWN);
        // When
        var specialAttacking = () => {dragon.specialAttack()};
        // Then
        expect(specialAttacking).toThrow();
    })
})