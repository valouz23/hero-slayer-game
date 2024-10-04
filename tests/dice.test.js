const Dice = require('../Classes/Dice'); // Adjust the path as needed

const MAX_HEALTH_POINTS = 100;

describe('constructor', () => {
    test('should construct dice when given an integer strictly superior to 1', () => {
        // Given
        const RAND_INTEGER_OVER_2 = Math.floor(Math.random() * MAX_HEALTH_POINTS) + 2;
        // When
        const DICE = new Dice(RAND_INTEGER_OVER_2);
        // Then
        expect(DICE).toBeInstanceOf(Dice);
        expect(DICE.side).toBe(RAND_INTEGER_OVER_2);
    })

    test('should throw error when given number of sides strictly inferior to 2', () => {
        // Given
        const RAND_INTEGER_UNDER_1 = -Math.floor(Math.random() * 100) + 1;
        // When
        const construction = () => {new Dice(RAND_INTEGER_UNDER_1)};
        // Then
        expect(construction).toThrow();
    })

    test('should throw error when given something else than an integer', () => {
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
        NOT_INTEGERS.forEach((notAnInteger) => {
            // When
            var construction = () => {new Dice(notAnInteger)};
            // Then
            expect(construction).toThrow();
        })
    })
})

describe('roll', () => {
    test('should return an integer between 1 and the number of sides of the DICE', () => {
        const RAND_INTEGER_OVER_1 = Math.floor(Math.random() * MAX_HEALTH_POINTS) + 1;
        const sides = [6, 20, 100, RAND_INTEGER_OVER_1];
        sides.forEach((side) => {
            // Given
            const DICE = new Dice(side);
            for (let i = 0; i < 100; i++) {
                // When
                const roll = DICE.roll();
                // Then
                expect(Number.isInteger(roll)).toBeTruthy();
                expect(roll).toBeGreaterThanOrEqual(1);
                expect(roll).toBeLessThanOrEqual(side);
            }
        })
    });
});

