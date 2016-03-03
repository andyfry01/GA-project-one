function char(healthPoints, attackPower, healCount){
  this.healthPoints = healthPoints;
  this.attackPower = attackPower;
  this.attackRange = [];
  this.healCount = healCount;


  this.findAttackRange = function(this.attackPower){
    var attackRange = [];
    attackRange.push(Math.floor(Math.random() * this.attackPower));
    if (attackRange[0] > 0) {
      attackRange.push(attackRange[0] - (attackRange[0]/2));
    } else {
      attackRange.push(0)
    }
    console.log(attackRange);
  }


  this.attack = function(enemy) {
    enemy.healthPoints -= this.attackPower;
  }
};
