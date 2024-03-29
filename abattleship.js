var view = {
  displayMessage: function(msg){
    var messageArea = document.getElementById("messageArea");
    messageArea.innerHTML = msg;
  },
  displayHit: function(location){
    var cell = document.getElementById(location);
    cell.setAttribute("class", "hit");
  },
  displayMiss: function(location){
    var cell = document.getElementById(location);
    cell.setAttribute("class", "miss");

  }
};
view.displayMiss("00");
view.displayHit("34");
view.displayMiss("55");
view.displayHit("12");
view.displayMiss("25");
view.displayHit("26");
view.displayMessage("Is it on - Pillz 2 point O baby");

var model = {
  boardSize: 7,
  numShips: 3,
  shipsSunk: 0,
  shipLength: 3,

  ships: [{locations: ["06", "16", "26"], hits: ["","",""]},
          {locations: ["24", "34", "44"], hits: ["","",""]},
          {locations: ["10", "11", "12"], hits: ["","",""]}],

  fire: function(guess){
    for (var i = 0; i < this.numShips; i++){
      var ship = this.ships[i];
      // locations = ship.locations;
      var index = ship.locations.indexOf(guess);
      if(index >= 0){
        ship.hits[index] = "hit";
        view.displayHit(guess);
        view.displayMessage("HIT!");
        if (this.isSunk(ship)){
          view.displayMessage("You sank my battleship!");
          this.shipsSunk++
        }
        return true;
      }
    }
    view.displayMiss(guess);
    view.displayMessage("You Missed!");
    return false;
  },

  isSunk: function (ship){
    for (var i = 0; i < this.shipLength; i++){
      if(ship.hits[i] !== "hits"){
        return false;
      }
    }
    return true;
  }
};

var controller = {
  guesses: 0,
  processGuess : function(guess){
    var location = parseGuess(guess);

    if(location){
      this.guesses++;
      var hit = model.fire(location);
      if(hit && model.shipsSunk === model.numShips) {
        view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses");
      }
    }
  },
  
  
};

function parseGuess(guess){
  var alphabet = ["A", "B", "C", "D", "E", "F", "G"];
  if(guess === null || guess.length !== 2){
    alert("Please enter a letter and a number on the board");
  } else{
    firstChar = guess.charAt(0);
    var row = alphabet.indexOf(firstChar);
    // console.log(row);
    var column = guess.charAt(1);
    // console.log(column);

    if(isNaN(row) || isNaN(column)) {
      alert("That is not on the board")
    } else if( row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize){
      alert("Oops, that falls outside the range of the board");
    } else {
      return row + column;
    }
  }
  return null;
}
controller.processGuess("A0");

controller.processGuess("A6");
controller.processGuess("B6");
controller.processGuess("C6");

controller.processGuess("C4");
controller.processGuess("D4");
controller.processGuess("E4");

controller.processGuess("B0");
controller.processGuess("B1");
controller.processGuess("B2");

// console.log(parseGuess("A2"));
// console.log(parseGuess("B6"));
// console.log(parseGuess("G3"));
// console.log(parseGuess("H0"));
// console.log(parseGuess("A7"));




