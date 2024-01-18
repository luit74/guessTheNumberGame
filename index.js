let randomNumber = (parseInt(Math.random()*10 + 1));
const submit = document.querySelector('#submit-btn');
const userInput = document.querySelector('#guessField')
const guessSlot = document.querySelector('.guesses')
const remainingGuess = document.querySelector('.remainingGuess')
const lowOrHi = document.querySelector('.lowOrHi')
const startOver = document.querySelector('.resultPara')

const p = document.createElement('p')

let prevGuess = []
let numGuess = 1

let playGame = true

if(playGame){
    submit.addEventListener('click',function(e){
        e.preventDefault()
      const guess = parseInt(userInput.value)
      validateGuess(guess)
    })
}

function validateGuess(guess){
    // in this function we will give various validation , whether the player has given the correct number under the T&C of the game.
    if(isNaN(guess)){
        alert('please enter a valid number')
    }else if (guess < 1){
        alert('please enter a valid number which is more than 1')
    }else if(guess>10){
        alert('please enter a number which is less than 10')
    }else {
        prevGuess.push(guess)
        if(numGuess >= 5){
            displayGuess(guess)
            displayMessage(`GAME OVER. AND THE RANDOM NUMBER WAS ${randomNumber}`)
            endgame()
        }else {
            displayGuess(guess)
            checkGuess(guess)
        }
    }

}

function checkGuess(guess){
    // here after the validation we will check and print the value
    if(guess === randomNumber){
        displayMessage(`You guessed it right`)
        endgame()
    } else if (guess < randomNumber){
        displayMessage('Number is TOOO low')
    }else if (guess > randomNumber){
        displayMessage('Number is TOOOO high')
    }
}

function displayGuess(guess){
    // it will clean the value because it will have to take in the next value.
    userInput.value = '' /** this is for a clean up  */
    guessSlot.innerHTML += `${guess}, `
    numGuess++;
    remainingGuess.innerHTML = `${6 - numGuess}`
}

function displayMessage(message){
    // this will directly interact with the dom
    lowOrHi.innerHTML = `<h2>${message}</h2>`
}

function endgame(){
    userInput.value = '' /** this is used to clean the value. */
    userInput.setAttribute('disabled','')
    p.classList.add('button')
    p.innerHTML = `<h2 id="newGame">Start New Game</h2>`;
    startOver.appendChild(p)
    playGame = false
    newGame();
}

function newGame(){
   const newGameButton =  document.querySelector('#newGame')
   newGameButton.addEventListener('click',(e)=>{
    randomNumber = (parseInt(Math.random()*10 + 1));
    prevGuess = []
    numGuess = 1
    guessSlot.innerHTML = ''
    remainingGuess.innerHTML = `${6 - numGuess}`;
    userInput.removeAttribute('disabled')
    startOver.removeChild(p)

    playGame = true
   })
}
