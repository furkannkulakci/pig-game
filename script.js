'use strict';
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // başlangıçta skorları sıfırlar.
  score0El.textContent = 0;
  score1El.textContent = 0;
  // başlangıçta zar görselini gizler.
  diceEl.classList.add('hidden');

  current0El.textContent = 0;
  current1El.textContent = 0;

  // new game diyince arka planlar başlangıca döner
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  // new game diyince aktif oyuncu başlangıca döner
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// zar atma fonsksiyonu
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1- random zar değeri üretir.
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2- zarı gösterir => hidden class kaldırılır.
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3- Gelen zarı kontrol et.
    // gelen zar değeri 1 den farklı ise;
    if (dice !== 1) {
      currentScore += dice; // veya currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // oyuncu değiştiğinde ise;
      switchPlayer();
    }
  }
});

// Puanları saklama fonksşyonu
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1- aktif oyuncunun puanını mevcut puana ekleriz.
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2- oyuncu puanı kontrol edilir. puan <= 100 ise;
    if (scores[activePlayer] >= 20) {
      // Oyun biter.
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // değilse oyun diğer oyuncuya geçer
      switchPlayer();
    }
  }
});

// Yeni oyun fonksiyonu
btnNew.addEventListener('click', init);
