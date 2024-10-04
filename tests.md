### Dices :

# method constructor :

Cas passants :
    - should construct dice when given an integer strictly superior to 1

Cas d'erreur :
    - should throw error when given number of sides strictly inferior to 2
    - should throw error when given something else than an integer

Cas exceptionnels :
    - 


# method roll :

Cas passants :
    - should return an integer between 1 and the number of sides of the dice
Cas d'erreur :
    --*redundant* should not return a value strictly inferior to 1
    --*reduntant* should not return a value strictly superior to the number of sides of the dice
    --*redundant* should not return a float
Cas exceptionnels :



### Entities :

# method constructor :

Cas passants :
    - should construct dice when given a string for the name, an integer strictly superior to 1 for the health, and a dive for the damage

Cas d'erreur :
    - should throw error when using something else than a string with at least 3 characters for the name
    - should throw error when given something else than an integer for the health
    - should throw error when given something else than a dice for the damage

Cas exceptionnels :
    - should throw error when Dice is not valid, but directly given to entity


# method isAlive :

Cas passants :
    - should return false when entity's health is at zero
    - should return true when entity's health is strictly superior to zero

Cas d'erreur :

Cas exceptionnels :
    - should return false when entity's health is strictly below zero


# method takeDamage :

Cas passants :
    - should decrease entity's health by damage in parameters when damage is inferior or equal to health
    - should set entity health to 0 if damage is strictly superior to health

Cas d'erreur :
    --*redundant?* should not set entity health to value strictly inferior to 0
    - should at least take 1 damage
Cas exceptionnels :

# method attack :

Cas passants :
    - should call roll on current entity's dice
    - should call takeDamage on entity passed in parameters, with damage being a value between 1 and number of sides of current entity's dice

Cas d'erreur :
    - should not call method with a parameter that is not an entity
    - should not call method on entity not alive

Cas exceptionnels :
    - should not call method on itself
