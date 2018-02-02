# Mastermind Game

 <p><a href="https://krisrss.github.io/mastermind-game/" >Launch Game</a></p
  
<p>It's a code breaking game, where player has to guess a secret code, consisting of 4 (or more) color pegs. After each attempt, player is prodivded with a feedback, that will reveal some hints about the secret code.</p>

<strong>Game rules:</strong>
* Computer generates a random code, that consists of color pegs
* The main objective is to guess, not only colors that are present in that code, but also their exact sequence
* Player can submit any color combination, and receive a feedback that will give hints about the hidden code
* The hint consists of color pegs (red, grey, white)
    * For each correctly guessed color AND position in the code sequence, the hint will display one red peg 
    * For each peg where color was guessed correctly but NOT position, the hint will display one grey peg
    * For pegs that didn't match anything, the hint will display white peg
* Game is over, when either hidden code is guessed successfully, or player has run out of attempts

## Techologies Used
* :hammer: <strong>HTML</strong>, <strong>CSS</strong>, <strong>JavaScript</strong>
* :computer: <strong>'Deployed' using GitHub Pages</strong>

## Demo

<div align="center">
  <img src="https://i.imgur.com/15UJh0z.png" width=250px/>
</div>

## Using locally
* Clone/download the repo
* Open index.html file, in any browser
