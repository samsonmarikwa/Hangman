new Audio("assets/soundclip/UpliftingBackgroundMusic.mp3"); // background music

var statesWon = 0; // number of states the user got right
var statesLost = 0; // number of states the user got wrong
var trialsAllowed = 0;
var correctLettersPicked = 0;

var guessControl = 0;
var quarantine = [];

var statesRemaining = 0; // number of games remaining before the game ends.
// This is the number of states in the array.

var statesArray = []; // create global array of states
var alphabets = [];

init();
var statePicked = pickRandomState();
var stateNameVar = statePicked;

/*
This function initializes all variables
*/
function init() {
    statePicked = ""; // initialize global variable of state picked name
    statesWon = 0; // number of states the user got right
    statesLost = 0; // number of states the user got wrong    
    statesRemaining = 0; // number of games remaining before the game ends.
    // This is the number of states in the array.
    correctLettersPicked = 0;
    trialsAllowed = 0;
    guessControl = 0;
    quarantine = [];

    statesArray = []; // create global array of states
    initStates(['DELAWARE', 'PENNSYLVANIA', 'NEW JERSEY', 'GEORGIA', 'CONNECTICUT',
        'MASSACHUSETTS BAY', 'MARYLAND', 'SOUTH CAROLINA', 'NEW HAMPSHIRE', 'VIRGINIA',
        'NEW YORK', 'NORTH CAROLINA', 'RHODE ISLAND AND PROVIDENCE PLANTATIONS'
    ]); // create global array of states)
    alphabets = [];
    initAlphabets(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
        'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ]);
}

/*
This function creates the alphabetic array and calls the function to update the user interface
*/
function initAlphabets(array) {
    alphabets = array;

    // populate the alphabetic list on the UI with the initial alphabets
    document.getElementById('available-letters-pool').appendChild(makeAlphabeticList(alphabets));
}

/*
This function populates the alphabetic pool on the user interface
*/
function makeAlphabeticList(array) {
    // Create the list element:
    var list = document.createElement('ul');

    for (var i = 0; i < array.length; i++) {
        // Create the list item:
        var item = document.createElement('li');

        // Set its contents:
        item.appendChild(document.createTextNode(array[i]));

        // Add it to the list:
        list.appendChild(item);
    }

    // Finally, return the constructed list:
    return list;
}

/*
This function populates the statesArray with the 13 states to be played in the game
*/
function initStates(array) {
    statesArray = array;
    statesRemaining = statesArray.length; // number of games remaining before the game ends.
    // This is the number of states in the array.
}

/*
This function displays the state name the user got right to the State List
*/
function addTableRow(correctStateName) {
    var table = document.getElementById("t01");
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    cell1.innerHTML = correctStateName;
}

/*
This function allows the computer to pick a random state and formats the input area
with dashes equivalent to the length of the state picked. The picked state is removed
from the array so that it is not picked again.
*/
function pickRandomState() {

    // pick up a random state
    console.log(statesArray);
    console.log("Length of statesArray: " + statesArray.length);
    /*********** may need to trap errors. What happens when there is no state name returned ***** */

    var stateName = "";
    try {
        stateName = statesArray[Math.floor(Math.random() * statesArray.length)];
        console.log("State Picked: " + stateName);

        /* set the number of errors the user is allowed before the computer displays the random picked state
        and picks the next state. The user will be allowed 2 times the length of the state picked.
        */

        // sort state name and retain unique characters to determine the correct count

        var sortState = stateName.split("").sort();
        sortState = sortState.filter(function (item, index, self) {
            return self.indexOf(item) == index;
        });
        var newVar = sortState.join("").trim();

        trialsAllowed = newVar.length * 2; // to determine correct count
        guessControl = newVar.length;
        correctLettersPicked = 0;

        console.log("Unique: " + newVar + " Sorted :" + sortState + "    " + "Original: " + stateName);
        console.log(trialsAllowed);

        statesRemaining = statesArray.length; // reset the statesRemaining

        statesArray.splice(statesArray.indexOf(stateName), 1); // find position of the stateName in the statesArray and remove it

        /* display input area based on length of statePicked **** 
        check code to create html to display on the user interface ***********  */
        /* display trialsAllowed to notify user how many chances allowed to get the state right */
    } catch (err) {
        console.log("Expect the test on line 449 to handle situation when statesremaining is 0");
        statesRemaining = 0;
    } finally {
        return stateName;
    }
}

/*
This function handles the user guess by allowing the user to enter the letters
in the state picked by the computer
*/
function userGuess(typedLetter, stateName) {

    var newStateVar = "";

    try { // trap errors
        // capture the key the user has typed
        if (stateName.indexOf(typedLetter) > -1) {
            /*
            Typed letter exist in the statePicked string variable
            */
            // split the statePicked into an array separated by the typed letter


            for (var y = 0; y <= stateName.length; y++) {
                if (stateName.substr(y, 1) != typedLetter) {
                    newStateVar = newStateVar + stateName.substr(y, 1);
                }
            }
            stateName = newStateVar;

            ++correctLettersPicked;

            // put letter in the correct position of the input prompt area to match
            // where the letter occurs in the state

        } else {
            /*
            Typed letter does not exist in the statePicked string variable
            */
            quarantine.push(typedLetter); // add the typed letter to the quarantine

            --trialsAllowed;
            //display trialsAllowed
            // display letters in quarantine
        }

        if ((correctLettersPicked >= guessControl) || (trialsAllowed <= 0)) {
            if (correctLettersPicked >= guessControl) {

                new Audio("assets/soundclip/AudienceClapping.mp3"); // play audience clapping soundclip
                ++statesWon;
                addTableRow(statePicked); // list the state the user got right on the UI

                // put a star on the bluebackground of the flag
                // display the stateWon counter
            }
            if (trialsAllowed <= 0) {
                new Audio("assets/soundclip/DisappointedCrowd.mp3"); // play crowd disappointment soundclip
                ++statesLost;

                // display the statesLost counter
                // display the stateCorrectName in the user input area

            }
            console.log("correct letters picked: " + correctLettersPicked);
            console.log("guess control: " + guessControl);
            statePicked = pickRandomState();
            stateNameVar = statePicked;
            stateName = statePicked;
            console.log("I have picked state: " + stateNameVar);
            quarantine = [];
            alphabets = [];
            initAlphabets(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
                'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
            ]);
        } else {
            // remove typed letter from the pool of alphabets so it is not available
            alphabets.splice(alphabets.indexOf(typedLetter), 1);
            initAlphabets(alphabets);
        }
    } catch (err) {
        console.log("Press Alt key to restart the game");
    } finally {

        new Audio("assets/soundclip/UpliftingBackgroundMusic.mp3"); //resume motivational background music
        console.log("stateName value returned: " + stateName);

        return stateName;
    }
}

