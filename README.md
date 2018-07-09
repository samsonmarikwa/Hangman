# Hangman
Hangman game on the thirteen first States of the USA that declared independence from England and the British Crown.


The game opens up in a new tab. In the game, the computer picks a random state out of the thirteen states. The user is given a hint by the dashes that show the length of the state name. The length also includes spaces in the state name. The user is given chances equal to the length of the state picked to type the correct state. When a user gets all the 13 states correct, the computer will notify the user that he has won the game and will play The Spangled Banner. If a user has not won the game, an uplifting background sound is then played and the user can then refresh the page and start the game again.


When a letter is typed on the keyboard, it is removed from the Available Letters pool and placed either in the input field represented by the dashes if the letter exists in the state name. If the letter is not in the state name, it is put in the quarantine area so that it is not available again for the user to type it from the Available letters pool.


## Setup
This game was developed using HTML5, CSS3, Bootstrap and Javascript. You can download the code and execute it on your computer. The game can be accessed on [Heroku](https://serene-forest-57972.herokuapp.com) on the Portfolio link.