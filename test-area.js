function char(healthPoints, attackPower, healCount){
  this.healthPoints = healthPoints;
  this.attackPower = attackPower;
  this.attackRange = [];
  this.healCount = healCount;
  this.attack = function(enemy) {
    enemy.healthPoints -= this.attackPower;
  }
};

var andy = new char(10, 10, 10);


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
