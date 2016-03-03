function char(healthPoints, attackPower, healCount){
  this.healthPoints = healthPoints;
  this.attackPower = attackPower;
  this.healCount = healCount;

  this.attack = function(enemy) {
    enemy.healthPoints -= this.attackPower;
  }
};

function enemy(healthPoints, attackPower){
  this.healthPoints = healthPoints;
  this.attackPower = attackPower;
};

var andy = new char(10, 2, 3);
console.log(andy);
var baddie = new enemy(10, 2);
console.log(baddie);

andy.attack(enemy);
