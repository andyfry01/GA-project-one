console.log("game loaded");


/******************* basic game elements ******************/
// Set to false if the character dies.
var gameActive = true;

// Specifies whose turn it is. Will alternate between player/enemy.
var turn;
var player1;
var enemy1;


/******************* button event listeners ******************/

var attackButton = document.querySelector('#attack');

attackButton.addEventListener("click", function() {
  if (attackButton.active == true) {
    andy.attack(baddie);
    console.log("attack performed, enemy health: " + enemy1.healthPoints);
    attackButton.active = false;
    turn = undefined;
  }
});

var defendButton = document.querySelector('#defend');

defendButton.addEventListener("click", function() {
  if (defendButton.active == true) {
    andy.defend();
    console.log("defend performed.")
    defendButton.active = false;
  };
  turn = undefined;
});

var healButton = document.querySelector('#heal');

healButton.addEventListener("click", function() {
  if (healButton.active == true) {
    andy.heal(andy);
    console.log("heal performed, andy health: " + andy.health)
    healButton.active = false;
  };
  turn = undefined;
});




/******************* character object creator ******************/
function char(healthPoints, attackPower, healCount, healPower) {

  /*** character stats ***/
  this.healthPoints = healthPoints;
  this.attackPower = attackPower;
  this.healCount = healCount;
  this.healPower = healPower;

  /*** character states ***/
  this.alive = true;
  this.defendStatus = false;
  player1 = this;

  /*** character abilities ***/
  //attack ability
  this.attack = function(enemy) {
    if (enemy.defendStatus == true) {
      enemy.healthPoints -= (this.attackPower / 2); //note: possibly revisit this
    } else {
      enemy.healthPoints -= this.attackPower;
    }
    console.log("attack performed, player1 health: " + player1.healthPoints);
  };

  //heal ability
  this.heal = function(char) {
    if (this.healCount = 0) {
      console.log("no more heals left!"); //note: update to display on screen later
    } else {
      char.healthPoints += this.healPower;
      this.healCount -= 1;
    }
  };

  //defend ability
  this.defend = function(char) {
    this.defendStatus = true;
  }
};


/******************* enemy object creator ******************/
function enemy(healthPoints, attackPower) {

  /*** enemy stats ***/
  this.healthPoints = healthPoints;
  this.attackPower = attackPower;

  /*** enemy states ***/
  this.alive = true;
  this.defendStatus = false;
  enemy1 = this;

  /*** enemy abilities ***/
  //attack ability
  this.attack = function(character) {
    if (character.defendStatus == true) {
      character.healthPoints -= (this.attackPower / 2); //note: possibly revisit this
    } else {
      character.healthPoints -= this.attackPower;
    }
    console.log("enemy has attacked, player health: " + player1.healthPoints)
    turn = undefined;
  };

  //defend ability
  this.defend = function(enemy) {
    this.defendStatus = true;
    turn = undefined;
  }
};

//test enemy/characters
var andy = new char(10, 2, 3, 1);
var baddie = new enemy(10, 2);



/******************* enemy and character timers ******************/

/*** player timer, triggers player turn ***/
var playerTimer = function() {
  window.setTimeout(function() {
    playerTurn(player1);
  }, 1000);
  console.log("player timer started")

};
/*** enemy timer, triggers enemy turn ***/
var enemyTimer = function() {
  window.setTimeout(function() {
    enemyTurn(enemy1);
  }, 1000);
  console.log("enemy timer started")
};

/*** player turn ***/
//currently works
var playerTurn = function(player1) {
  player1 = this;
  this.attackButton.active = true;
  this.defendButton.active = true;
  this.healButton.active = true;
  console.log("buttons active, click away!")
}

/*** enemy turn ***/
//currently does not work
var enemyTurn = function(enemy1) {
  enemy1 = this;
  this.attack(player1);
};

playerTimer();
enemyTimer();







//stuff for later

// first attempt at setting an attack range for a character.
// this.findAttackRange = function(attackPower){
//   char.attackRange.push(Math.floor(Math.random() * this.attackPower));
//   if (attackRange[0] > 0) {
//     attackRange.push(attackRange[0] - (attackRange[0]/2));
//   } else {
//     attackRange.push(0)
//   }
//   console.log(attackRange);
// }
//
