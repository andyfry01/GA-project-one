function char(healthPoints, attackPower, healCount, healPower) {

  this.healthPoints = healthPoints;
  this.attackPower = attackPower;
  this.healCount = healCount;
  this.healPower = healPower;
  this.attackMax = undefined;
  this.attackMin = undefined;

  this.findAttackRange = function() {
    this.attackMax = Math.floor(Math.random() * this.attackPower);
    this.attackMin = this.attackMax / 2;
    return Math.floor(Math.random() * (this.attackMax - this.attackMin + 1)) + this.attackMin;
  }
}


this.attack = function(enemy) {
  if (enemy.defendStatus == true) {
    enemy.healthPoints -= (this.attackPower / 2); //note: possibly revisit this
  } else {
    enemy.healthPoints -= this.attackPower;
  }
  console.log("attack performed, enemy health: " + enemy.healthPoints);
};

};

var andy = new char(10, 2, 3, 1);


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
