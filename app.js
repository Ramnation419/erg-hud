const hud = document.querySelector(".hud");

const ergData = {
  "1203": {
    name: "GASOLINE",
    guide: "128",
    hazard: "Flammable Liquid",
    isolation: "Keep unauthorized personnel away.",
    response: "Eliminate ignition sources and avoid low areas."
  }
};

let activeErgNumber = "1203";

function focusFirst() {
  const first = document.querySelector("button");
  if (first) first.focus();
}

function renderMainMenu() {
  hud.innerHTML = `
    <div class="header">FIRE LENS</div>

    <div class="menu">
      <button data-action="erg">ERG</button>
      <button data-action="ems">EMS</button>
      <button data-action="equipment">EQUIPMENT</button>
      <button data-action="preplans">PREPLANS</button>
    </div>

    <div class="footer">FIRE / EMS INFORMATION</div>
  `;

  focusFirst();
}

let enteredErgNumber = "";

function renderErgLookup() {
  enteredErgNumber = "";
  hud.innerHTML = `
    <div class="header">ERG LOOKUP</div>

    <div class="erg-number" id="ergNumber">
      ----
    </div>

    <div class="keypad">
      <button data-digit="1">1</button>
      <button data-digit="2">2</button>
      <button data-digit="3">3</button>

      <button data-digit="4">4</button>
      <button data-digit="5">5</button>
      <button data-digit="6">6</button>

      <button data-digit="7">7</button>
      <button data-digit="8">8</button>
      <button data-digit="9">9</button>

      <button data-action="clear">CLR</button>
      <button data-digit="0">0</button>
      <button data-action="search">GO</button>
    </div>

    <button data-action="home" class="home-button">
      HOME
    </button>
  `;

  focusFirst();
}

function renderErgResult(number) {
  activeErgNumber = number;
  const result = ergData[number];

  if (!result) {
    hud.innerHTML = `
      <div class="header">ERG RESULT</div>

      <div class="result-title">NO RECORD FOUND</div>
      <div class="result-sub">UN / NA ${number}</div>

      <div class="menu">
        <button data-action="back-lookup">BACK</button>
        <button data-action="home">HOME</button>
      </div>
    `;

    focusFirst();
    return;
  }

  hud.innerHTML = `
    <div class="header">ERG RESULT</div>

    <div class="result-title">${result.name}</div>
    <div class="result-sub">UN ${number}</div>
    <div class="result-sub">GUIDE ${result.guide}</div>
    <div class="hazard">${result.hazard}</div>

    <div class="menu">
      <button data-action="details">DETAILS</button>
      <button data-action="back-lookup">BACK</button>
      <button data-action="home">HOME</button>
    </div>
  `;

  focusFirst();
}

function renderErgDetails() {
  const result = ergData[activeErgNumber];

  hud.innerHTML = `
    <div class="header">GUIDE ${result.guide}</div>

    <div class="result-title">${result.name}</div>

    <div class="info-block">
      <strong>ISOLATION</strong><br>
      ${result.isolation}
    </div>

    <div class="info-block">
      <strong>RESPONSE</strong><br>
      ${result.response}
    </div>

    <div class="menu">
      <button data-action="back-result">BACK</button>
      <button data-action="home">HOME</button>
    </div>
  `;

  focusFirst();
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("button");

  if (!button) return;

  const action = button.dataset.action;
  const digit = button.dataset.digit;

  // Numeric keypad
  if (digit) {
    if (enteredErgNumber.length < 4) {
      enteredErgNumber += digit;

      document.querySelector("#ergNumber").textContent =
        enteredErgNumber.padEnd(4, "-");
    }

    return;
  }

  // Main menu
  if (action === "erg") {
    renderErgLookup();
    return;
  }

  // Clear ERG number
  if (action === "clear") {
    enteredErgNumber = "";

    document.querySelector("#ergNumber").textContent = "----";
    return;
  }

  // Search ERG
  if (action === "search") {
    if (enteredErgNumber.length > 0) {
      renderErgResult(enteredErgNumber);
    }

    return;
  }

  // Open details
  if (action === "details") {
    renderErgDetails();
    return;
  }

  // Back to lookup
  if (action === "back-lookup") {
    renderErgLookup();
    return;
  }

  // Back to result
  if (action === "back-result") {
    renderErgResult(activeErgNumber);
    return;
  }

  // Main Fire Lens menu
  if (action === "home") {
    renderMainMenu();
    return;
  }
});
document.addEventListener("keydown", (event) => {
  const focusable = [
    ...document.querySelectorAll("button")
  ];

  if (!focusable.length) return;

  let currentIndex =
    focusable.indexOf(document.activeElement);

  if (currentIndex < 0) {
    focusable[0].focus();
    return;
  }

  if (event.key === "ArrowRight") {
    event.preventDefault();

    currentIndex =
      (currentIndex + 1) % focusable.length;

    focusable[currentIndex].focus();
    return;
  }

  if (event.key === "ArrowLeft") {
    event.preventDefault();

    currentIndex =
      (currentIndex - 1 + focusable.length) %
      focusable.length;

    focusable[currentIndex].focus();
    return;
  }

  if (event.key === "Enter") {
    if (document.activeElement.tagName === "BUTTON") {
      event.preventDefault();
      document.activeElement.click();
    }
  }
});

renderMainMenu();