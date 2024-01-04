'use strict';

// Selecting elements 
const score0El = document.getElementById('score--0')
const score1El = document.getElementById('score--1')
const diceEl = document.querySelector('.dice')
const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')
const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')

let scores, currentScore, activePlayer, playing

function IntialiseGame() {
    // starting conditions
    scores = [0, 0]
    currentScore = 0;
    activePlayer = 0;
    playing = true

    current0El.textContent = 0
    current1El.textContent = 0
    score0El.textContent = 0
    score1El.textContent = 0
    
    // Styling settings
    diceEl.classList.add('hidden')
    player0El.classList.remove('player--winner')
    player1El.classList.remove('player--winner')
    player0El.classList.add('player--active')
    player1El.classList.remove('player--active')

} 

IntialiseGame()

function SwitchPlayer() {
    // Switch player 
    activePlayer = activePlayer === 0 ? 1 : 0

    // change visual to show active player
    player0El.classList.toggle('player--active')
    player1El.classList.toggle('player--active')
}

document.querySelector('.btn--roll').addEventListener('click', function(){

    if (playing) {
        // Generate a dice roll number
        const dice = Math.trunc(Math.random() * 6) + 1

        // Display correct dice image dynamically  
        diceEl.setAttribute('src', `images/dice-${dice}.png`)
        diceEl.classList.remove('hidden')
        
        if (dice !== 1) {
            // Add dice roll number to current score display it
            currentScore += dice 
            document.getElementById(`current--${activePlayer}`).textContent = currentScore
        } else {
            // change the current player's score back to 0
            currentScore = 0
            document.getElementById(`current--${activePlayer}`).textContent = 0 
            
            SwitchPlayer()
        }
    }
})

document.querySelector('.btn--hold').addEventListener('click', function() {
    if (playing) {
        // Add score to active player
        scores[activePlayer] += currentScore
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]

        currentScore = 0
        document.getElementById(`current--${activePlayer}`).textContent = 0 
            
        // if score is above 100
        if (scores[activePlayer] >= 100) {
            playing = false
            diceEl.classList.add('hidden')

            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')

            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
        } else {
            // Switch the player
            SwitchPlayer()
        }
    }
})

document.querySelector('.btn--new').addEventListener('click', IntialiseGame)