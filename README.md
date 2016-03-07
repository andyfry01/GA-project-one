# Super Science Showdown
## A turn-based RPG battle game pitting the greatest minds in science to a grueling fight to the death

**Game summary:**

The idea of the game is a simple emulation of a turn-based RPG battle sequence like in the Final Fantasy or Pokemon games. The game starts, and the player has the first move to attack the enemy. Both players take turns duking it out, either attacking or using a limited healing ability to recover health points, until one or the other wins the round. Attack damage is randomized for each attack based on the attack strength of the player/enemy, and the enemy's decision making process of whether to attack or heal is based off of its current number of health points and remaining heals (and a little bit of randomization).

**Process:**

The process of building the game consisted of figuring out what kind of stats I wanted the player/enemy to have, determining which abilities they'd have (i.e. attacking and healing), and figuring out the process by which they would take turns. I also had to spend some time on the enemy AI to make its actions in the game a little more interesting than "attack every time your turn is up until you die," which consisted of building a big if/else tree of options depending on what it's current status was, which also had to make sense in the context of the strategy of game (why would it choose to heal if it had plenty of HP left? Why WOULDN'T it choose to heal if it was close to death and had heals left? etc.).

**Technologies used:**

The technologies used consisted of a lot of if/else, object creators, DOM manipulation, and CSS animations. Nothing particularly out of the ordinary compared to what we've been learning in class, but all the moving parts had to play nice with each other in some tricky interactions for the game to work.

**Hangups/things I'd like to improve on**

There are some hackey solutions in the code to a number of problems that I encountered, especially the solution for repeatedly trigger animations for the HP/heal count/character gifs. In a future iteration I'd definitely break the file down into multiple JS files to keep organization simpler and make the code easier to follow, and I'd probably refactor some things into larger functions to cut down on the number of functions that have to be called for each action in the game.

I also had some cool ideas for making the game more dynamic and fun (multiple rounds of enemies, stronger enemies, facing off against multiple enemies, utilizing longer versions of the gif animations during attacks, sound effects, a score tracker that updates based on how many rounds you survive, etc.), but time wore thin and I couldn't implement any of that. Next time!


**Resources: **

[Soundtrack](http://www.ptesquad.com/more/pte018.html)

[Einstein/Newton gifs (buy this game when it comes out! It looks awesome)](https://www.behance.net/gallery/34335649/Science-Kombat)

[Google fonts](https://www.google.com/fonts)

[Slide up CSS animation](http://www.justinaguilar.com/animations/index.html#)

[Shake CSS animation](https://css-tricks.com/snippets/css/shake-css-keyframe-animation/)

[Solution for repeatedly triggering animations](https://css-tricks.com/restart-css-animation/)
