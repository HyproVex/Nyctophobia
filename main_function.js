
// Inicializing for match counting

const Matches = document.getElementById("MatchCounter");
const MatchButton = document.getElementById("MatchButton");
let matchText = document.getElementById("test_text");
let CounterMatches = 6;

// Inicializing for examine button

const ExamineBtn = document.getElementById("examineBtn");

ExamineBtn.style.display = "none";

let examineCount = 0;


// Inicializing LOG text

let text1 = document.getElementById("text1");
let text2 = document.getElementById("text2");
let text3 = document.getElementById("text3");
let text4 = document.getElementById("text4");
let text5 = document.getElementById("text5");


// Inicializing for PAGE functions

const PAGE = document.getElementById("PAGE");
let LightPage = false;

// Inicializing light

let light = false;

const LightText = document.getElementById("LIGHTtext");
const progressBar = document.querySelector('.progress-bar');

LightText.style.display = "none";
progressBar.style.display = "none";

// Inicializing Sanity

const SanityText = document.getElementById("SANITYtext");
const SanityBar = document.querySelector(".progress-bar-sanity");

SanityText.style.display = "none";
SanityBar.style.display = "none";


//// INTRO ////


// LIGHT progress bar

function LightProgressBar(){

    let progress = 100;

    const interval = setInterval(() => {
        if(progress == 0){
            clearInterval(interval);
            MatchButton.style.display = "inline";
            NoLight();
        }
        else{
            progress--;
            progressBar.style.width = progress + "%";
            MatchButton.style.display = "none";
            Light();
        }
    }, 300);
}

// SANITY progress bar

let progressSanity = 100;

    // checks if the interval already exists
let intervalS = null;

function SanityProgressBar(){

    if(intervalS !== null) return;

    intervalS = setInterval(() => {
        if (LightPage && progressSanity < 100) {
            progressSanity++;
        } 
        else if (!LightPage && progressSanity > 0) {
            progressSanity--;
        }

        SanityBar.style.width = progressSanity + "%";
    }, 200);
}

// MatchButton functions

MatchButton.onclick = function(){


    // Enabling Sanity Bar
    SanityText.style.display = "inline";
    SanityBar.style.display = "flex";

    // Prototype for showing "Matches" text
    matchText.textContent = "Matches";

    // disabling normal cursor
    PAGE.style.cursor = "none";

    // cursor light
    light = true;

    if(CounterMatches > 0){

        // Counter by clicking button ( Matches )
        CounterMatches -= 1;

        // LIGHT progress bar
        LightProgressBar();

        // match light up sound effect
        MatchSoundEffect()
 
    }

    // Updating CounterMatches
    Matches.textContent = CounterMatches;
}

// Examine button functions

ExamineBtn.onclick = function(){

    ExamineSoundEffect();

    examineCount ++;

    if(examineCount == 1){
        text1.textContent = "You tried to look around. The room is smaller than you expected. And yet. It's still too dark.";
    }
    if(examineCount == 2){
        text2.textContent = text1.textContent;
        text1.textContent = "It looks like the walls are made of cobblestone, maybe you could try to search them.";
    }
    if(examineCount == 3){
        text3.textContent = text2.textContent
        text2.textContent = text1.textContent;
        text1.textContent = "You looked at the walls and you noticed a small hole with a small flashing light on the other side.";
    }
    if(examineCount == 4){
        text4.textContent = text3.textContent
        text3.textContent = text2.textContent
        text2.textContent = text1.textContent;
        text1.textContent = "You tried to punch the wall, something fell on the ground.";
    }

    ExamineBar();
}

function ExamineBar(){

    let progressExamine = 0;

    const interval = setInterval(() => {
        if(progressExamine >= 1){
            clearInterval(interval);
            ExamineBtn.style.cursor = "none";
            ExamineBtn.style.border = "2px solid white";
            ExamineBtn.style.color = "white";
            ExamineBtn.disabled = false;
        }
        else{
            progressExamine += 0.005;
            ExamineBtn.style.opacity = progressExamine;
            ExamineBtn.style.border = "2px solid red";
            ExamineBtn.style.color = "red";
            ExamineBtn.disabled = true;
        }
    }, 100);
}

// <<<< SOUND EFFECTS >>>>

// match light up sound effect

function MatchSoundEffect(){
    let MatchSound = new Audio("MatchLightUP.mp3");
    MatchSound.play();
}

function ExamineSoundEffect(){
    let ExamineSound = new Audio("ExamineSoundEffect.mp3");
    ExamineSound.play();
}


// <<<< CUSTOM CURSOR >>>>

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

// <<<< LIGHT FUNCTIONS >>>>

// When no light source

function NoLight(){
    PAGE.style.background = "radial-gradient(circle, black, black, black)";
    LightText.style.display = "none";
    progressBar.style.display = "none";
    LightPage = false;
    SanityProgressBar();
    ExamineBtn.style.display = "none";
}

// When light source 

function Light(){
    PAGE.style.color = "black";
    PAGE.style.transition = "1000ms";
    PAGE.style.background = "radial-gradient(circle,rgb(167, 53, 0) 0%, rgb(0, 0, 0) 80%, rgba(0, 0, 0, 1) 100%)";
    LightText.style.display = "inline";
    progressBar.style.display = "flex";
    LightPage = true;
    ExamineBtn.style.display = "inline";
}