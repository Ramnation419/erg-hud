const hud = document.querySelector(".hud");

const ergData = {
  "1202": {
    name: "DIESEL FUEL",
    guide: "128",
    hazard: "Flammable Liquid",
    isolation: "Keep unauthorized personnel away.",
    response: "Eliminate ignition sources. Avoid low areas."
  },

  "1203": {
    name: "GASOLINE",
    guide: "128",
    hazard: "Flammable Liquid",
    isolation: "Keep unauthorized personnel away.",
    response: "Eliminate ignition sources. Avoid low areas."
  },

  "1075": {
    name: "LIQUEFIED PETROLEUM GAS",
    guide: "115",
    hazard: "Flammable Gas",
    isolation: "Keep unauthorized personnel away. Stay upwind.",
    response: "Eliminate ignition sources. Avoid low areas."
  },

  "1017": {
    name: "CHLORINE",
    guide: "124",
    hazard: "Toxic Gas / Oxidizer",
    isolation: "Keep unauthorized personnel away. Stay upwind.",
    response: "Avoid contact. Do not enter vapor cloud without proper PPE."
  },

  "3480": {
    name: "LITHIUM ION BATTERIES",
    guide: "147",
    hazard: "Fire / Explosion",
    isolation: "Keep unauthorized personnel away.",
    response: "Monitor for fire, heat, smoke and damaged cells."
  }
};
let activeErgNumber = "1203";
let enteredErgNumber = "";

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

    <button data-action="home" class="home-button">HOME</button>
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

function renderEmsMenu() {
  hud.innerHTML = `
    <div class="header">EMS</div>

    <div class="menu">
      <button data-action="adult-cpr">ADULT CPR</button>
      <button data-action="anaphylaxis">ANAPHYLAXIS</button>
      <button data-action="opioid">OPIOID OVERDOSE</button>
      <button data-action="home">HOME</button>
    </div>

    <div class="footer">DEMO CONTENT</div>
  `;

  focusFirst();
}

function renderAdultCpr() {
  hud.innerHTML = `
    <div class="header">ADULT CPR</div>

    <div class="result-title">CARDIAC ARREST</div>

    <div class="info-block">
      CHECK RESPONSIVENESS
    </div>

    <div class="info-block">
      ACTIVATE EMS / GET AED
    </div>

    <div class="info-block">
      START HIGH-QUALITY CPR
    </div>

    <div class="info-block">
      30 : 2
    </div>

    <div class="info-block">
      100–120 / MIN
    </div>

    <div class="menu">
  <button data-action="ems-back">BACK</button>
  <button data-action="home">HOME</button>
</div>

    <div class="footer">MOCK PROTOCOL • DEMO ONLY</div>
  `;

  focusFirst();
}

function renderAnaphylaxis() {
  hud.innerHTML = `
    <div class="header">ANAPHYLAXIS</div>

    <div class="result-title">SEVERE ALLERGIC REACTION</div>

    <div class="info-block">
      ASSESS AIRWAY / BREATHING
    </div>

    <div class="info-block">
      REMOVE TRIGGER IF POSSIBLE
    </div>

    <div class="info-block">
      EPINEPHRINE PER PROTOCOL
    </div>

    <div class="info-block">
      OXYGEN / AIRWAY SUPPORT
    </div>

    <div class="info-block">
      RAPID TRANSPORT
    </div>

   <div class="menu">
  <button data-action="ems-back">BACK</button>
  <button data-action="home">HOME</button>
</div>

    <div class="footer">MOCK PROTOCOL • DEMO ONLY</div>
  `;

  focusFirst();
}

function renderOpioid() {
  hud.innerHTML = `
    <div class="header">OPIOID OVERDOSE</div>

    <div class="result-title">RESPIRATORY DEPRESSION</div>

    <div class="info-block">
      ASSESS AIRWAY / BREATHING
    </div>

    <div class="info-block">
      SUPPORT VENTILATION
    </div>

    <div class="info-block">
      NALOXONE PER PROTOCOL
    </div>

    <div class="info-block">
      REASSESS RESPIRATIONS
    </div>

    <div class="info-block">
      TRANSPORT / MONITOR
    </div>

    <div class="menu">
  <button data-action="ems-back">BACK</button>
  <button data-action="home">HOME</button>
</div>

    <div class="footer">MOCK PROTOCOL • DEMO ONLY</div>
  `;

  focusFirst();
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  const action = button.dataset.action;
  const digit = button.dataset.digit;

  if (digit) {
    if (enteredErgNumber.length < 4) {
      enteredErgNumber += digit;

      document.querySelector("#ergNumber").textContent =
        enteredErgNumber.padEnd(4, "-");
    }
    return;
  }

  if (action === "erg") {
    renderErgLookup();
    return;
  }

  if (action === "ems") {
    renderEmsMenu();
    return;
  }

  if (action === "adult-cpr") {
    renderAdultCpr();
    return;
  }
if (action === "anaphylaxis") {
  renderAnaphylaxis();
  return;
}

if (action === "opioid") {
  renderOpioid();
  return;
}
if (action === "ems-back") {
  renderEmsMenu();
  return;
}
  if (action === "clear") {
    enteredErgNumber = "";
    document.querySelector("#ergNumber").textContent = "----";
    return;
  }

  if (action === "search") {
    if (enteredErgNumber.length > 0) {
      renderErgResult(enteredErgNumber);
    }
    return;
  }

  if (action === "details") {
    renderErgDetails();
    return;
  }

  if (action === "back-lookup") {
    renderErgLookup();
    return;
  }

  if (action === "back-result") {
    renderErgResult(activeErgNumber);
    return;
  }

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
    event.preventDefault();

    if (document.activeElement.tagName === "BUTTON") {
      document.activeElement.click();
    }
  }
});

renderMainMenu();