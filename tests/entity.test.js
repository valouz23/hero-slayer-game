const Entity = require('../Classes/Entity.js');
const Dice = require('../Classes/Dice.js');

const DRAGON_HP = 40;
const D20 = new Dice(20);
const HERO_HP = 20;
const D6 = new Dice(6);
const MAX_HEALTH_POINTS = 100;

describe('constructor', () => {
    test('should construct entity when given a string for the name, an integer strictly superior to 1 for the health, and a dive for the damage', () => {
        // Given
        // When
        var dragon = new Entity('Dragon', DRAGON_HP, D20);
        // Then
        expect(dragon).toBeInstanceOf(Entity);
        expect(dragon.name).toBe('Dragon');
        expect(dragon.health).toBe(DRAGON_HP);
        expect(dragon.damage).toBe(D20);
    });

    test('should throw error when using something else than a string with at least 4 characters for the name', () => {
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

    test('should throw error when using something else than an integer for the health', () => {
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
    test("should return false when entity's health is at zero", () => {
        // Given
        const dragon = new Entity('Dragon', 0, D20);
        // When Then
        expect(dragon.isAlive()).toBeFalsy();
    })

    test("should return true when entity's health is strictly superior to zero", () => {
        // Given
        const RAND_INTEGER_OVER_1 = Math.floor(Math.random() * MAX_HEALTH_POINTS) + 1;
        const HP_VALUES = [10, 20, 37, 50, 100, RAND_INTEGER_OVER_1];
        HP_VALUES.forEach((HP) => {
            const dragon = new Entity('Dragon', HP, D20);
            // When Then
            expect(dragon.isAlive()).toBeTruthy();
        })
    })

    test("should return false when entity's health is strictly below zero", () => {
        // Given
        const RAND_INTEGER_UNDER_0 = -Math.floor(Math.random() * MAX_HEALTH_POINTS) - 1;
        const HP_VALUES = [-10, -20, -37, -50, -100, RAND_INTEGER_UNDER_0];
        HP_VALUES.forEach((HP) => {
            const dragon = new Entity('Dragon', HP, D20);
            // When Then
            expect(dragon.isAlive()).toBeFalsy();
        })
    })
})

describe('takeDamage', () => {
    test("should decrease entity's health by damage in parameters when damage is inferior or equal to health", () => {
        const RAND_INTEGER_OVER_1 = Math.floor(Math.random() * 39) + 1;
        const DAMAGES = [ 8, 13, 27, 32, RAND_INTEGER_OVER_1];
        DAMAGES.forEach((damage) => {
            // Given
            const dragon = new Entity('Dragon', DRAGON_HP, D20);
            const DIFF = DRAGON_HP - damage;
            // When
            dragon.takeDamage(damage);
            // Then
            expect(dragon.health).toBe(DIFF);
            // When
            dragon.takeDamage(DIFF);
            // Then
            expect(dragon.health).toBe(0);
        });
    })

    test("should set entity health to 0 if damage is strictly superior to health", () => {
        // Given
        const RAND_INTEGER_OVER_1 = Math.floor(Math.random() * MAX_HEALTH_POINTS) + 1;
        const DAMAGES = [5, 8, 13, 27, 38, RAND_INTEGER_OVER_1];
        DAMAGES.forEach((damage) => {
            const dragon = new Entity('Dragon', DRAGON_HP, D20);
            // When
            dragon.takeDamage(DRAGON_HP + damage);
            // Then
            expect(dragon.health).toBe(0);
        });
    })

    test("should at least take 1 damage", () => {
        // Given
        const RAND_INTEGER_OVER_1 = -Math.floor(Math.random() * MAX_HEALTH_POINTS);
        const DAMAGES = [ 0, -5, -8, -13, -27, -38, RAND_INTEGER_OVER_1];
        DAMAGES.forEach((damage) => {
            const dragon = new Entity('Dragon', DRAGON_HP, D20);
            // When
            const takingNegativeDamage = () => dragon.takeDamage(damage);
            // Then
            expect(takingNegativeDamage).toThrow();
        });
    })

    test("should throw an error when parameter given is not integer", () => {
        // Given
        const dragon = new Entity('Dragon', DRAGON_HP, D20);
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
        NOT_INTEGERS.forEach((notAnInteger) => {
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

    test("should call takeDamage on entity passed in parameters, with damage being a value between 1 and number of sides of current entity's dice", () => {
        // Given
        const target = new Entity('Target', DRAGON_HP, D20);
        const attacker = new Entity('Attacker', HERO_HP, D6);
        const targetTakesDamageSpy = jest.spyOn(target, 'takeDamage');
        const attackerTakesDamageSpy = jest.spyOn(attacker, 'takeDamage');
        const RAND_INTEGER_BETWEEN_1_AND_6 = Math.floor(Math.random() * 5) + 1;
        jest.spyOn(D6, 'roll').mockReturnValue(RAND_INTEGER_BETWEEN_1_AND_6);
        // When
        attacker.attack(target);
        // Then
        expect(targetTakesDamageSpy).toHaveBeenCalledWith(RAND_INTEGER_BETWEEN_1_AND_6);
        expect(attackerTakesDamageSpy).not.toHaveBeenCalled();
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