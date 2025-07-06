
// Inicializing for match counting

const Matches = document.getElementById("MatchCounter");
const MatchButton = document.getElementById("MatchButton");
let CounterMatches = 6;


// Inicializing LOG text

let text1 = document.getElementById("text1");
let text2 = document.getElementById("text2");
let text3 = document.getElementById("text3");
let text4 = document.getElementById("text4");
let text5 = document.getElementById("text5");


// Inicializing for PAGE functions

const PAGE = document.getElementById("PAGE");

// Inicializing light

let light = false;

const LightText = document.getElementById("LIGHTtext")
const progressBar = document.querySelector('.progress-bar');

LightText.style.display = "none"
progressBar.style.display = "none"


// INTRO //

let matchText = document.getElementById("test_text");

MatchButton.onclick = function(){

    matchText.textContent = "Matches";
    text1.textContent = "You lighted a match. The room is smaller than you expected. And yet. It's still too dark.";   

    // Counter by clicking button ( Matches )

    if(CounterMatches > 0){
        CounterMatches -= 1;
    }

    Matches.textContent = CounterMatches;

    // cursor light

    light = true;

    // disabling normal cursor

    PAGE.style.cursor = "none";

    // LIGHT progress bar
    if(CounterMatches > 0){
        LightProgressBar(MatchButton);
    }

    // match light up sound effect

    if(CounterMatches > 0){
        MatchButton.addEventListener("click", MatchSoundEffect);
    }

}

//// Sound effects

// match light up sound effect

function MatchSoundEffect(){
    let MatchSound = new Audio("MatchLightUP.mp3");
    MatchSound.play()
}

////*

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

//// LIGHT FUNCTIONS

// When no light source

function NoLight(){
    PAGE.style.background = "radial-gradient(circle, black, black, black)";
    LightText.style.display = "none"
    progressBar.style.display = "none"
}

// When light source 

function Light(){
    PAGE.style.color = "black";
    PAGE.style.transition = "1000ms";
    PAGE.style.background = "radial-gradient(circle,rgb(167, 53, 0) 0%, rgb(0, 0, 0) 80%, rgba(0, 0, 0, 1) 100%)";
    LightText.style.display = "inline";
    progressBar.style.display = "flex"
}

/////*

// LIGHT progress bar

//const progressBar = document.querySelector('.progress-bar');

function LightProgressBar(MatchButton, Matches){

    MatchButton.addEventListener("click", () =>{
    let progress = 100;

    const interval = setInterval(() => {
        if(progress == 0){
            clearInterval(interval);
            progressBar.style.color = "black";
            if(Matches != 0){
                MatchButton.style.display = "inline";
            }
            NoLight();
        }
        else{
            progress--;
            progressBar.style.width = progress + "%";
            MatchButton.style.display = "none";
            Light();
        }
    }, 500);
    })
}