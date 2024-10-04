# Dices

### method constructor : 

Cas passants :
  - should construct dice when given an integer strictly superior to 1

Cas d'erreur :
  - should throw error when given number of sides strictly inferior to 2 *A dice cannot have less than 2 sides*
  - should throw error when given something else than an integer

Cas exceptionnels :
  - 

### method roll :

Cas passants :
  - should return an integer between 1 and the number of sides of the dice

Cas d'erreur :
  - *redundant because tested before* should not return a value strictly inferior to 1
  - *reduntant because tested before* should not return a value strictly superior to the number of sides of the dice
  - *redundant because tested before* should not return somethiing other than an integer

Cas exceptionnels :



# Entities

### method constructor :

Cas passants :
  - should construct dice when given a string for the name, an integer strictly superior to 1 for the maxHealth, and a dice for the damage

Cas d'erreur :
  - should throw error when using something else than a string with at least 3 characters for the name *I chose to add a constraint on the length of the name for no particular reason, I just thought it was better*
  - should throw error when given something else than an integer for the maxHealth
  - should throw error when given something else than a dice for the damage

Cas exceptionnels :
  - should throw error when Dice is not valid *This is a weird possibility where the Dice might not be valid (for example, new Dice('aa')) but is still passed to the entity, I wanted to make sure that it still throws an error, because depending on how the language work it could be a problem, but thankgully it's not with javascript, so the test is not written*

### method isAlive :

Cas passants :
  - should return false when entity's currentHealth is at zero
  - should return true when entity's currentHealth is strictly superior to zero

Cas d'erreur :

Cas exceptionnels :
  - should return false when entity's currentHealth is strictly below zero *This is only relevant, because I imagined a game where nobody should have below 0 health points, so this scenario would mean an error in the code. But, it actually does not change much in the gameplay, and in the code it does not make sense to separate this scenario from the one where the health is at zero, so I will merge the two tests*


### method takeDamage :

Cas passants :
  - should decrease entity's currentHealth by damage in parameters when damage is inferior or equal to currentHealth
  - should set entity's currentHealth to 0 if damage is strictly superior to currentHealth

Cas d'erreur :
  - *redundant?* should not set entity's currentHealth to value strictly inferior to 0
  - should at least take 1 damage
  - should throw an error when parameter given is not integer or is strictly inferior to 1
Cas exceptionnels :

### method attack :

Cas passants :
  - should call roll on current entity's dice
  - should return an integer, strictly positive *If the damage can be 0, then the game could go on forever because nobody would take damage. plus, the dices start from 1 to the number of sides, so it would be weird to take 0 damage*

Cas d'erreur :
  - should not call method with a parameter that is not an entity
  - should not call method on entity not alive *It's a choice I made, that the game should work so we never call attack on an entity that is already dead, because I think once an entity dies, the player should know it right away, and attacking it should not be an option anymore*

Cas exceptionnels :
  - should not call method on itself

### method heal :

Cas passants :
  - should call method on an integer strictly positive
  - should increase entity's currentHealth by at least 1

Cas d'erreur :
  - should throw an error when calling method on something else than an integer
  - should not set currentHealth to greater value than maxHealth

Cas exceptionnels :
  -


# Dragons

### method constructor :

Cas passants :
  - should construct a dragon when given the right type of arguments *entity paramaters and a strictly positive integer for maxCooldown*

Cas d'erreur :
  - should throw an error when the given argument for maxCooldown is not a strictly positive integer *here, I made a choice, that when constructing the dragon, it has no gold, so no parameter is needed, and the cooldown cannot be 0, so the special attack is not always available*

Cas exceptionnels :
  -

### method specialAttack :

Cas passants :
  - should return an integer between 2 and twice the number of sides of the entity's dice *I decided here that the special Attack will roll two dices, and return the sum, so it can be used as damage*

Cas d'erreur :
  - should not execute the special attack when entity's currentCooldown is not at 0

Cas exceptionnels :
  -

# Heros

### method constructor :

Cas passants :
  - should construct a hero when parameters given are of the right type *entity parameters and a strictly positive integer for the gold*
  - should throw an error when the given argument for gold is not a strictly positive integer

Cas d'erreur :
  -

Cas exceptionnels :
  -

# Fight

### method constructor

Cas passants :
  - should construct a fight when parameters given are of the right type *Hero and Dragon*

Cas d'erreur :
  - 

Cas exceptionnels :
  -

### method start

Cas passants :
  - should launch a fight where the hero starts attacking
  - should stop the fight when one of the opponents is dead and the other should still be alive
  - should add gold to the dragon's lair if it won the fight

Cas d'erreur :
  -

Cas exceptionnels :
  -

# Dungeon

### method constructor

Cas passants :
  - should create a dungeon when the given parameters are of correct type *a list of heroes and a dragon*

Cas d'erreur :
  - should throw an error when given parameters are not of the right type

Cas exceptionnel :
  - the list of heroes should not have twice the same hero *two heroes can have the same characteristics but they need to be different entities so the dragon does not kill someone twice*

### method explore

Cas passants :
  - should launch the attacks of the heroes on the dragon
  - should say the dragon loses if it dies
  - should say the dragon wins if it kills all the heroes, and say how much gold it won

Cas d'erreur :
  -

Cas exceptionnels :
  - 