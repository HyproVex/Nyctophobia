
// Inicializing for LOG settings

const LOG = document.getElementById("Log2");

// Inicializing for match counting

const Matches = document.getElementById("MatchCounter");
const MatchButton = document.getElementById("MatchButton");
let matchText = document.getElementById("MatchText");
let CounterMatches = 3; 

// Inicializing for examine button

const ExamineBtn = document.getElementById("examineBtn");
ExamineBtn.style.display = "none";
let examineCount = 0;

// Inicializing for PANIC button

const PanicBtn = document.getElementById("PanicBtn");
PanicBtn.style.display = "none";

// Inicializing Materials

const TitleMaterial = document.getElementById("TitleMaterial");
const Materials = document.getElementById("materials");
const Quartz = document.getElementById("Quartz");
const Sulfur = document.getElementById("Sulfur");
const IronPowder = document.getElementById("IronPowder");
const CarbonPowder = document.getElementById("CarbonPowder");
Materials.style.display = "none";
TitleMaterial.style.display = "none";
Quartz.style.display = "none";
Sulfur.style.display = "none";
IronPowder.style.display = "none";
CarbonPowder.style.display = "none";
let QuartzNum = 0;
let SulfurNum = 0;
let IronPowderNum = 0;
let CarbonPowderNum = 0;
let Explosive = false;

// Inicializing Crafting

const MatchCraftBtn = document.getElementById("MatchCraft");
const ExplosiveCraftBtn = document.getElementById("ExplosiveCraft");
const TitleCrafting = document.getElementById("TitleCrafting");
const CRAFTING = document.getElementById("CRAFTING");
CRAFTING.style.display = "none";
MatchCraftBtn.style.display = "none";
ExplosiveCraftBtn.style.display = "none";
TitleCrafting.style.display = "none";

// Inicializing LOG text

let text1 = document.getElementById("text1");
let text2 = document.getElementById("text2");
let text3 = document.getElementById("text3");
let text4 = document.getElementById("text4");
let text5 = document.getElementById("text5");
let text6 = document.getElementById("text6");
let text7 = document.getElementById("text7");
let text8 = document.getElementById("text8");
let text9 = document.getElementById("text9");
let text10 = document.getElementById("text10");

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////

// Text Updating Algorithm

function TextUpdating(){
    text10.textContent = text9.textContent;
    text9.textContent = text8.textContent;
    text8.textContent = text7.textContent;
    text7.textContent = text6.textContent;
    text6.textContent = text5.textContent;
    text5.textContent = text4.textContent;
    text4.textContent = text3.textContent;
    text3.textContent = text2.textContent;
    text2.textContent = text1.textContent;
}

function NewTextMention(){
    text1.style.animation = "text1Up 700ms linear";
    setTimeout(() => {
        text1.style.animation = "none";
    }, 2000);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////

/// LIGHT progress bar ///

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
    }, 1000);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////

/// SANITY progress bar ///

let progressSanity = 100;
    
let intervalS = null; // checks if the interval already exists

