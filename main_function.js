
// Messages for player

window.alert("Feel free to report bugs or make recommendations");


// Inicializing for match counting

const Matches = document.getElementById("MatchCounter");
const MatchButton = document.getElementById("MatchButton");
let CounterMatches = 10;


// LOG text

let text1 = document.getElementById("text1");
let text2 = document.getElementById("text2");
let text3 = document.getElementById("text3");
let text4 = document.getElementById("text4");
let text5 = document.getElementById("text5");


// Inicializing for PAGE functions

const PAGE = document.getElementById("PAGE");

// Inicializing light

let light = false;

// INTRO

let matchText = document.getElementById("test_text");

MatchButton.onclick = function(){

    // Transition from black to white circle background


    PAGE.style.color = "black";
    PAGE.style.transition = "1000ms";
    PAGE.style.background = "radial-gradient(circle,rgb(196, 111, 0) 0%, rgb(56, 39, 0) 80%, rgba(0, 0, 0, 1) 100%)";

    matchText.textContent = "Matches";
    text1.textContent = "You lighted a match. The room is smaller than you expected. And yet. It's still too dark.";   

    // Counter by clicking button ( Matches )

    if(CounterMatches > 0){
        CounterMatches -= 1;
    }

    Matches.textContent = CounterMatches;

    if(CounterMatches == 0){
        text1.textContent = "you have no matches left";
        text2.textContent = "You lighted a match. The room is smaller than you expected. And yet. It's still too dark.";
    }

    // cursor light

    light = true;

    // disabling normal cursor ( TEST )

    PAGE.style.cursor = "none";

    // Checking if you still have matches

    NoLight(CounterMatches)
}

// Animated cursor 

const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {
    let x = e.pageX;
    let y = e.pageY;

    cursor.style.top = y + "px";
    cursor.style.left = x + "px";

    if(light == true){
        cursor.style.display = "block";
        MatchButton.style.cursor = "none"
    }
})

    //cursor effect on mouseout

document.addEventListener("mouseout", () => {
    cursor.style.display = "none";
})    

// When mo light source

function NoLight(CounterMatches){
    if(CounterMatches == 0){
        PAGE.style.background = "radial-gradient(circle, black, black, black)";
        PAGE.style.color = "darkgray";
    }
}
