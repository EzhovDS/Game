document.addEventListener('DOMContentLoaded', function() {
  const form = document.createElement('form');
  const input = document.createElement('input');
  const button = document.createElement('button');
  const paragraph = document.createElement('p');
  
  paragraph.textContent = 'Введите чётное число от 2 до 10 🙂';
  input.placeholder = 'Кол-во карточек по вертикали/горизонтали';
  input.classList.add('input');
  button.classList.add('button-start');
  button.textContent = 'Начать игру';
  button.disabled = true; 
  
  let inputValue;

  input.addEventListener('input', () => { 
    inputValue = Number(input.value);

    if (inputValue) {
      button.removeAttribute('disabled');
    } else { button.disabled = true; }
  }); 

  button.addEventListener('click', () => {
    const audioClick = new Audio();
    audioClick.src = 'audio/click.mp3';
    audioClick.autoplay = true;

    document.body.removeChild(document.getElementById('container'));
    game(inputValue);  
  });

  form.append(paragraph);
  form.append(input);
  form.append(button);
  document.getElementById('container').append(form);
});



