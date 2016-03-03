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
    char.healthPoints +=
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
var andy = new char(10, 2, 3);
console.log(andy);
var baddie = new enemy(10, 2);
console.log(baddie);

andy.attack(baddie);
console.log(baddie);
baddie.attack(andy);
console.log(andy);
