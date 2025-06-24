// ==========================
// CALCULADORA EN JAVASCRIPT
// ==========================

// Manejo de entrada numérica y punto decimal
function handleNumber(e) {
  if (e === "." && currentInput.includes(".")) return;
  if (e === "." && currentInput === "") {
    currentInput = "0.";
    fullExpression += "0.";
  } else {
    currentInput += e;
    fullExpression += e;
  }
  updateDisplay(fullExpression);
}

// Manejo de operadores (+, -, *, /)
function handleOperator(e) {
  if (currentInput !== "" || previousInput !== "") {
    if (currentInput === "" && previousInput !== "") {
      // Reemplaza el operador anterior si el último carácter lo era
      if (isOperator(fullExpression.slice(-1))) {
        fullExpression = fullExpression.slice(0, -1) + e;
      } else {
        fullExpression += e;
      }
      operator = e;
      updateDisplay(fullExpression);
      return;
    }

    // Si ya hay una operación anterior, calcula el resultado antes de continuar
    if (previousInput && operator) {
      calculateResult();
    }

    operator = e;
    previousInput = currentInput || previousInput;
    currentInput = "";
    fullExpression = previousInput + operator;
    updateDisplay(fullExpression);
  }
}

// Calcula el resultado final al presionar "="
function calculateResult() {
  if (previousInput && operator) {
    const e = parseFloat(previousInput),
          a = parseFloat(currentInput || previousInput); // Si no hay nuevo número, repite el anterior
    let o;
    switch (operator) {
      case "+": o = e + a; break;
      case "-": o = e - a; break;
      case "*": o = e * a; break;
      case "/": o = a !== 0 ? e / a : "Error"; break;
      default: return;
    }
    if (typeof o === "number") {
      o = parseFloat(o.toFixed(7)); // Redondeo para evitar decimales infinitos
    }
    updateDisplay(o.toString());
    previousInput = o.toString();
    currentInput = "";
    operator = "";
    fullExpression = previousInput;
  }
}

// Calcula porcentaje del valor actual
function calculatePercentage() {
  if (currentInput) {
    let e = parseFloat(currentInput) / 100;
    e = parseFloat(e.toFixed(7));
    currentInput = e.toString();
    fullExpression = currentInput;
    updateDisplay(currentInput);
  }
}

// Calcula raíz cuadrada del valor actual
function calculateSquareRoot() {
  const e = currentInput
    ? parseFloat(currentInput)
    : previousInput
    ? parseFloat(previousInput)
    : null;
  if (e !== null) {
    if (e < 0) return void updateDisplay("Error");
    let a = Math.sqrt(e);
    a = parseFloat(a.toFixed(7));
    currentInput = a.toString();
    fullExpression = currentInput;
    previousInput = currentInput;
    updateDisplay(currentInput);
  }
}

// Manejo de la memoria ("M" guarda y recupera el valor mostrado)
let memoryValue = null;
function handleMemory() {
  if (memoryValue === null) {
    memoryValue = display.innerText;
    updateDisplay("M: " + memoryValue);
  } else {
    currentInput = memoryValue;
    fullExpression = memoryValue;
    updateDisplay(memoryValue);
    memoryValue = null;
  }
}

// Limpia la pantalla y variables internas
function clearDisplay() {
  currentInput = "";
  previousInput = "";
  operator = "";
  fullExpression = "";
  updateDisplay("0");
}

// Muestra contenido en pantalla, reemplazando * por x
function updateDisplay(e) {
  display.innerText = e.replace(/\*/g, "x");
}

// Determina si un carácter es un operador
function isOperator(e) {
  return ["+", "-", "*", "/"].includes(e);
}

// =========
// EVENTOS
// =========

const buttons = document.querySelectorAll(".item"),
      display = document.getElementById("display");

let currentInput = "",
    fullExpression = "",
    previousInput = "",
    operator = "";

// Manejo de clics sobre botones
buttons.forEach((e) => {
  e.addEventListener("click", () => {
    const a = e.getAttribute("data-value");
    e.blur(); // Evita que el botón quede visualmente enfocado (especialmente en móviles)
    if (a === "C") clearDisplay();
    else if (a === "=") calculateResult();
    else if (a === "%") calculatePercentage();
    else if (a === "√") calculateSquareRoot();
    else if (a === "M") handleMemory();
    else if (isOperator(a)) handleOperator(a);
    else handleNumber(a);
  });
});

// Manejo de teclado
document.addEventListener("keydown", (e) => {
  const a = e.key;
  if (a === "Escape") clearDisplay();
  else if (a === "Enter" || a === "=") calculateResult();
  else if (a === "%") calculatePercentage();
  else if (a === "√") calculateSquareRoot();
  else if (a.toLowerCase() === "m") handleMemory();
  else if (isOperator(a)) handleOperator(a);
  else if (!isNaN(a) || a === ".") handleNumber(a);
});

