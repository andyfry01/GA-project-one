console.log("game loaded");

//character object
function char(healthPoints, attackPower, healCount, healPower){
  this.healthPoints = healthPoints;
  this.attackPower = attackPower;
  this.healCount = healCount;
  this.healPower = healPower;

  this.attack = function(enemy) {
    enemy.healthPoints -= this.attackPower;
  }
  this.heal = function(char) {
    char.healthPoints += this.healPower;
    this.healCount -= 1;
  }
};


//enemy object
function enemy(healthPoints, attackPower){
  this.healthPoints = healthPoints;
  this.attackPower = attackPower;
  this.attack = function(character) {
    character.healthPoints -= this.attackPower;
  }
};


//tests
var andy = new char(10, 2, 3, 1);
// console.log(andy);
var baddie = new enemy(10, 2);
// console.log(baddie);

//event listeners for buttons.

var attackButton = document.querySelector('#attack');

attackButton.addEventListener("click", function(){
  andy.attack(baddie);
});


// attackButton.addEventListener("click", function(){
//   andy.attack(baddie);
//   console.log("button clicked, attack carried out");
// })











//stuff
