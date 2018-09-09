// Global Variables
const deck = document.querySelector('.deck'); //Deck variable contains the class called deck, not the data.
let toggledCards = []; //empty array that will contain the card information.
let moves = 0;
let clockOff = true;
let time = 0;
let clockId;
let matched = 0;

function shuffleDeck() { //function will make the array that passes the cards into the shuffle function 
    const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
    //variable stores all the li elements inside a div with the "deck" class.
    //By using the Array.from() method, we create a new copied array from the array-like object, in this case, the NodeList we make.
    const shuffledCards = shuffle(cardsToShuffle);
    //variable stores the result of passing my "array?" or NodeList into the shuffle function.
    for (card of shuffledCards) {
        deck.appendChild(card);
    }
}
shuffleDeck(); //When the game starts, this function happens first.

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) { //function will randomly change the positions.
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function addMove() { //functions keeps track of player's moves
    moves++;
    const movesText = document.querySelector('.moves');
    movesText.innerHTML = moves;
}

function checkScore() { //Keeps track of player's score with each move
    if (moves === 16 || moves === 24) { //if the number of moves reaches 16 or 24, it calls the hideStar function each time.
        hideStar();
    }
}

function hideStar() { //function hides the star on the page using a style property. 
    const starList = document.querySelectorAll('.stars li');
    for (star of starList) {
        if (star.style.display !== 'none') {
            star.style.display = 'none';
            break;
        }
    }
}

function startClock() { //function starts the clock, and uses the displayTime function to record it
    clockId = setInterval(() => {
        time++;
        displayTime();
    }, 1000);
}

function stopClock() { //function ends the timer by using a clearInterval method. 
    clearInterval(clockId);
}

function displayTime() { //function makes variables that calculates the minutes and seconds, and manipulates the DOM to display them.
    const clock = document.querySelector('.clock');
    clock.innerHTML = time;
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    if (seconds < 10) { //if the seconds is less than 10 (2-digit numbers), then it will display the minutes and seconds (from 0-9)
        clock.innerHTML = `${minutes}:0${seconds}`;
    } else { // Or else it'll display the minutes and seconds (numbers > 9)
        clock.innerHTML = `${minutes}:${seconds}`;
    }
}

deck.addEventListener('click', event => { //This event listener looks out for click events
    const clickTarget = event.target; //clickTarget variable is constant and it defines the action after you click an event
    if (isClickValid(clickTarget)) {
        if (clockOff) {
            startClock();
            clockOff = false;
        }
        toggleCard(clickTarget);
        addToggleCard(clickTarget);
        if (toggledCards.length === 2) {
            addMove(); //This goes before checkForMatch because I need to count all my moves before I find a pair that matches.
            checkForMatch();
            checkScore();
        }
    }
});

/*
    Originally in this eventListner, our first if statement had several conditions. 
    It looked too busy and so we made a function; isClickValid checks these conditions 
    based on what the clickTarget is. Then we toggleCard, addToggleCard, and if the togleCards 
    array has length of 2, then we checkForMatch.
*/

function isClickValid(clickTarget) {
    return (
        clickTarget.classList.contains('card') &&
        !clickTarget.classList.contains('match') &&
        toggledCards.length < 2 &&
        !toggledCards.includes(clickTarget)
    );
}

function toggleCard(card) { //function that open and shows the card. card is a paramater for the data that we insert.
    card.classList.toggle('open');
    card.classList.toggle('show');
}

function addToggleCard(clickTarget) { //function that pushes the data of the card we clicked on into the toggledCards array.
    toggledCards.push(clickTarget);
    console.log(toggledCards);
}

function checkForMatch() { //function checks to see if cards from the deck that we click on, which go into the array, match or don't match.    
    const TOTAL_PAIRS = 8;

    if (toggledCards[0].firstElementChild.className === toggledCards[1].firstElementChild.className) {
        toggledCards[0].classList.toggle('match');
        toggledCards[1].classList.toggle('match');
        toggledCards = []; //After we match the positions, it emptys the array.
        matched++;
        console.log(matched);
        if (matched === TOTAL_PAIRS) {
            gameOver();
            console.log("Game Over!");
        }

    } else {
        setTimeout(() => {
            toggleCard(toggledCards[0]);
            toggleCard(toggledCards[1]);
            toggledCards = [];
        }, 1000);
    }
    /*If-Else statment works as follows. Once we click on the cards, their data goes into the array. 
    The function checks if in the first two positions that the cards data are the same or not. 
    If they're the same, they're a match. If not, we simply open and show the cards for 1000 miliseconds 
    before closing and hiding them again.*/
}

function toggleModal() { //function displays the stats
    const modal = document.querySelector('.modal_background');
    modal.classList.toggle('hide');
}

function writeModalStats() { //function records the stats of the game
    const timeStat = document.querySelector('.modal_time');
    const clockTime = document.querySelector('.clock').innerHTML;
    const movesStat = document.querySelector('.modal_moves');
    const starsStat = document.querySelector('.modal_stars');
    const stars = getStars();
    //Local variables that grab the data associated with the game's time, moves, and stars. 

    timeStat.innerHTML = `Time: ${clockTime}`;
    movesStat.innerHTML = `Moves: ${moves}`;
    starsStat.innerHTML = `Stars: ${stars}`;
    /*
    These three lines of code are manipulating the DOM to insert and display 
    the times, moves, and stars that is counted as you played in the game.
    */
}

function getStars() { //function grabs the number of stars from its current state at the end of the gameplay.
    stars = document.querySelectorAll('.stars li');
    starCount = 0;
    for (star of stars) {
        if (star.style.display !== 'none') {
            starCount++;
        }
    }
    return starCount;
}

document.querySelector('.modal_cancel').addEventListener('click', () => {
    toggleModal();
}); //This closes the modal when you click on the cancel button.

function resetGame() { //function calls other functions with the purpose to reset the game and its properties to its original state 
    resetClockAndTime();
    resetMoves();
    resetStars();
    resetCards();
    toggledCards = [];
    shuffleDeck();
    matched = 0; //This resets the matches variable to 0.
}

function resetClockAndTime() {
    stopClock();
    clockOff = true;
    time = 0;
    displayTime();
}

function resetMoves() { //function resets moves = 0 & sets display of moves to 0
    moves = 0;
    document.querySelector('.moves').innerHTML = moves;
}

function resetStars() { //function resets stars = 0 and loops through starlist to set its display property as inline 
    stars = 0;
    const starList = document.querySelectorAll('.stars li');
    for (star of starList) {
        star.style.display = 'inline';
    }
}

document.querySelector('.restart').addEventListener('click', resetGame);
//Event listener for the restart/refresh button.

document.querySelector('.modal_replay').addEventListener('click', replayGame);
//Event listner for the replay button on the modal after the game is over.

function gameOver() { //function calls other functions to stop the Clock/timer and record the stats of the gameplay.
    stopClock();
    writeModalStats();
    toggleModal();
}

function replayGame() { //function calls other functions to reset the game and close the modal.
    resetGame();
    toggleModal();
}

function resetCards() { //function turns down the cards to their original state.
    const cards = document.querySelectorAll('.deck li');
    for (let card of cards) {
        card.className = 'card';
    }
}

/*When one clicks on a card, the isClickValid function returns a set of conditions that check for the following: 
"is it a card?"
"does it NOT contain a "match" class?"
"is our array’s length less than 2?"
"does the toggledCards array NOT include the clickTarget?"
The function is passed into the if statement of the eventListner for the deck.
*/

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */