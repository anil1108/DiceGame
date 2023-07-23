'use strict';

//Selecting Elements
const player0El =document.querySelector('.player--0');
const player1El =document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); //faster then query
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');


const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Initial Condition

let currentscore,score,activePlayer,playing;

const init = function(){
    currentscore = 0;
    score = [0,0];
    activePlayer = 0;
    playing=true;

    score0El.textContent=0;
    score1El.textContent=0;
    current0El.textContent=0;
    current1El.textContent=0;
    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}

init();

const toswap = function(){
     // Switch to the next player
     document.getElementById(`current--${activePlayer}`).textContent = 0;
     currentscore = 0;
     activePlayer = activePlayer === 0 ? 1 : 0;
     // current0El.textContent=currentscore;
     player0El.classList.toggle('player--active');
     player1El.classList.toggle('player--active');
}


//Rolling dice
btnRoll.addEventListener('click',function(){
if(playing){

    // Generating random dice number
    const dice = Math.trunc(Math.random() * 6) + 1;
    // console.log(dice);

    //display dice
    diceEl.classList.remove('hidden');
    diceEl.src=`dice-${dice}.png`;

    //Check the rolled 1.
    if(dice !== 1){
        // Add dice to the current score
        currentscore+=dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentscore;
        // current0El.textContent = currentscore;
        // document.querySelector('current--score0').textContent='currentscore';
    }
    else{
       toswap();
    }
}
});

btnHold.addEventListener('click', function(){
    if(playing){

    // Add current score to active players score
    score[activePlayer] += currentscore;
    //score[1]= score[1] + currentScore

    document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];
    // toswap();
    if(score[activePlayer] >= 20){
        playing=false;
        diceEl.classList.add('hidden');
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    }
    else{
        toswap();
    }
}

})

btnNew.addEventListener('click', init);


 
