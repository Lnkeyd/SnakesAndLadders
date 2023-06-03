function SnakesLadders() {
  this.ladders = {
    2: 38,
    7: 14,
    8: 31,
    15: 26,
    21: 42,
    28: 84,
    36: 44,
    51: 67,
    71: 91,
    78: 98,
    87: 94,
  };

  this.snakes = {
    16: 6,
    46: 25,
    49: 11,
    62: 19,
    64: 60,
    74: 53,
    89: 68,
    92: 88,
    95: 75,
    99: 80,
  };

  this.player = 1;
  this.gameOver = false;
  this.playersScore = [0, 0];
}

SnakesLadders.prototype.checkWin = function () {
  if (this.playersScore.indexOf(100) > -1) return true;
  return false;
};

SnakesLadders.prototype.checkLadder = function (num) {
  const i = Object.keys(this.ladders).indexOf(String(num));
  if (i !== -1) {
    this.playersScore[this.player - 1] = Object.values(this.ladders)[i];
  }
};

SnakesLadders.prototype.checkSnake = function (num) {
  const i = Object.keys(this.snakes).indexOf(String(num));
  if (i !== -1) {
    this.playersScore[this.player - 1] = Object.values(this.snakes)[i];
  }
};

SnakesLadders.prototype.togglePlayer = function () {
  this.player = this.player === 1 ? 2 : 1;
};

SnakesLadders.prototype.backTrack = function (num) {
  if (num > 100) {
    const newScore = 100 - (num - 100);
    this.playersScore[this.player - 1] = newScore;
    this.checkLadder(newScore);
    this.checkSnake(newScore);
  }
};

SnakesLadders.prototype.move = function (n1, n2) {
  const playerScore = (this.playersScore[this.player - 1] += n1 + n2);

  this.checkLadder(playerScore);
  this.checkSnake(playerScore);
  this.backTrack(playerScore);
};

SnakesLadders.prototype.play = function (die1, die2) {
  if (this.gameOver) return "Game over!";

  //   Lets Play! ;-)
  const player = this.player;
  this.move(die1, die2);

  // Win????
  if (this.checkWin()) {
    this.gameOver = true;
    return `Player ${this.player} Wins!`;
  }

  //   Toggle Player
  if (die1 !== die2) this.togglePlayer();
  return `Player ${player} is on square ${this.playersScore[player - 1]}`;
};

// Test vvvvvvvvvvvv

// const game = new SnakesLadders();

// console.log(game.play(1, 0));
// console.log(game.play(1, 0));
// console.log(game.play(99, 0));
// console.log(game.play(99, 0));