// Previene comportamiento por defecto de Enter en formularios
document.addEventListener("keypress", (e) => {
  if (e.key === "Enter") e.preventDefault();
});

// =====================
// DATOS CURIOSOS MATH
// =====================

const mathFacts = [
  "El número π (pi) es irracional y tiene más de un billón de decimales conocidos.",
  "La fórmula de Euler, e^{iπ} + 1 = 0, conecta los números más importantes de las matemáticas.",
  "El 0 fue utilizado por primera vez en la India alrededor del siglo V por matemáticos como Brahmagupta.",
  "El número 1729 es conocido como el número de Hardy-Ramanujan, el menor número expresable como la suma de dos cubos de dos formas distintas.",
  "Los números primos mayores a 2 siempre son impares.",
  "El triángulo de Pascal contiene los coeficientes binomiales usados en álgebra.",
  "La secuencia de Fibonacci aparece en la naturaleza, como en los pétalos de las flores y las conchas de los moluscos.",
  "La raíz cuadrada de 2 (√2) fue el primer número conocido como irracional.",
  "El número e, aproximadamente igual a 2.718, es la base del logaritmo natural y aparece en muchas áreas de la matemática.",
  "La espiral logarítmica basada en la secuencia de Fibonacci se encuentra en los girasoles, piñas y caracolas.",
  "El símbolo ∞ para representar el infinito fue introducido por John Wallis en 1655.",
  "Un círculo tiene 360 grados porque los babilonios usaban un sistema de base 60.",
  "Hay infinitos números primos; esto fue demostrado por Euclides alrededor del 300 a.C.",
  "La suma de los números de un dado estándar siempre es 7 si sumas los números opuestos (1-6, 2-5, 3-4).",
  "La probabilidad de que dos personas compartan cumpleaños en un grupo de 23 personas es mayor al 50%.",
  "0! = 1 porque hay exactamente una forma de organizar cero elementos: no hacer nada.",
  "El número 1 no es primo porque tiene solo un divisor (sí mismo).",
  "En un tablero de ajedrez, hay 64 casillas, pero hay 204 posibles rectángulos que puedes formar dentro de él.",
  "Un grafo completo con n nodos tiene exactamente n(n-1)/2 aristas.",
  "El término 'matemáticas' proviene del griego mathema, que significa 'aprendizaje' o 'conocimiento'.",
  "Hay exactamente 10.000.000.000.000.000 posiciones legales en el juego del ajedrez.",
  "La conjetura de Collatz (o problema 3x+1) aún no ha sido resuelta.",
  "El número 0 no es ni positivo ni negativo.",
  "La suma de los ángulos interiores de un triángulo es siempre 180° en un plano euclidiano.",
  "El sistema binario (0 y 1) es la base del funcionamiento de las computadoras modernas.",
  "El teorema de los cuatro colores establece que cualquier mapa plano se puede colorear con solo cuatro colores sin que regiones adyacentes compartan el mismo color.",
  "El número 6 es el primer número perfecto, porque es igual a la suma de sus divisores propios (1 + 2 + 3 = 6).",
  "El infinito no es un número, sino un concepto matemático que representa algo sin límite.",
  "En un cubo, el número total de caras, vértices y aristas cumple la fórmula de Euler: V - E + F = 2.",
  "Los números imaginarios se llaman así porque no tienen representación en la línea de números reales; están basados en i = √-1.",
  "Las torres de Hanói es un problema matemático y de lógica que tiene una solución basada en potencias de 2.",
  "Hay infinitos números racionales entre dos números racionales cualesquiera.",
  "La distancia más corta entre dos puntos en un espacio curvado no es una línea recta, sino una geodésica.",
  "El número 1 es el único número que es su propio cuadrado, cubo y cualquier otra potencia.",
  "La suma de los números de un cuadrado mágico es siempre la misma para cada fila, columna y diagonal.",
  "El número primo más pequeño es 2, y es el único primo par.",
  "La suma de los primeros n números naturales es igual a n(n+1)/2.",
  "Los fractales son patrones geométricos que se repiten a diferentes escalas; el conjunto de Mandelbrot es un famoso ejemplo.",
  "El teorema de Pitágoras, a^2 + b^2 = c^2, solo funciona en triángulos rectángulos.",
  "Un poliedro con F caras, V vértices y E aristas satisface V - E + F = 2 (Teorema de Euler).",
];

let lastFactIndex = -1;

// Muestra un dato curioso diferente cada 6 segundos
function updateMathFact() {
  const e = document.getElementById("math-facts");
  if (e) {
    let a;
    do {
      a = Math.floor(Math.random() * mathFacts.length);
    } while (a === lastFactIndex);
    lastFactIndex = a;
    const o = mathFacts[a];
    e.innerHTML = `<p>${o}</p>`;
  }
}
setInterval(updateMathFact, 6000);
updateMathFact();