function SanityProgressBar(){

    if(intervalS !== null) return;

    intervalS = setInterval(() => {
        if (LightPage && progressSanity < 100) {
            progressSanity++;
            PanicBtnCheking();
        } 
        else if (!LightPage && progressSanity > 0) {
            progressSanity--;
            PanicBtnCheking();
            AutomaticMatchUp();
            if(CounterMatches == 0){
                MatchButton.style.display = "none";
            }
            else{
                MatchButton.style.display = "inline";
            }
        }
        SanityBar.style.width = progressSanity + "%";
    }, 150);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////

/// MATCHBUTTON ///

MatchButton.onclick = function(){

    if(examineCount == 0){
        BackgroundSound();
    }

    let progressMatch = 0;

    const intervalM = setInterval(() => {
        if(progressMatch >= 1){
            clearInterval(intervalM);
            MatchButton.style.cursor = "none";
            MatchButton.style.border = "2px solid white";
            MatchButton.style.color = "white";
            MatchButton.disabled = false;
        }
        else{
            progressMatch += 0.02;
            MatchButton.style.opacity = progressMatch;
            MatchButton.style.border = "2px solid red";
            MatchButton.style.color = "red";
            MatchButton.disabled = true;
        }
    }, 100);

    // Enabling Sanity Bar
    SanityText.style.display = "inline";
    SanityBar.style.display = "flex";

    matchText.textContent = "Matches";      

    PAGE.style.cursor = "none";     

    light = true;       // cursor light

    if(CounterMatches > 0){
        CounterMatches -= 1;        
        LightProgressBar();     
        MatchSoundEffect();     
    }

    Matches.textContent = CounterMatches;       
    
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////

/// EXAMINE ///

ExamineBtn.onclick = function(){

    ExamineSoundEffect();

    examineCount ++;

    StoryLog();

    if(examineCount > 3){
        ExamineLoot();
        CraftDetection();
    }

    ExamineBar();
}


function ExamineLoot(){

    
    let QuartzExamine = 0;
    let SulfurExamine = 0;
    let IronPowderExamine = 0;
    let CarbonPowderExamine = 0;

    
    if(progressSanity > 25){

        QuartzExamine = Math.floor(Math.random() * 5) + 1;

        if(examineCount > 8){
            SulfurExamine = Math.floor(Math.random() * 5);
        }

        if(examineCount > 10){
            IronPowderExamine = Math.floor(Math.random() * 3);
        }

        if(examineCount > 20){
            CarbonPowderExamine = Math.floor(Math.random() * 2);
        }
    }
    else{
        QuartzExamine = Math.floor(Math.random() * 3);

        if(examineCount > 6){
            SulfurExamine = Math.floor(Math.random() * 3);
        }

        if(examineCount > 8){
            IronPowderExamine = Math.floor(Math.random() * 2);
        }
    }

    // shows how many materials you found
    if(examineCount >= 4 && examineCount <= 8){
        TextUpdating();
        text1.textContent = `You found ${QuartzExamine} Quartz!`;
        NewTextMention();
    }
    else if(examineCount >= 8 && examineCount <= 10){
        TextUpdating();
        text1.textContent = `You found ${QuartzExamine} Quartz | ${SulfurExamine} Sulfur!`;
        NewTextMention() ;
    }
    else if(examineCount >= 10 && examineCount <= 20){
        TextUpdating();
        text1.textContent = `You found ${QuartzExamine} Quartz | ${SulfurExamine} Sulfur | ${IronPowderExamine} IronPowder!`;
        NewTextMention();
    }
    else if(examineCount > 20){
        TextUpdating();
        text1.textContent = `You found ${QuartzExamine} Quartz | ${SulfurExamine} Sulfur | ${IronPowderExamine} IronPowder | ${CarbonPowderExamine} CarbonPowder!`;
        NewTextMention();
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
        Quartz.style.display = "inline-block";
    }
    if(SulfurNum > 0){
        Sulfur.style.display = "inline-block";
    }
    if(IronPowderNum > 0){
        IronPowder.style.display = "inline-block";
    }
    if(CarbonPowderNum > 0){
        CarbonPowder.style.display = "inline-block";
    }
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
            progressExamine += 0.008; 
            ExamineBtn.style.opacity = progressExamine;
            ExamineBtn.style.border = "2px solid red";
            ExamineBtn.style.color = "red";
            ExamineBtn.disabled = true;
        }
    }, 100);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////

// <<<< PANIC BUTTON >>>>

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

    StoryLog();

    if(examineCount > 3){
        ExamineLoot();
        CraftDetection();
    }

    if(CounterMatches > 0){
        MatchButton.style.display = "inline";
    }

    PanicBar();

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////

/// SFX ///

function MatchSoundEffect(){
    let MatchSound = new Audio("SFX/MatchLightUP.mp3");
    MatchSound.play();
}

