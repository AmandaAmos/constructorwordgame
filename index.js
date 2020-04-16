//constructor initializes
var word = require("./word")
var inquirer = require("inquirer")

var letterArray = "abcdefghijklmnopqrstuvwxyz"

var romanticcomposers = ["brahms", "dvorak", "puccini", "verdi", "grieg", "sibelius", "franck", "stravinsky", "berlioz", "mahler", "chopin", "liszt", "rossini", "schumanm", "strauss", "wagner", "verdi"]

var randomIndex = Math.floor(Math.random() * romanticcomposers.length);
var randomWord = romanticcomposers[randomIndex];


computerWord = new Word(randomWord);

var requirenewWord = false;

var incorrectLetters = [];
var correctLetters = [];

var guessesLeft = 20;

funcion knowledge() {
        if (requirenewWord) {
            var randomIndex = Math.floor(Math.random() * romanticcomposers.length);
            var randomWord = romanticcomposers[randomIndex];

            computerWord = new Word(randomWord);

            requirenewWord = false;
        }

        var wordComplete = [];
        computerWord.objArray.forEach(completeCheck);

        if (wordComplete.includes(false)) {
            inquirer.prompt({
                type: "input",
                message: "Guess a letter!",
                name: "userInput"
            }).then(function (input) {
                if (letterArray.includes(input.userInput) || input.userInput.length > 1) {
                    console.log("Please try again!");
                    knowledge();

                } else {
                    if (incorrectLetters.includes(input.userInput) || correctLetters.includes(input.userInput) || input.userInput === "") {
                        console.log("Already guessed or No input entered");
                        knowledge();
                    } else {
                        var wordCheckArray = [];

                        computerWord.userGuess(input.userInput);

                        computerWord.objArray.forEach(wordCheck);
                        if (wordCheckArray.join(' ') === wordComplete.join(' ')) {
                            console.log("Not Correct");
                            incorrectLetters.push(input.userInput);
                            guessesLeft--;
                        } else {
                            console.log("CORRECT!!");
                            correctLetters.push(input.userInput);
                        }
                        computerWord.log();

                        console.log("Guesses remaining:" + guessesLeft + "");

                        if (guessesLeft > 0) {
                            knowledge();
                        } else {
                            console.log("Sorry, you lost. :(");
                            restartGame();
                        }

                        function wordCheck(key) {
                            wordCheckArray.push(key.guessed);
                        }


                    }
                }
            })

        } else {
            console.log("You Win!!");

            restartGame();
        }

        function completeCheck(key) {
            wordComplete.push(key.guessed);
        }

function restartGame(){
    inquirer.prompt({
        type: "list",
        message: "Would you like to:",
        choices: ["Play Again", "Exit"],
        name: "restart"
    }).then(function (input){
        if (input.restart === "Play Again") {
            requirenewWord = true;
            incorrectLetters = [];
            correctLetters = [];
            guessesLeft = 20;
            knowledge();
        }else {
            return
        }
    })
}

knowledge();

