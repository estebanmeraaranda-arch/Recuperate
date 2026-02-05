const dialogs = [
  "Gud nai, gud dei, gud afternun precioso...",
  "Dicen que los mimos son la mejor medicina, así que te mando unos cuantos...",
  "Ojalá pudiera estar ahí para cuidarte un poquito, pero por ahora te envío mi compañía por acá...",
  "Muchos abrazos y picos lindo, que te recuperes pollito de color c:."
];

// Nombres de tus archivos de imagen
const dialogImages = ["1.png", "2.png", "3.png", "4.png"];

let currentLine = 0;
let isTyping = false;
const textElement = document.getElementById('text-content');
const arrow = document.getElementById('next-arrow');
const portraitImg = document.getElementById('portrait-img');
const portraitCont = document.getElementById('portrait-container');
const dialogBox = document.getElementById('dialog-box');

// Función principal para escribir el texto
async function typeSentence(sentence) {
  isTyping = true;
  arrow.classList.add('hidden');
  textElement.textContent = ""; 
  
  // Cambiar imagen
  portraitImg.src = dialogImages[currentLine];

  // Lógica de posición independiente para la imagen 4
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
}

// Función para avanzar (Z o Click)
function handleNext() {
  if (isTyping) return;
  
  currentLine++;
  if (currentLine < dialogs.length) {
    typeSentence(dialogs[currentLine]);
  } else {
    // Cerrar el cuadro al terminar
    dialogBox.classList.remove('active');
    currentLine = 0;
  }
}

// Evento para Teclado
window.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'z') {
    handleNext();
  }
});

// Evento para Pantallas Táctiles y Mouse
window.addEventListener('click', () => {
  handleNext();
});

// Iniciar automáticamente el primer diálogo
dialogBox.classList.add('active');
typeSentence(dialogs[0]);