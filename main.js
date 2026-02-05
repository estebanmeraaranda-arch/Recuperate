const dialogs = [
  "Gud nai, gud dei, gud afternun precioso",
  "Dicen que los mimos son la mejor medicina, así que te mando unos cuantos por aquí...",
  "Ojalá pudiera estar ahí para cuidarte un poquito, pero por ahora te envío mi compañía por acá.",
  "Muchos abrazos y picos lindo, que te recuperes pollito de color c:."
];

const dialogImages = ["1.png", "2.png", "3.png", "4.png"];

let currentLine = 0;
let isTyping = false;
const textElement = document.getElementById('text-content');
const arrow = document.getElementById('next-arrow');
const portraitImg = document.getElementById('portrait-img');
const portraitCont = document.getElementById('portrait-container');
const dialogBox = document.getElementById('dialog-box');
const btnNext = document.getElementById('btn-next');

async function typeSentence(sentence) {
  isTyping = true;
  arrow.classList.add('hidden');
  btnNext.style.opacity = "0.5"; // Desactivar visualmente mientras escribe
  textElement.textContent = ""; 
  
  portraitImg.src = dialogImages[currentLine];

  if (currentLine === 3) {
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
  btnNext.style.opacity = "1"; // Reactivar al terminar
}

function handleNext() {
  if (isTyping) return;
  
  currentLine++;
  if (currentLine < dialogs.length) {
    typeSentence(dialogs[currentLine]);
  } else {
    dialogBox.classList.remove('active');
    btnNext.style.display = "none"; // Desaparece el botón al final
    currentLine = 0;
  }
}

// Click en el botón
btnNext.addEventListener('click', (e) => {
  e.stopPropagation(); // Evita conflictos si hay otros clicks
  handleNext();
});

// Tecla Z
window.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'z') handleNext();
});

// Iniciar
dialogBox.classList.add('active');
typeSentence(dialogs[0]);