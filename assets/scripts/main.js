/* Player Factory Function */
const playerProto = {
  name() { return this.name;},
  setName(name) { this.name = name; },
  marker(){ return this.marker; },
  setMarker(marker){ this.marker = marker;}
};

function playerFactory(name, marker) {
  var player = Object.create(playerProto);
  player.setName(name);
  player.setMarker(marker)
  return player;
}

let player1 = playerFactory("Bob", "x");
let player2 = playerFactory("Alice", "o");

console.log(`Welcome ${player1.name} and ${player2.name}!`);


