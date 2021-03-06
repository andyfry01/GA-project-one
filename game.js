#!/usr/bin/env node

window.onload = function() {
  console.log("game loaded");
  playGame();
}

/******************* basic game elements ******************/

var playGame = function() {

  playerTurn();
  updateEnemyHealth();
  updateEnemyHeals();
  updatePlayerHealth();
  updatePlayerHeals();
  startEnemyTimer();
};


// Specifies whether it's the player's turn or not, defines player/enemy variables.
var playerActive;
var player1;
var enemy1;




/******************* button event listeners ******************/

var attackButton = document.querySelector('#attack');

attackButton.addEventListener("click", function() {
  if (attackButton.active == true && playerActive == true) {
    player1.attack(enemy1);
    playerActive = false;
    toggleButtons();
    startPlayerTimer();
  }
});

var healButton = document.querySelector('#heal');

healButton.addEventListener("click", function() {
  if (healButton.active == true && playerActive == true) {
    player1.heal(player1);
    playerActive = false;
    toggleButtons();
    startPlayerTimer();
  };
});




/******************* character object creator ******************/
function char(healthPoints, attackPower, healCount, healPower) {

  /*** character vital stats ***/
  this.healthPoints = healthPoints;
  this.attackPower = attackPower;
  this.healCount = healCount;
  this.healPower = healPower;
  this.currentHealth = healthPoints;

  /*** attack-related stats ***/
  this.attackMax = undefined;
  this.attackMin = undefined;
  this.attackDamage = undefined;

  /*** randomly computes attack damage based on attack power ***/
  this.findAttackRange = function() {
    this.attackMax = Math.floor(Math.random() * this.attackPower);
    this.attackMin = this.attackMax / 2;
    this.attackDamage = Math.floor(Math.random() * (this.attackMax - this.attackMin + 1)) + this.attackMin;
  };

  /*** sets character as player1 ***/
  player1 = this;

  /*** character abilities ***/
  //attack ability
  this.attack = function(enemy) {
    this.findAttackRange();
    enemy.currentHealth -= this.attackDamage;
    console.log("attack performed, enemy health: " + enemy.currentHealth);
    shakeEnemy();
    updateEnemyHealth();
    checkForWin();
  };

  //heal ability
  this.heal = function(char) {
    if (this.healCount == 0) {
      console.log("no more heals for player left!"); //note: update to display on screen later
    } else {
      char.currentHealth += this.healPower;
      this.healCount -= 1;
      console.log("heal performed, player health: " + char.currentHealth);
      updatePlayerHealth();
      updatePlayerHeals();
    }
  };
};




/******************* enemy object creator ******************/
function enemy(healthPoints, attackPower, healCount, healPower) {

  /*** enemy vital stats ***/
  this.healthPoints = healthPoints;
  this.attackPower = attackPower;
  this.healCount = healCount;
  this.healPower = healPower;
  this.currentHealth = healthPoints;

  /*** attack-related stats ***/
  this.attackMax = undefined;
  this.attackMin = undefined;
  this.attackDamage = undefined;

  /*** randomly computes attack damage based on attack power ***/
  this.findAttackRange = function() {
    this.attackMax = Math.floor(Math.random() * this.attackPower);
    this.attackMin = this.attackMax / 2;
    this.attackDamage = Math.floor(Math.random() * (this.attackMax - this.attackMin + 1)) + this.attackMin;
  };

  /*** sets enemy as enemy1 ***/
  enemy1 = this;

  /*** enemy abilities ***/
  //attack ability
  this.attack = function(character) {
      this.findAttackRange();
      character.currentHealth -= this.attackDamage;
      console.log("enemy has attacked, player health: " + player1.currentHealth);
      shakeChar();
      updatePlayerHealth();
      checkForWin();
      startEnemyTimer();
    }
    //heal ability
  this.heal = function(enemy) {
    enemy.currentHealth += enemy.healPower;
    enemy.healCount -= 1;
    console.log("heal performed, enemy health: " + enemy.currentHealth)
    updateEnemyHealth();
    updateEnemyHeals();
    startEnemyTimer();
  };

  /*** enemy AI ***/

  this.computeMove = function() {
    var randomMove = undefined;
    var randomizeMove = function() {
      randomMove = Math.random();
    }
    if (this.currentHealth > (this.healthPoints * 0.60)) {
      console.log("enemy health is greater than 60% max, it chooses to attack")
      return this.attack(player1)
    } else if (this.currentHealth < (this.healthPoints * 0.30)) {
      if (this.healCount > 0) {
        console.log("enemy health is less than 30% max, it chooses to heal")
        return this.heal(enemy1)
      } else {
        console.log("enemy health is less than 30% max but it has no more heals left, it chooses to attack")
        return this.attack(player1)
      }
    } else {
      randomizeMove();
      if (randomMove > 0.3) {
        console.log("enemy health is between 60% and 30% max, it randomly chooses to attack")
        return this.attack(player1)
      }
      if (randomMove < 0.3) {
        if (this.healCount > 0) {
          console.log("enemy health is between 60% and 30% max and it has heals left, it randomly chooses to heal")
          return this.heal(enemy1)
        } else {
          console.log("enemy health is between 60% and 30% max and it doesn't have heals left, it chooses to attack")
          return this.attack(player1)
        }
      }
    }
  }
};