/*
Main process
*/

document.onkeyup = function (event) {

    var keyTyped = event.keyCode || event.which;

    if (keyTyped != 27) {

        console.log("What is the states remaining now: " + statesRemaining);

        if (statesRemaining == 0) {
            if (statesWon >= 13) {
                console.log("WIN !!!! All states have been played. You the champion");
                new Audio("assets/soundclip/TheStarSpangledBanner.mp3");
            } else {
                console.log(
                    "Game Lost... Prankster Whackhead Simpson 94.7 Highveld Stereo South Africa to cheer you up"
                );
                new Audio("assets/soundclip/prius.mp4");
            }
            init();
            new Audio("assets/soundclip/UpliftingBackgroundMusic.mp3"); // background music
        } else {
            if (keyTyped >= 65 && keyTyped <= 90) {
                stateNameVar = userGuess(String.fromCharCode(keyTyped).toUpperCase(), stateNameVar);
                console.log(stateNameVar);
                // fire a keyup event
                if (typeof stateNameVar == "undefined") {

                    var e = new Event("keyup");
                    e.key = "a"; // just enter the char you want to send 
                    e.keyCode = e.key.charCodeAt(0);
                    e.which = e.keyCode;
                    e.altKey = false;
                    e.ctrlKey = true;
                    e.shiftKey = false;
                    e.metaKey = false;
                    e.bubbles = true;
                    document.dispatchEvent(e);
                    init();
                    statePicked = pickRandomState();
                    stateNameVar = statePicked;
                }
            } else {
                console.log("Press letter keys or ESC to abandon game");
            }
        }
    } else {
        init();
        new Audio("assets/soundclip/UpliftingBackgroundMusic.mp3"); // background music
    }
}