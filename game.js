window.onload = function () {
  console.log("game loaded");
  playGame();
}



/******************* basic game elements ******************/

var playGame = function() {

  var gameActive = true;
  startPlayerTimer();
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

var defendButton = document.querySelector('#defend');

defendButton.addEventListener("click", function() {
  if (defendButton.active == true && playerActive == true) {
    andy.defend();
    playerActive = false;
    toggleButtons();
    startPlayerTimer();
  };
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
    console.log("attack performed, enemy health: " + enemy.healthPoints);
  };

  //heal ability
  this.heal = function(char) {
    if (this.healCount = 0) {
      console.log("no more heals left!"); //note: update to display on screen later
    } else {
      char.healthPoints += this.healPower;
      this.healCount -= 1;
      console.log("heal performed, player health: " + andy.health)
    }
  };

  //defend ability
  this.defend = function(char) {
    this.defendStatus = true;
    console.log("defend performed.")
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
    startEnemyTimer();
  };

  //defend ability
  this.defend = function(enemy) {
    this.defendStatus = true;
    startEnemyTimer();
  }
};

//test enemy/characters
var andy = new char(10, 2, 3, 1);
var baddie = new enemy(10, 2);





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
var playerTurn = function(player1) {
  playerActive = true;
  toggleButtons();
  console.log("buttons active, click away!")
}

/*** enemy turn ***/
var enemyTurn = function(enemy1) {
  enemy1.attack(player1);
};




/******************* misc functions ******************/

var toggleButtons = function() {
  if (playerActive == true) {
    attackButton.active = true;
    defendButton.active = true;
    healButton.active = true;
  }
  if (playerActive == false) {
    attackButton.active = true;
    defendButton.active = true;
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