//creates character/enemy
var einstein = new char(15, 5.5, 3, 3);
var newton = new enemy(15, 5, 2, 2);




/******************* enemy and character timers/turn triggering functions ******************/

/*** player timer, triggers player turn ***/
var startPlayerTimer = function() {
  window.setTimeout(function() {
    playerTurn(player1);
  }, 4800);
  console.log("player timer started")
};

/*** enemy timer, triggers enemy turn ***/
var startEnemyTimer = function() {
  window.setTimeout(function() {
    enemyTurn(enemy1);
  }, 5000);
  console.log("enemy timer started");
};

/*** player turn, activates player buttons ***/
var playerTurn = function() {
  playerActive = true;
  toggleButtons();
  console.log("buttons active, click away!")
}

/*** enemy turn, computes move based on health level/remainin heals ***/
var enemyTurn = function() {
  enemy1.computeMove();
};




/******************* game win/lose functions ******************/

var siteWrapper = document.querySelector(".site-wrap");

var playerLose = function() {
  siteWrapper.innerHTML = ""
  siteWrapper.setAttribute("class", "gameOver");
  siteWrapper.classList.toggle("slideUp-1");
  siteWrapper.innerHTML = "<h1>You've lost, better luck next time patent clerk.</h1>";
  document.body.appendChild(siteWrapper);
};

var playerWin = function() {
  siteWrapper.innerHTML = ""
  siteWrapper.setAttribute("class", "gameOver");
  siteWrapper.classList.toggle("slideUp-1");
  siteWrapper.innerHTML = "<h1>You've won! But at what cost to the history of science?</h1>";
  document.body.appendChild(siteWrapper);
};

var checkForWin = function() {
  if (player1.currentHealth <= 0) {
    playerLose();
  }
  if (enemy1.currentHealth <= 0) {
    playerWin();
  }
};




/******************* misc functions ******************/

/*** toggles buttons on/off depending on if char is active or not, toggles button display ***/
var toggleButtons = function() {
  if (playerActive == true) {
    attackButton.active = true;
    healButton.active = true;
  }
  if (playerActive == false) {
    attackButton.active = false;
    healButton.active = false;
  }
  attackButton.classList.toggle("darkened");
  healButton.classList.toggle("darkened");
};


/*** grabs health and heal displays from DOM, functions update number
displayed and triggers slideUp animation each time a hit or heal occurs***/

var charHealth = document.querySelector("#char-health");
var charHeals = document.querySelector("#char-heals");
var enemyHealth = document.querySelector("#enemy-health");
var enemyHeals = document.querySelector("#enemy-heals");


function updatePlayerHealth() {
  console.log("updated player health");
  charHealth.classList.toggle("slideUp-1");
  charHealth.classList.toggle("slideUp-2");
  charHealth.innerText = player1.currentHealth;
};

function updatePlayerHeals() {
  console.log("updated player heals");
  charHeals.classList.toggle("slideUp-1");
  charHeals.classList.toggle("slideUp-2");
  charHeals.innerText = player1.healCount;
};

function updateEnemyHealth() {
  console.log("updated enemy health");
  enemyHealth.classList.toggle("slideUp-1");
  enemyHealth.classList.toggle("slideUp-2");
  enemyHealth.innerText = enemy1.currentHealth;
};

function updateEnemyHeals() {
  console.log("updated enemy heals");
  enemyHeals.classList.toggle("slideUp-1");
  enemyHeals.classList.toggle("slideUp-2");
  enemyHeals.innerText = enemy1.healCount;
};

/*** grabs char/enemy divs for shaking animation when attacked ***/

var charDiv = document.querySelector(".character");
var enemyDiv = document.querySelector(".enemy");

function shakeChar() {
  charDiv.classList.toggle("shake-2");
  charDiv.classList.toggle("shake-1");
}

function shakeEnemy() {
  enemyDiv.classList.toggle("shake-2");
  enemyDiv.classList.toggle("shake-1");
}
