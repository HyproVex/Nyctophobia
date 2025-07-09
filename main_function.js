
// Inicializing for match counting

const Matches = document.getElementById("MatchCounter");
const MatchButton = document.getElementById("MatchButton");
let matchText = document.getElementById("test_text");
let CounterMatches = 8;

// Inicializing for examine button

const ExamineBtn = document.getElementById("examineBtn");

ExamineBtn.style.display = "none";

let examineCount = 0;

// Inicializing for PANIC button

const PanicBtn = document.getElementById("PanicBtn");

PanicBtn.style.display = "none";


// Inicializing Materials

const TitleMaterial = document.getElementById("TitleMaterial");

const Quartz = document.getElementById("Quartz");
const Sulfur = document.getElementById("Sulfur");
const IronPowder = document.getElementById("IronPowder");
const CarbonPowder = document.getElementById("CarbonPowder");

const Explosives = document.getElementById("Explosives");

TitleMaterial.style.display = "none";

Quartz.style.display = "none";
Sulfur.style.display = "none";
IronPowder.style.display = "none";
CarbonPowder.style.display = "none";
Explosives.style.display = "none";

let QuartzNum = 0;
let SulfurNum = 0;
let IronPowderNum = 0;
let CarbonPowderNum = 0;


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

// Text Updating Algorithm

function TextUpdating(){
    text5.textContent = text4.textContent;
    text4.textContent = text3.textContent;
    text3.textContent = text2.textContent;
    text2.textContent = text1.textContent;
}


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
            PanicBtnCheking()
        } 
        else if (!LightPage && progressSanity > 0) {
            progressSanity--;
            PanicBtnCheking()
        }

        SanityBar.style.width = progressSanity + "%";
    }, 150);
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
        text1.textContent = "It looks like the walls are made of cracked stones, but.. No doors are seen.";
    }
    if(examineCount == 3){
        text3.textContent = text2.textContent
        text2.textContent = text1.textContent;
        text1.textContent = "You looked at the walls and you noticed a small hole with a tiny flashing light on the other side.";
    }
    if(examineCount == 4){
        text4.textContent = text3.textContent
        text3.textContent = text2.textContent
        text2.textContent = text1.textContent;
        text1.textContent = "From Desperation, you tried to punch the wall. Something fell on the ground.";
        TitleMaterial.style.display = "flex";
    }

    if(examineCount > 3){
        ExamineLoot();
    }

    ExamineBar();
}

function ExamineLoot(){

    // Erasing found materials from last examine
    let QuartzExamine = 0;
    let SulfurExamine = 0;
    let IronPowderExamine = 0;
    let CarbonPowderExamine = 0;

    // materials gathering algorithm
    if(progressSanity > 25){

        QuartzExamine = Math.floor(Math.random() * 3) + 1;

        if(examineCount > 8){
            SulfurExamine = Math.floor(Math.random() * 3);
        }

        if(examineCount > 10){
            IronPowderExamine = Math.floor(Math.random() * 2);
        }

        if(examineCount > 20){
            CarbonPowderExamine = Math.floor(Math.random() * 2);
        }
    }
    else{
        QuartzExamine = Math.floor(Math.random() * 3);

        if(examineCount > 6){
            SulfurExamine = Math.floor(Math.random() * 2);
        }

        if(examineCount > 8){
            IronPowderExamine = Math.floor(Math.random() * 2);
        }
    }

    // shows how many materials you found
    if(examineCount >= 4 && examineCount <= 8){
        TextUpdating();
        text1.textContent = `You found ${QuartzExamine} Quartz!`;
    }
    else if(examineCount >= 8 && examineCount <= 10){
        TextUpdating();
        text1.textContent = `You found ${QuartzExamine} Quartz | ${SulfurExamine} Sulfur!`; 
    }
    else if(examineCount >= 10 && examineCount <= 20){
        TextUpdating();
        text1.textContent = `You found ${QuartzExamine} Quartz | ${SulfurExamine} Sulfur | ${IronPowderExamine} IronPowder!`;
    }
    else if(examineCount > 20){
        TextUpdating();
        text1.textContent = `You found ${QuartzExamine} Quartz | ${SulfurExamine} Sulfur | ${IronPowderExamine} IronPowder | ${CarbonPowderExamine} CarbonPowder!`;
    }

    // add found materials to existing materials
    QuartzNum += QuartzExamine;
    SulfurNum += SulfurExamine;
    IronPowderNum += IronPowderExamine;
    CarbonPowderNum += CarbonPowderExamine;

    // update of materials in your storage
    Quartz.textContent = "Quartz: " + QuartzNum;
    Sulfur.textContent = "Sulfur: " + SulfurNum;
    IronPowder.textContent = "IronPowder: " + IronPowderNum;
    CarbonPowder.textContent = "CarbonPowder: " + CarbonPowderNum;

    // showing new materials for the first time when reached 
    if(QuartzNum > 0){
        Quartz.style.display = "flex";
    }
    if(SulfurNum > 0){
        Sulfur.style.display = "flex";
    }
    if(IronPowderNum > 0){
        IronPowder.style.display = "flex";
    }
    if(CarbonPowderNum > 0){
        CarbonPowder.style.display = "flex";
    }
}

    // Graphic indicator when ready 
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
            progressExamine += 0.008;
            ExamineBtn.style.opacity = progressExamine;
            ExamineBtn.style.border = "2px solid red";
            ExamineBtn.style.color = "red";
            ExamineBtn.disabled = true;
        }
    }, 100);
}

// Panic Button Settings

function PanicBar(){

    let progressPanic = 0;

    const interval = setInterval(() => {
        if(progressPanic >= 1){
            clearInterval(interval);
            PanicBtn.style.cursor = "none";
            PanicBtn.style.border = "2px solid rgb(195, 0, 255)";
            PanicBtn.style.color = "rgb(64, 0, 255)";
            PanicBtn.disabled = false;
        }
        else{
            progressPanic += 0.01;
            PanicBtn.style.opacity = progressPanic;
            PanicBtn.style.border = "2px solid red";
            PanicBtn.style.color = "red";
            PanicBtn.disabled = true;
        }
    }, 100);
}

function PanicBtnCheking(){
    if(progressSanity < 25 && CounterMatches == 0){
        PanicBtn.style.display = "inline";
    }
    else{
        PanicBtn.style.display = "none";
    }
}

PanicBtn.onclick = function(){

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
        TitleMaterial.style.display = "flex";
    }

    if(examineCount > 3){
        ExamineLoot();
    }

    PanicBar();
};


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
    ExamineBtn.style.display = "none";
    SanityProgressBar();
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