function ExamineSoundEffect(){
    let ExamineSound = new Audio("SFX/ExamineSoundEffect.mp3");
    ExamineSound.play();
}

function CraftSoundEffect(){
    let CraftSound = new Audio("SFX/CraftSoundEffect.mp3");
    CraftSound.play();
}

function BackgroundSound(){
    let CaveSound = new Audio("SFX/BackgroundSounds.mp3");
    CaveSound.loop = true;
    CaveSound.play();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////

/// CURSOR ///

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

document.addEventListener("mouseout", () => {
    cursor.style.display = "none";
})    

//////////////////////////////////////////////////////////////////////////////////////////////////////////

/// LIGHTS ///

function NoLight(){
    PAGE.style.background = "black";
    SanityProgressBar();
    LightPage = false;
    //
    LightText.style.display = "none";
    progressBar.style.display = "none";
    ExamineBtn.style.display = "none";
    //
    Materials.style.background = "linear-gradient(90deg, rgba(0, 0, 0, 0.13) 60%, rgba(0, 0, 0, 0.337) 100%)";
    LOG.style.background = "linear-gradient(-90deg, rgba(0, 0, 0, 0.13) 60%, rgba(0, 0, 0, 0.337) 100%)";
    CRAFTING.style.background = "linear-gradient(90deg, rgba(0, 0, 0, 0.13) 60%, rgba(0, 0, 0, 0.337) 100%)";
}

function Light(){
    LightPage = true;
    //
    PAGE.style.transition = "300ms";
    PAGE.style.background = "radial-gradient(circle,rgba(255, 106, 0, 0) 20%, rgba(0, 0, 0, 0.67) 75%, rgba(0, 0, 0, 1) 100%)";
    //
    LightText.style.display = "inline";
    progressBar.style.display = "flex";
    ExamineBtn.style.display = "inline";
    //
    Materials.style.background = "linear-gradient(90deg, rgba(250, 75, 0, 0.134) 60%, rgba(0, 0, 0, 0.337) 100%)";
    LOG.style.background = "linear-gradient(-90deg, rgba(250, 75, 0, 0.134) 60%, rgba(0, 0, 0, 0.337) 100%)";
    CRAFTING.style.background = "linear-gradient(90deg, rgba(250, 75, 0, 0.134) 60%, rgba(0, 0, 0, 0.337) 100%)";
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////

/// STORYLOGS ///

function StoryLog(){
        switch(examineCount){
            case 1 :
                text1.textContent = "You tried to look around. The room is smaller than you expected. And yet. It's still too dark.";
                NewTextMention();
                break;
            case 2 :
                TextUpdating();
                text1.textContent = "It looks like the walls are made of cracked stones, but.. No doors are seen.";
                NewTextMention();         
                break;
            case 3 :
                TextUpdating();
                text1.textContent = "You looked at the walls and you noticed a small hole with a tiny flashing light on the other side.";
                NewTextMention();
                break;
            case 4 :
                TextUpdating();
                text1.textContent = "From Desperation, you tried to punch the wall. Something fell on the ground.";
                NewTextMention();
                TitleMaterial.style.display = "inline-block";
                Materials.style.display = "block";
                Materials.style.animation = "ContainerAnimation 1.5s ease-out";
                break;
            case 9 :
                TextUpdating();
                text1.textContent = "Bright yellow mineral, it smells horrible. But then you got an idea."
                NewTextMention();
                break;
            case 11 :
                TextUpdating();
                text1.textContent = "Small amount of iron powder. Hopefully enough for making a weak match"
                NewTextMention();
                break;
            case 21 :
                TextUpdating();
                text1.textContent = "Today It's your lucky day. You found carbon powder. Maybe you could get out of here."
                NewTextMention();
                break;
        }
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////////

/// AUTO MATCH UP ///

function AutomaticMatchUp(){

    if(progressSanity == 30 && CounterMatches > 0){
        
        CounterMatches -= 1;

        LightProgressBar();

        MatchSoundEffect();

        Matches.textContent = CounterMatches;

        let progressMatch = 0;

        const intervalM = setInterval(() => {
            if(progressMatch >= 1){
                clearInterval(intervalM);
                MatchButton.style.cursor = "none";
                MatchButton.style.border = "2px solid white";
                MatchButton.style.color = "white";
                MatchButton.disabled = false;
            }
            else{
                progressMatch += 0.02;
                MatchButton.style.opacity = progressMatch;
                MatchButton.style.border = "2px solid red";
                MatchButton.style.color = "red";
                MatchButton.disabled = true;
            }
        }, 100);

    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////

/// CRAFTING ///

function CraftDetection(){
    if(QuartzNum >= 10 && SulfurNum >= 5 && IronPowderNum >= 1){
        CRAFTING.style.display = "block";
        CRAFTING.style.animation = "ContainerAnimation 1.5s ease-out";
        TitleCrafting.style.display = "inline-block";
        MatchCraftBtn.style.display = "flex";
    }

    if(CarbonPowderNum >= 1){
        ExplosiveCraftBtn.style.display = "flex";
    }
}

function CraftMatch(){

    QuartzNum -= 10;
    SulfurNum -= 5;
    IronPowderNum -= 3;

    CounterMatches += 1;
    Matches.textContent = CounterMatches;

    Quartz.textContent = "Quartz: " + QuartzNum;
    Sulfur.textContent = "Sulfur: " + SulfurNum;
    IronPowder.textContent = "IronPowder: " + IronPowderNum;
}


function CraftExplosive(){
    QuartzNum -= 50;
    SulfurNum -= 40;
    IronPowderNum -= 20;
    CarbonPowderNum -= 5;

    TextUpdating();
    text1.textContent = "Your ticket out of here. END OF DEMO"

    Quartz.textContent = "Quartz: " + QuartzNum;
    Sulfur.textContent = "Sulfur: " + SulfurNum;
    IronPowder.textContent = "IronPowder: " + IronPowderNum;
    CarbonPowder.textContent = "CarbonPowder: " + CarbonPowderNum;
}

MatchCraftBtn.onclick = function(){

    if(QuartzNum >= 10 && SulfurNum >= 5 && IronPowderNum >= 3){

        CraftSoundEffect();

        CraftMatch();

        let progressCraftMatch = 0;

        const intervalCM = setInterval(() => {
            if(progressCraftMatch >= 1){
                clearInterval(intervalCM);
                MatchCraftBtn.style.cursor = "none";
                MatchCraftBtn.style.border = "2px solid white";
                MatchCraftBtn.style.color = "white";
                MatchCraftBtn.disabled = false;
            }
            else{
                progressCraftMatch += 0.02;
                MatchCraftBtn.style.opacity = progressCraftMatch;
                MatchCraftBtn.style.border = "2px solid red";
                MatchCraftBtn.style.color = "red";
                MatchCraftBtn.disabled = true;
            }
        }, 100);
    }
}

ExplosiveCraftBtn.onclick = function(){

    if(QuartzNum >= 50 && SulfurNum >= 40 && IronPowderNum >= 20 && CarbonPowderNum >= 5){

        CraftSoundEffect();

        CraftExplosive();

        let progressCraftExplosive = 0;

        const intervalCE = setInterval(() => {
            if(progressCraftExplosive >= 1){
                clearInterval(intervalCE);
                ExplosiveCraftBtn.style.cursor = "none";
                ExplosiveCraftBtn.style.border = "2px solid white";
                ExplosiveCraftBtn.style.color = "white";
                ExplosiveCraftBtn.disabled = false;
            }
            else{
                progressCraftExplosive += 0.02;
                ExplosiveCraftBtn.style.opacity = progressCraftExplosive;
                ExplosiveCraftBtn.style.border = "2px solid red";
                ExplosiveCraftBtn.style.color = "red";
                ExplosiveCraftBtn.disabled = true;
            }
        }, 100);
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////