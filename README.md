# Rappel du sujet

## Introduction
Une bande de héros (et d’héroïnes, bien sûr) s’est introduit dans un donjon servant de repère à un dragon. Le dragon n’est évidemment pas content et décide de manger les intrus qui se présenteront, et de leur voler leur or. Un dragon n’a jamais assez d’or.
Aidez le dragon en vous assurant que les héros ne puisse plus se battre une fois mort, que son butin n’atteigne pas -2147483648 pièces d’or, et que les combats ne durent pas éternellement !

## Objectifs
Décrivez les cas de tests unitaires et d’intégration nécessaires au bon fonctionnement duprogramme présenté ci-dessous. Une fois les cas de tests décrits, implémentez ceux que vous estimez les plus importants.
- Le langage est libre, mais restez de préférence en JavaScript/TypeScript, Java ouPython. Merci de ne pas écrire de code en C#.
- L’implémentation ne sera pas jugé, mais peut vous offrir quelques pointssupplémentaires (si les commentaires sont présent et pertinent)
- N’hésitez pas à commenter votre démarche sur les points qui vous pose problèmeplutôt que de ne rien faire

## Spécifications

### Dice
Un dé (Dice) possède un nombre fixe de face (side) est peut être jeté (roll) afin d’obtenir un nombre entier aléatoire entre 1 et le nombre de face.

### Entity
Une entité (Entity) possède un nom fixe (name), une vie maximum fixe (maxHealth), et une vie actuelle (currentHealth) qui peut descendre jusqu’à ce que l’entité décède (!isAlive). La méthode attack ne fait que retourner un montant de dégâts, elle ne les inflige pas. Les dégâts sont subis via la méthode takeDamage.

### Dragon
Un dragon est une entité particulière qui possède une attaque spéciale, son souffle. Elle ne peut l’utiliser que quand elle est disponible (currentCooldown = 0). Le temps de recharge de l’attaque spéciale est fixé à la création de l’entité, et diminue pour chaque tour passé en combat (Fight).
De plus, le dragon est cupide. Pour chaque héros qu’il aura massacré, il ajoutera de l’or à son butin (attribut gold du héros et lair du dragon).

### Fight
Un combat entre un héros et un dragon. Le héros sera toujours le premier à attaquer, puis les deux attaqueront chacun leur tour jusqu’à ce que l’un des deux décède. Le compteur de tour (turn) augmente après une attaque de chacun.

### Dungeon
La classe principale de l’application. Lors d’une exploration (explore), les héros attaqueront le dragon un par un jusqu'à ce que les héros triomphent, ou que le dragon ne soit plus dérangé.

### Informations supplémentaires
- Peut-être que des mocks devront être mis en place (des stubs ?) pour tester certaines parties

### Aller plus loin
- La méthode heal de la classe entity n’est pas utilisée ... le dragon peut manger un cadavre de héros pour se soigner ! Cependant, le dragon à des goûts particulier, il ne mange pas les héroïnes. Rajouter un attribut sex à la classe Hero.
- Faites vous plaisir ! Attention cependant à ne pas délaisser le sujet. Tout ajout de fonctionnalités supplémentaires pourra amener à des points bonus, si le reste du sujet est correctement couvert.


# Mes choix pour répondre au sujet
- Le langage utilisé est javascript, avec jest pour les tests