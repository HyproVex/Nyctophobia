
// Messages for player

window.alert("Feel free to report bugs or make recommendations");


// Inicializing for match counting

const Matches = document.getElementById("MatchCounter");
const MatchButton = document.getElementById("MatchButton");
let CounterMatches = 0;


// LOG text

let text1 = document.getElementById("text1");
let text2 = document.getElementById("text2");
let text3 = document.getElementById("text3");
let text4 = document.getElementById("text4");
let text5 = document.getElementById("text5");


// Counter by clicking button ( Matches )

MatchButton.onclick = function(){
    document.getElementById("test_text").textContent = "Lighted matches";
    CounterMatches += 1;
    Matches.textContent = CounterMatches;

    if(CounterMatches == 1){
        text1.textContent = "You lighted a match. The room is smaller than you expected. And yet. It's still too dark.";    
    }

    if(CounterMatches >= 50){
        text1.textContent = "you made 50 lighted matches";
        text2.textContent = "You lighted a match. The room is smaller than you expected. And yet. It's still too dark.";
    }

    if(CounterMatches >= 100){
        text1.textContent = "why did you made 100 lighted matches?";    
        text2.textContent = "you made 50 lighted matches";
        text3.textContent = "You lighted a match. The room is smaller than you expected. And yet. It's still too dark.";
    }

    if(CounterMatches >= 200){
        text1.textContent = "stop it";        
        text2.textContent = "why did you made 100 lighted matches?";
        text3.textContent = "you made 50 lighted matches";
        text4.textContent = "You lighted a match. The room is smaller than you expected. And yet. It's still too dark.";
    }
}


