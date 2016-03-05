window.onload = function() {
  console.log("game loaded");
  playGame();
}



/******************* basic game elements ******************/

var playGame = function() {

  var gameActive = true;
  playerTurn();
  startEnemyTimer();

  if (player1.healthPoints == 0) {
    gameActive = false;
    gameOver();
  }
};



// Specifies whether it's the player's turn or not, defines player/enemy variables.
var playerActive;
var player1;
var enemy1;


/******************* button event listeners ******************/

var attackButton = document.querySelector('#attack');

attackButton.addEventListener("click", function() {
  if (attackButton.active == true && playerActive == true) {
    andy.attack(baddie);
    playerActive = false;
    toggleButtons();
    startPlayerTimer();
  }
});

var healButton = document.querySelector('#heal');

healButton.addEventListener("click", function() {
  if (healButton.active == true && playerActive == true) {
    andy.heal(andy);
    playerActive = false;
    toggleButtons();
    startPlayerTimer();
  };
});




/******************* character object creator ******************/
function char(healthPoints, attackPower, healCount, healPower) {

  /*** character stats ***/
  this.healthPoints = healthPoints;
  this.attackPower = attackPower;
  this.healCount = healCount;
  this.healPower = healPower;
  this.currentHealth = undefined;

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

  /*** character states ***/
  this.alive = true;
  player1 = this;

  /*** character abilities ***/
  //attack ability
  this.attack = function(enemy) {
    this.findAttackRange();
    enemy.healthPoints -= this.attackDamage;
    console.log("attack performed, enemy health: " + enemy.healthPoints);
  };

  //heal ability
  this.heal = function(char) {
    if (this.healCount = 0) {
      console.log("no more heals for player left!"); //note: update to display on screen later
    } else {
      char.healthPoints += this.healPower;
      this.healCount -= 1;
      console.log("heal performed, player health: " + andy.health)
    }
  };
};




/******************* enemy object creator ******************/
function enemy(healthPoints, attackPower, healCount, healPower) {

  /*** enemy stats ***/
  this.healthPoints = healthPoints;
  this.attackPower = attackPower;
  this.healCount = healCount;
  this.healPower = healPower;
  this.currentHealth = undefined;

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

  /*** enemy states ***/
  this.alive = true;
  enemy1 = this;

  /*** enemy abilities ***/
  //attack ability
  this.attack = function(character) {
      this.findAttackRange();
      character.healthPoints -= this.attackDamage;
      console.log("enemy has attacked, player health: " + player1.healthPoints);
      startEnemyTimer();
    }
    //heal ability
  this.heal = function(enemy) {
    if (this.healCount = 0) {
      console.log("no more heals for enemy left!"); //note: update to display on screen later
    } else {
      enemy.healthPoints += enemy.healPower;
      enemy.healCount -= 1;
      console.log("heal performed, enemy health: " + enemy.health)
    }
  };

  /*** enemy AI ***/

  this.computeMove = function() {
    function randomizeMove() {
      return Math.random();
    }
    if (this.currentHealth > (this.healthPoints * 0.60)) {
      this.attack(player1)
    }
    if (this.currentHealth < (this.healthPoints * 0.30)) {
      if this.healCount > 0) {
      this.heal(enemy1)
    } else {
      this.attack(player1)
    }
  }
  else {
    randomizeMove();
    if (randomizeMove >= 0.5) {
      this.attack(player1)
    }
    if (randomizeMove <= 0.5) {
      if (this.healCount > 0) {
        this.heal(enemy1)
      } else {
        this.attack(player1)
      }
    }
  }
}

};

//test enemy/characters
var andy = new char(10, 2, 3, 1);
var baddie = new enemy(10, 2, 3, 1);





/******************* enemy and character timers ******************/

/*** player timer, triggers player turn ***/
var startPlayerTimer = function() {
  window.setTimeout(function() {
    playerTurn(player1);
  }, 5000);
  console.log("player timer started")

};
/*** enemy timer, triggers enemy turn ***/
var startEnemyTimer = function() {
  window.setTimeout(function() {
    enemyTurn(enemy1);
  }, 5000);
  console.log("enemy timer started")
};




/********** enemy and character turn triggering functions ************/
/*** player turn ***/
var playerTurn = function(player) {
  playerActive = true;
  toggleButtons();
  console.log("buttons active, click away!")
}

/*** enemy turn ***/
var enemyTurn = function(enemy) {
  enemy1.attack(player1);

};




/******************* misc functions ******************/

var toggleButtons = function() {
  if (playerActive == true) {
    attackButton.active = true;
    healButton.active = true;
  }
  if (playerActive == false) {
    attackButton.active = true;
    healButton.active = true;
  }
};




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
