window.onload = function() {
  console.log("game loaded");
  playGame();
}



/******************* basic game elements ******************/

var playGame = function() {

  var gameActive = true;
  playerTurn();
  updatePlayerHeals();
  updateEnemyHealth();
  updatePlayerHeals();
  updateEnemyHeals();
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
    player1.attack(enemy1);
    playerActive = false;
    toggleButtons();
    startPlayerTimer();
  }
});

var healButton = document.querySelector('#heal');

healButton.addEventListener("click", function() {
  if (healButton.active == true && playerActive == true) {
    player1.heal(player1);
    playerActive = false;
    toggleButtons();
    startPlayerTimer();
  };
});




/******************* character object creator ******************/
function char(healthPoints, attackPower, healCount, healPower) {

  /*** character vital stats ***/
  this.healthPoints = healthPoints;
  this.attackPower = attackPower;
  this.healCount = healCount;
  this.healPower = healPower;
  this.currentHealth = healthPoints;

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
    enemy.currentHealth -= this.attackDamage;
    console.log("attack performed, enemy health: " + enemy.currentHealth);
    updateEnemyHealth();
  };

  //heal ability
  this.heal = function(char) {
    if (this.healCount = 0) {
      console.log("no more heals for player left!"); //note: update to display on screen later
    } else {
      char.currentHealth += this.healPower;
      this.healCount -= 1;
      console.log("heal performed, player health: " + char.currentHealth)
    }
    updatePlayerHealth();
    updatePlayerHeals();
  };
};




/******************* enemy object creator ******************/
function enemy(healthPoints, attackPower, healCount, healPower) {

  /*** enemy vital stats ***/
  this.healthPoints = healthPoints;
  this.attackPower = attackPower;
  this.healCount = healCount;
  this.healPower = healPower;
  this.currentHealth = healthPoints;

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
      character.currentHealth -= this.attackDamage;
      console.log("enemy has attacked, player health: " + player1.currentHealth);
      updatePlayerHealth();
      startEnemyTimer();
    }
    //heal ability
  this.heal = function(enemy) {
    enemy.currentHealth += enemy.healPower;
    enemy.healCount -= 1;
    console.log("heal performed, enemy health: " + enemy.currentHealth)
    updateEnemyHealth();
    updateEnemyHeals();
    startEnemyTimer();
  };

  /************************** enemy AI **************************/

  this.computeMove = function() {
    var randomMove = undefined;
    var randomizeMove = function() {
      randomMove = Math.random();
    }
    if (this.currentHealth > (this.healthPoints * 0.60)) {
      console.log("enemy health is greater than 60% max, it chooses to attack")
      return this.attack(player1)
    } else if (this.currentHealth < (this.healthPoints * 0.30)) {
      if (this.healCount > 0) {
        console.log("enemy health is less than 30% max, it chooses to heal")
        return this.heal(enemy1)
      } else {
        console.log("enemy health is less than 30% max but it has no more heals left, it chooses to attack")
        return this.attack(player1)
      }
    } else {
      randomizeMove();
      if (randomMove > 0.3) {
        console.log("enemy health is between 60% and 30% max, it randomly chooses to attack")
        return this.attack(player1)
      }
      if (randomMove < 0.3) {
        if (this.healCount > 0) {
          console.log("enemy health is between 60% and 30% max and it has heals left, it randomly chooses to heal")
          return this.heal(enemy1)
        } else {
          console.log("enemy health is between 60% and 30% max and it doesn't have heals left, it chooses to attack")
          return this.attack(player1)
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
  var playerTurn = function() {
    playerActive = true;
    toggleButtons();
    console.log("buttons active, click away!")
  }

  /*** enemy turn ***/
  var enemyTurn = function() {
    enemy1.computeMove();
  };


  /******************* misc functions ******************/


  /*** toggles buttons depending on if char is active or not ***/
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

  /*** grabs health and heal displays from DOM, functions update them depending on if damage
  is done or a heal is performed ***/
  var charHealth = document.querySelector("#char-health");
  var charHeals = document.querySelector("#char-heals");
  var enemyHealth = document.querySelector("#enemy-health");
  var enemyHeals = document.querySelector("#enemy-heals");

  function updatePlayerHealth(){
    charHealth.innerText = player1.currentHealth;
  };
  function updatePlayerHeals(){
    charHeals.innerText = player1.healCount;
  };
  function updateEnemyHealth(){
    enemyHealth.innerText = enemy1.currentHealth;
  };
  function updateEnemyHeals(){
    enemyHeals.innerText = enemy1.healCount;
  };
