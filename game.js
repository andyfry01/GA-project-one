console.log("game loaded");

// Set to false if the character dies.
var gameActive = true;

// Specifies whose turn it is.
var turn = "player";

//character object creator
function char(healthPoints, attackPower, healCount, healPower) {

  /*** character stats ***/
  this.healthPoints = healthPoints;
  this.attackPower = attackPower;
  this.healCount = healCount;
  this.healPower = healPower;

  /*** character states ***/
  this.alive = true;
  this.defendStatus = false;

  /*** character abilities ***/
  //attack ability
  this.attack = function(enemy) {
    if (enemy.defendStatus = true) {
      enemy.healthPoints -= (this.attackPower / 2); //note: possibly revisit this
    } else {
      enemy.healthPoints -= this.attackPower;
    }
  };

  //heal ability
  this.heal = function(char) {
    if (this.healCount = 0) {
      console.log("no more heals left!"); //note: update to display on screen later
    } else { char.healthPoints += this.healPower;
    this.healCount -= 1;
  }

  //defend ability
  this.defend = function(char) {
    this.defendStatus = true;
  }
};


//enemy object
function enemy(healthPoints, attackPower) {
  /*** enemy stats ***/
  this.healthPoints = healthPoints;
  this.attackPower = attackPower;

  /*** enemy states ***/
  this.alive = true;
  this.defendStatus = false;

  /*** enemy abilities ***/
  //attack ability
  this.attack = function(character) {
    if (character.defendStatus = true) {
      character.healthPoints -= (this.attackPower / 2); //note: possibly revisit this
    } else {
      character.healthPoints -= this.attackPower;
    }
  }
  //defend ability
  this.defend = function(enemy) {
    this.defendStatus = true;
  }
};

  //tests
  var andy = new char(10, 2, 3, 1);
  var baddie = new enemy(10, 2);

  //event listeners for buttons.

  var attackButton = document.querySelector('#attack');

  attackButton.addEventListener("click", function() {
    andy.attack(baddie);
    console.log("attack performed, baddie health: " + baddie.healthPoints)

  });

  var defendButton = document.querySelector('#defend');

  defendButton.addEventListener("click", function() {
    andy.defend();
    console.log("defend performed.")
  });

  var healButton = document.querySelector('#heal');

  healButton.addEventListener("click", function() {
    andy.heal(andy);
    console.log("heal performed, andy health: " + andy.health)

  });









  //stuff
