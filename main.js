const dialogs = [
  "Gud nai, gud dei, gud afternun precioso...",
  "Dicen que los mimos son la mejor medicina, así que te mando como puedo... ",
  "Ojalá pudiera estar ahí para cuidarte un poquito, pero por ahora te envío mi compañía desde aqui...",
  "Muchos abrazos y picos lindo, que te recuperes pollito de color c:."
];

// Nombres de tus archivos
const dialogImages = ["1.png", "2.png", "3.png", "4.png"];

let currentLine = 0;
let isTyping = false;
const textElement = document.getElementById('text-content');
const arrow = document.getElementById('next-arrow');
const portraitImg = document.getElementById('portrait-img');
const portraitCont = document.getElementById('portrait-container');
const dialogBox = document.querySelector('.stardew-box');

async function typeSentence(sentence) {
  isTyping = true;
  arrow.classList.add('hidden');
  textElement.textContent = "";
  
  // Cambiar la imagen
  portraitImg.src = dialogImages[currentLine];

  // Hacer que la imagen 4 sea independiente por clase CSS
  if (currentLine === 3) { // El índice 3 es la cuarta imagen
    portraitCont.classList.add('image-4-special');
  } else {
    portraitCont.classList.remove('image-4-special');
  }
  
  for (const char of sentence) {
    textElement.textContent += char;
    await new Promise(resolve => setTimeout(resolve, 40));
  }
  
  isTyping = false;
  arrow.classList.remove('hidden');
}

window.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'z') {
    if (isTyping) return;
    
    currentLine++;
    if (currentLine < dialogs.length) {
      typeSentence(dialogs[currentLine]);
    } else {
      dialogBox.classList.remove('active');
      document.body.classList.remove('dialog-active');
      textElement.textContent = "";
      currentLine = 0;
    }
  }
});

// Iniciar
dialogBox.classList.add('active');
typeSentence(dialogs[0]);