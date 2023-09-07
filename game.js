document.addEventListener('DOMContentLoaded', function() {
  function game(cardCount) { 
    const selectedCards = [], cardsArray = [], audioClick = new Audio();
    const numberBlock = document.getElementById('timer');
    let button = null, buttonReload, timerId, open;
  
    function myCard(number, action) {
      const card = document.createElement('div');
      card.classList.add('card');
      card.textContent = number;
  
      card.addEventListener('click', () => {
        if (selectedCards.length == 0) timer();
        card.classList.contains('open') ? open = true : open = false;
  
        if (open == false) {
          const audioCard = new Audio();
          audioCard.src = 'audio/card.mp3';
          audioCard.autoplay = true;
        
          card.classList.add('open');
          card.classList.remove('card');
          action(card); // Callback
  
          selectedCards.push(true); console.log(selectedCards);
  
          if (selectedCards.length == cardsArray.length) {
            function audioWin() {
              const audio = new Audio();
              audio.src = 'audio/win.mp3';
              audio.autoplay = true;
            }
            
            setTimeout(audioWin, 600);
  
            console.log('Вы открыли все карты!');
  
            if (button == null) {
              button = document.createElement('button');
              button.textContent = 'Сыграть ещё раз';
              button.classList.add('button-reset');
              document.getElementById('reset').append(button);
              button.addEventListener('click', gameRestart);

              buttonReload = document.createElement('button');
              buttonReload.textContent = 'Обновить';
              buttonReload.classList.add('button-reset');
              document.getElementById('reset').append(buttonReload);
              buttonReload.addEventListener('click', () => {
                audioClick.src = 'audio/click.mp3';
                audioClick.autoplay = true;

                setTimeout(() => location.reload(), 200);
              });
            }
          }
        }
      })
  
      document.getElementById('game').append(card);
    }
  
    let firstCard = null, secondCard = null;
  
    function flip(card) {
      if (firstCard == null) {
        firstCard = card;
      } else if (secondCard == null) {
        secondCard = card;
        if (firstCard.textContent == secondCard.textContent) {
          firstCard.classList.add('success');
          secondCard.classList.add('success');
          firstCard = null;
          secondCard = null;
        }
      } else {
          firstCard.classList.remove('open');
          secondCard.classList.remove('open');
          firstCard.classList.add('card');
          secondCard.classList.add('card');
          selectedCards.splice(-2, 2);
  
          firstCard = card;
          secondCard = null;
      }
    }

    if (cardCount == 2) {
      document.getElementById('game').style = "width: 250px;" 
    } else if (cardCount == 6) {
      document.getElementById('game').style = "width: 750px;"
    } else if (cardCount == 8) {
      document.getElementById('game').style = "width: 1000px;"
    } else if (cardCount == 10) {
      document.getElementById('game').style = "width: 1250px;"
    }
  
    if (cardCount < 2 || cardCount > 10 || cardCount % 2 != 0) cardCount = 4;
  
    for (let i = 1; i <= cardCount * cardCount / 2; i++) {
      cardsArray.push(i); // 0: 1 // 2: 2 // 4: 3 // 6: 4
      cardsArray.push(i); // 1: 1 // 3: 2 // 5: 3 // 7: 4
    }
  
    function shuffle(arr) {
      let j, temp;
      for (let i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
      }
      return arr;
    } // Fisher-Yates.
  
    shuffle(cardsArray); 
    console.log(cardsArray);
  
    for (let element of cardsArray) {
      myCard(element, flip)
    }
  
    function gameRestart() { 
      audioClick.src = 'audio/click.mp3';
      audioClick.autoplay = true;
      
      numberBlock.removeAttribute('style');
      numberBlock.textContent = 60;
      clearInterval(timerId);
      timerId = null;
  
      selectedCards.splice(0, selectedCards.length);
      const elements = document.getElementById('game');
  
      while (elements.firstChild) {
        elements.removeChild(elements.firstChild);
      }
  
      shuffle(cardsArray); 
  
      for (let element of cardsArray) {
        myCard(element, flip);
      }
    }

    function timer() {
      numberBlock.textContent = 60;
  
      timerId = setInterval(updateTime, 1000);
      
      function updateTime() {
        if (numberBlock.textContent <= 0) {
          alert("Вы проиграли!");
          numberBlock.removeAttribute('style');
          gameRestart();
          clearInterval(timerId);
          timerId = null;
          return;
        } else if (selectedCards.length == cardsArray.length) {
          numberBlock.removeAttribute('style');
          clearInterval(timerId);
          timerId = null;
          return;
        } else if (numberBlock.textContent <= 11) { 
          numberBlock.style = 'color: red;'
        }
      
        numberBlock.textContent -= 1;
      }
    }
  };

  window.game = game;
})
  


  