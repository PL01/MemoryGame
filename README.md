# Memory Game Project

## Table of Contents

* [Instructions](#instructions)
* [Contributing](#contributing)
* [Gameplay](#gameplay)
* [Notes](#notes)
* [Conclusion](#conclusion)
* [List of Depedencies](#dependencies)

## Instructions

The starter project has some HTML and CSS styling to display a static version of the Memory Game project. You'll need to convert this project from a static project to an interactive one. This will require modifying the HTML and CSS files, but primarily the JavaScript file.

To get started, open `js/app.js` and start building out the app's functionality

For specific, detailed instructions, look at the project instructions in the [Udacity Classroom](https://classroom.udacity.com/me).

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).

## Gameplay
Here's how you play the game. Click on two gray cards to flip them over or see them and see their faces. If they match, you'll get highlighted pair. Match them by their faces/symbols. If they do not match, the cards will hide themselves, so remember who's where in the deck! Try to match all the cards. Try to be quick and becareful of how many moves you waste or else your perfect score of 3 cards will go down to 2 and eventually to 1. Use the reset button to reset the game at any time. Once all cards have matched, you've won! Your stats will show and you can replay the game or close the window! Have fun and Concentrate!

## Notes

For this project, I had to look up a walkthrough that helped to explain how the project had to break down.

1. Toggle, Match, and Shuffle The Cards. This meant creating functions to hide/close and show/open a card when you clicked on them, make an array for the toggled cards (mainly a pair) and to match the cards in the array, and shuffle them around so that they're not in the same spot on the board everytime.

2. Keeping track of the Moves, Stars, and the Clock with a Modal. This was tricky as it meant creating functions to collect the live data of the gamer's gameplay, and manipulating the DOM to display this information in a modal. The walkthrough had bugs that didn't take into account that the basic set up of the project came with HTML code that already displayed a match pair, so I had to fix up the HTML cards/deck section so that none of them have the classes to either open and/or match the cards. 

3. Reset the Game. To reset the game wasn't too hard, but the walkthrough had a serious bug where if you reset/restart the game, it didn't reset the cards and so it would show the same set you just went through. I also had to add in two lines of code that set the matched variable to 0 and an empty toggledCards array. 

## Conclusion

This was a challenging project and fun to go through, but if you follow any walk throughs or tutorials, keep in mind that sometimes you'll be met with missing components and serious bugs, so it'll require some extra thinking and asking others for help. I can say that I finally made a game with JavaScript, HTML, and CSS.


## List of Dependences
* Use of the font-awesome library for CSS
* Use of Stack Overflow to shuffle list of cards