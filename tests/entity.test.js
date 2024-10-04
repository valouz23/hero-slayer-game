const Entity = require('../Classes/Entity.js');
const Dice = require('../Classes/Dice.js');

const DRAGON_HP = 40;
const D20 = new Dice(20);
const HERO_HP = 20;
const D6 = new Dice(6);
const MAX_DAMAGE_POINTS = 100;

describe('constructor', () => {
    test('should construct entity when given a string for the name, an integer strictly superior to 1 for the maxHealth, and a dice for the damage', () => {
        // Given
        // When
        var dragon = new Entity('Dragon', DRAGON_HP, D20);
        // Then
        expect(dragon).toBeInstanceOf(Entity);
        expect(dragon.name).toBe('Dragon');
        expect(dragon.currentHealth).toBe(DRAGON_HP);
        expect(dragon.maxHealth).toBe(DRAGON_HP);
        expect(dragon.damage).toBe(D20);
    });

    test('should throw error when using something else than a string with at least 3 characters for the name', () => {
        // Given
        const NOT_LONG_STRINGS = [
            'xs',
            4,
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
        NOT_LONG_STRINGS.forEach((value) => {
            // When
            const construction = () => {new Entity(value, DRAGON_HP, D20)};
            // Then
            expect(construction).toThrow();
        })
    })

    test('should throw error when using something else than an integer for the maxHealth', () => {
        // Given
        const NOT_INTEGERS = [
            'blop',
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
        NOT_INTEGERS.forEach((value) => {
            // When
            const construction = () => {new Entity('DRAGON', value, D20)};
            // Then
            expect(construction).toThrow();
        })
    })

    test('should throw error when using something else than a dice for the damage', () => {
        // Given
        const NOT_DICES = [
            'blop',
            4,
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
        NOT_DICES.forEach((value) => {
            // When
            const construction = () => {new Entity('Dragon', DRAGON_HP, value)};
            // Then
            expect(construction).toThrow();
        })
    })
});

describe('isAlive', () => {
    test("should return false when entity's health is at zero or below", () => {
        // Given
        const RAND_INTEGER_UNDER_0 = -Math.floor(Math.random() * MAX_DAMAGE_POINTS) - 1;
        const HP_VALUES = [0, -10, -20, -37, -50, -100, RAND_INTEGER_UNDER_0];
        HP_VALUES.forEach((HP) => {
            const dragon = new Entity('Dragon', HP, D20);
            // When Then
            expect(dragon.isAlive()).toBeFalsy();
        })
    })

    test("should return true when entity's health is strictly superior to zero", () => {
        // Given
        const RAND_INTEGER_OVER_1 = Math.floor(Math.random() * MAX_DAMAGE_POINTS) + 1;
        const HP_VALUES = [10, 20, 37, 50, 100, RAND_INTEGER_OVER_1];
        HP_VALUES.forEach((HP) => {
            const dragon = new Entity('Dragon', HP, D20);
            // When Then
            expect(dragon.isAlive()).toBeTruthy();
        })
    })
})

describe('takeDamage', () => {
    test("should decrease entity's currentHealth by damage in parameters when damage is inferior or equal to currentHealth", () => {
        const RAND_INTEGER_OVER_1 = Math.floor(Math.random() * 39) + 1;
        const DAMAGES = [ 8, 13, 27, 32, RAND_INTEGER_OVER_1];
        DAMAGES.forEach((damage) => {
            // Given
            const dragon = new Entity('Dragon', DRAGON_HP, D20);
            const DIFF = DRAGON_HP - damage;
            // When
            dragon.takeDamage(damage);
            // Then
            expect(dragon.currentHealth).toBe(DIFF);
            // When
            dragon.takeDamage(DIFF);
            // Then
            expect(dragon.currentHealth).toBe(0);
        });
    })

    test("should set entity's currentHealth to 0 if damage is strictly superior to currentHealth", () => {
        // Given
        const RAND_INTEGER_OVER_1 = Math.floor(Math.random() * MAX_DAMAGE_POINTS) + 1;
        const DAMAGES = [5, 8, 13, 27, 38, RAND_INTEGER_OVER_1];
        DAMAGES.forEach((damage) => {
            const dragon = new Entity('Dragon', DRAGON_HP, D20);
            // When
            dragon.takeDamage(DRAGON_HP + damage);
            // Then
            expect(dragon.currentHealth).toBe(0);
        });
    })

    test("should throw an error when parameter given is not integer or strictly inferior to 1", () => {
        // Given
        const dragon = new Entity('Dragon', DRAGON_HP, D20);
        const RAND_INTEGER_OVER_1 = -Math.floor(Math.random() * MAX_DAMAGE_POINTS);
        const NOT_STRICTLY_POSITIVE_INTEGERS = [
            'blop',
            3.14,
            ['list', 'of', 'things'],
            true,
            null,
            {json: 'yes'},
            undefined,
            () => {console.log('this is a function')},
            new Date(),
            NaN,
            0, -5, -8, -13, -27, -38, RAND_INTEGER_OVER_1,
        ];
        NOT_STRICTLY_POSITIVE_INTEGERS.forEach((notAnInteger) => {
            // When
            const taking_damage = () => {dragon.takeDamage(notAnInteger)};
            // Then
            expect(taking_damage).toThrow();
        })
    })
})

describe('attack', () => {
    test("should call roll on current entity's dice", () => {
        // Given
        const target = new Entity('Target', DRAGON_HP, D20);
        const attacker = new Entity('Attacker', HERO_HP, D6);
        const roll6Spy = jest.spyOn(D6, 'roll');
        const roll20Spy = jest.spyOn(D20, 'roll');
        // When
        attacker.attack(target);
        // Then
        expect(roll6Spy).toHaveBeenCalled();
        expect(roll20Spy).not.toHaveBeenCalled();
    })

    test("should return an integer strictly positive", () => {
        // Given
        const target = new Entity('Target', DRAGON_HP, D20);
        const attacker = new Entity('Attacker', HERO_HP, D6);
        // When
        const damage = attacker.attack(target);
        // Then
        expect(Number.isInteger(damage)).toBeTruthy();
        expect(damage).toBeGreaterThanOrEqual(1);
    })

    test("should not call method with a parameter that is not an entity", () => {
        const NOT_ENTITIES = [
            'blop',
            4,
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
        const attacker = new Entity('Attacker', HERO_HP, D6);
        NOT_ENTITIES.forEach((notAnEntity) => {
            const attacking = () => {attacker.attack(notAnEntity)};
            expect(attacking).toThrow();
        })
    })

    test("should not call method on entity not alive", () => {
        const attacker = new Entity('Attacker', HERO_HP, D6);
        const target = new Entity('Target', 0, D6);
        const attacking = () => {attacker.attack(target)};
        expect(attacking).toThrow();
    })

    test("should not call method on itself", () => {
        const attacker = new Entity('Attacker', HERO_HP, D6);
        const attacking = () => {attacker.attack(attacker)};
        expect(attacking).toThrow();
    })
})