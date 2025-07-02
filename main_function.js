
// Messages for player

window.alert("Version 0.0.0 Beta");
window.alert("Feel free to report bugs or make recommendations");


// Inicializing for match counting

const Matches = document.getElementById("MatchCounter");
const MatchButton = document.getElementById("MatchButton");
let CounterMatches = 0;


// first version of updating text by button

/* 
document.getElementById("MatchButton").onclick = function(){
    document.getElementById("test_text").textContent = "Lighted";
    document.getElementById("text1").textContent = "You lighted a match.";
}
*/


// Counter by clicking button ( Matches )

MatchButton.onclick = function(){
    document.getElementById("test_text").textContent = "Lighted matches";
    document.getElementById("text1").textContent = "You lighted a match. The room is smaller than you expected. And yet. It's still too dark."
    CounterMatches += 1;
    Matches.textContent = CounterMatches;
}
