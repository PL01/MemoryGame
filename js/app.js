/*
 * Create a list that holds all of your cards
 */



const deck = document.querySelector('.deck');
//Deck variable contains the class called deck, not the data. 

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function shuffleDeck() { //function will [NEED MANNY TO HELP EXPLAIN THIS FUNCTION]
    //const cardsToShuffle = document.querySelectorAll('.deck li'); 
    const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
    //This variable stores all the li elements inside a div with the "deck" class.
    //By using the Array.from() method, we create a new copied array from the array-like object, in this case, the NodeList we make.
    console.log('Cards to shuffle', cardsToShuffle);
    const shuffledCards = shuffle(cardsToShuffle);
    //variable stores the result of passing my "array?" or NodeList into the shuffle function.
    console.log('Shuffled cards', shuffledCards);
    for (card of shuffledCards) { //This for loop moves the cards around
        deck.appendChild(card);
    }
}
shuffleDeck();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) { //function will shuffle the cards.
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
//const cards = document.querySelectorAll('.card');

/* deck.addEventListener('click', event => { //This event listener looks out for click events
    const clickTarget = event.target; //clickTarget variable is constant and it defines the action after you click an event
    if (clickTarget.classList.contains('card') && toggledCards.length < 2 && !toggledCards.includes(clickTarget)) {
        toggleCard(clickTarget);
        addToggleCard(clickTarget);
        if (toggledCards.length === 2) {
            //console.log('2 Cards!');
            checkForMatch(clickTarget)
        }
    }
    //If statement calls for the clickTarget var which calls the classList, which calls the class that contains the string card AND checks for the array toggledCards length to be less than 2. toggledCard(clickTarget) is a function that opens and shows the card that we click on. addToggleCard(clickTarget) is a function that pushes the data of the card we click on into the array. Once the array has 2 cards, the next if statement checks if the length of the array toggledCards is 2 and in the console, it tells us that we have "2 Cards!".
}); */

deck.addEventListener('click', event => { //This event listener looks out for click events
    const clickTarget = event.target; //clickTarget variable is constant and it defines the action after you click an event
    if (isClickValid(clickTarget)) {
        toggleCard(clickTarget);
        addToggleCard(clickTarget);
        if (toggledCards.length === 2) {
            checkForMatch(clickTarget)
        }
    }
    /*
    Originally, our first if statement had several conditions. It looked too busy and so we made a function;
    isClickValid checks these conditions based on what the clickTarget is. Then we toggleCard, addToggleCard, 
    and if the togleCards array has length of 2, then we checkForMatch
    */
});

function toggleCard(card) { //function that open and shows the card. card is a paramater for the data that we insert.
    card.classList.toggle('open');
    card.classList.toggle('show');
}

function addToggleCard(clickTarget) { //function that pushes the data of the card we clicked on into the toggledCards array.
    toggledCards.push(clickTarget);
    console.log(toggledCards);
}

let toggledCards = []; //empty array that will contain the card information.

function checkForMatch() { //function checks to see if cards from the deck that we click on, which go into the array, match or don't match.
    if (toggledCards[0].firstElementChild.className === toggledCards[1].firstElementChild.className) {
        toggledCards[0].classList.toggle('match');
        toggledCards[1].classList.toggle('match');
        toggledCards = []; //After we match the positions, it emptys the array.

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


function isClickValid(clickTarget) {
    return (
        clickTarget.classList.contains('card') && !clickTarget.classList.contains('match') &&
        toggledCards.length < 2 && !toggledCards.includes(clickTarget)
    );
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