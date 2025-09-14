const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
const modeToggle = document.getElementById("modeToggle");
const historyBtn = document.getElementById("historyBtn");
const historyDrawer = document.getElementById("historyDrawer");
const closeHistory = document.getElementById("closeHistory");
const historyList = document.getElementById("historyList");

let currentInput = "";

// Toggle dark/light mode
modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  modeToggle.textContent = document.body.classList.contains("dark")
    ? "☀️ Light"
    : "🌙 Dark";
});

// Open/close history drawer
historyBtn.addEventListener("click", () => historyDrawer.classList.add("active"));
closeHistory.addEventListener("click", () => historyDrawer.classList.remove("active"));

// Replace math symbols
function formatInput(input) {
  input = input.replace(/π/g, Math.PI);
  input = input.replace(/e/g, Math.E);
  input = input.replace(/√/g, "Math.sqrt");
  input = input.replace(/x²/g, "**2");
  input = input.replace(/x³/g, "**3");
  input = input.replace(/\^/g, "**");
  input = input.replace(/sin/g, "Math.sin");
  input = input.replace(/cos/g, "Math.cos");
  input = input.replace(/tan/g, "Math.tan");
  input = input.replace(/log/g, "Math.log10");
  input = input.replace(/ln/g, "Math.log");
  return input;
}

// Add history
function addHistory(expression, result) {
  const li = document.createElement("li");
  li.textContent = `${expression} = ${result}`;
  historyList.prepend(li);
}

// Calculator logic
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "C") {
      currentInput = "";
      display.textContent = "0";
    } else if (value === "=") {
      try {
        const formatted = formatInput(currentInput);
        const result = eval(formatted);
        addHistory(currentInput, result);
        currentInput = result.toString();
        display.textContent = currentInput;
      } catch {
        display.textContent = "Error";
        currentInput = "";
      }
    } else if (!["🌙 Dark", "☀️ Light", "📜 History", "Close"].includes(value)) {
      currentInput += value;
      display.textContent = currentInput;
    }
  });
});
