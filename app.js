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
function renderEquipmentMenu() {
  hud.innerHTML = `
    <div class="header">EQUIPMENT</div>

    <div class="menu">
      <button data-action="emr14">EMR 14</button>
      <button data-action="home">HOME</button>
    </div>

    <div class="footer">APPARATUS INFORMATION</div>
  `;

  focusFirst();
}

function renderEmr14() {
  hud.innerHTML = `
    <div class="header">EMR 14</div>

    <div class="result-title">1997 CHEVROLET 3500</div>
    <div class="result-sub">GAS • EMR / BRUSH</div>

    <div class="menu">
      <button data-action="emr14-medical">MEDICAL</button>
      <button data-action="emr14-fire">FIRE / WATER</button>
      <button data-action="emr14-tools">TOOLS</button>
      <button data-action="emr14-vehicle">VEHICLE INFO</button>
      <button data-action="equipment-back">BACK</button>
      <button data-action="home">HOME</button>
    </div>
  `;

  focusFirst();
}

function renderEmr14Medical() {
  hud.innerHTML = `
    <div class="header">EMR 14 • MEDICAL</div>

    <div class="info-block">
      <strong>EMR MED BAG</strong><br>
      DRIVER-SIDE FRONT BED TOOLBOX
    </div>

    <div class="info-block">
      <strong>AED</strong><br>
      DRIVER-SIDE FRONT BED TOOLBOX
    </div>

    <div class="menu">
      <button data-action="emr14-back">BACK</button>
      <button data-action="home">HOME</button>
    </div>
  `;

  focusFirst();
}

function renderEmr14Fire() {
  hud.innerHTML = `
    <div class="header">EMR 14 • FIRE / WATER</div>

    <div class="menu">
      <button data-action="emr14-pump">PUMP OPERATION</button>
      <button data-action="emr14-water">WATER SYSTEM</button>
      <button data-action="emr14-back">BACK</button>
      <button data-action="home">HOME</button>
    </div>
  `;

  focusFirst();
}

function renderEmr14Water() {
  hud.innerHTML = `
    <div class="header">EMR 14 • WATER</div>

    <div class="info-block">
      <strong>WATER TANK</strong><br>
      300 GALLONS
    </div>

    <div class="info-block">
      <strong>HANDLINES</strong><br>
      2 • REAR • EITHER SIDE OF PUMP
    </div>

    <div class="info-block">
      <strong>FRONT SPRAYS</strong><br>
      LEFT + RIGHT BUMPER CORNERS
    </div>

    <div class="info-block">
      <strong>FILL HOSE / STORZ</strong><br>
      REAR • PRECONNECTED
    </div>

    <div class="info-block">
      <strong>WATER EXTINGUISHERS</strong><br>
      3 • PASSENGER-SIDE FRONT BED
    </div>

    <div class="menu">
      <button data-action="emr14-fire-back">BACK</button>
      <button data-action="home">HOME</button>
    </div>
  `;

  focusFirst();
}

function renderEmr14Tools() {
  hud.innerHTML = `
    <div class="header">EMR 14 • TOOLS</div>

    <div class="info-block">
      <strong>ROPE BAG</strong><br>
      DRIVER-SIDE FRONT BED TOOLBOX
    </div>

    <div class="info-block">
      <strong>PULL STRAP</strong><br>
      BEHIND CAB BENCH SEAT
    </div>

    <div class="menu">
      <button data-action="emr14-back">BACK</button>
      <button data-action="home">HOME</button>
    </div>
  `;

  focusFirst();
}

function renderEmr14Vehicle() {
  hud.innerHTML = `
    <div class="header">EMR 14 • VEHICLE</div>

    <div class="result-title">1997 CHEVROLET 3500</div>

    <div class="info-block">
      GAS ENGINE
    </div>

    <div class="info-block">
      EMR / BRUSH CONFIGURATION
    </div>

    <div class="info-block">
      300 GAL BRUSH SKID
    </div>

    <div class="menu">
      <button data-action="emr14-back">BACK</button>
      <button data-action="home">HOME</button>
    </div>
  `;

  focusFirst();
}

function renderEmr14Pump() {
  hud.innerHTML = `
    <div class="header">EMR 14 • PUMP</div>

    <div class="result-title">PUMP OPERATION</div>

    <div class="menu">
      <button data-action="pump-start">START</button>
      <button data-action="pump-operate">OPERATE</button>
      <button data-action="pump-stop">SHUTDOWN</button>
      <button data-action="emr14-fire-back">BACK</button>
      <button data-action="home">HOME</button>
    </div>
  `;

  focusFirst();
}

function renderPumpStart() {
  hud.innerHTML = `
    <div class="header">PUMP START</div>

    <div class="info-block">
      TRUCK → RUNNING
    </div>

    <div class="info-block">
      1. CHOKE → ON<br>
      2. FUEL → START<br>
      3. IGNITION → RUN<br>
      4. HOLD START UNTIL RUNNING<br>
      5. CHOKE → OFF
    </div>

    <div class="info-block">
      RECIRC → OPEN
    </div>

    <div class="menu">
      <button data-action="pump-back">BACK</button>
      <button data-action="home">HOME</button>
    </div>
  `;

  focusFirst();
}

function renderPumpOperate() {
  hud.innerHTML = `
    <div class="header">PUMP OPERATION</div>

    <div class="info-block">
      <strong>STANDBY / NO FLOW</strong><br>
      RECIRC → OPEN
    </div>

    <div class="info-block">
      <strong>FLOWING WATER</strong><br>
      RECIRC → CLOSED
    </div>

    <div class="info-block">
      FUEL LEVER<br>
      START → RUN
    </div>

    <div class="menu">
      <button data-action="pump-back">BACK</button>
      <button data-action="home">HOME</button>
    </div>
  `;

  focusFirst();
}

function renderPumpStop() {
  hud.innerHTML = `
    <div class="header">PUMP SHUTDOWN</div>

    <div class="info-block">
      1. FUEL → IDLE<br>
      2. ALLOW ENGINE TO IDLE<br>
      3. IGNITION → OFF<br>
      4. RECIRC → OPEN
    </div>

    <div class="menu">
      <button data-action="pump-back">BACK</button>
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
if (action === "equipment") {
  renderEquipmentMenu();
  return;
}

if (action === "emr14") {
  renderEmr14();
  return;
}

if (action === "emr14-medical") {
  renderEmr14Medical();
  return;
}

if (action === "emr14-fire") {
  renderEmr14Fire();
  return;
}

if (action === "emr14-tools") {
  renderEmr14Tools();
  return;
}

if (action === "emr14-vehicle") {
  renderEmr14Vehicle();
  return;
}

if (action === "emr14-water") {
  renderEmr14Water();
  return;
}

if (action === "emr14-pump") {
  renderEmr14Pump();
  return;
}

if (action === "pump-start") {
  renderPumpStart();
  return;
}

if (action === "pump-operate") {
  renderPumpOperate();
  return;
}

if (action === "pump-stop") {
  renderPumpStop();
  return;
}

if (action === "equipment-back") {
  renderEquipmentMenu();
  return;
}

if (action === "emr14-back") {
  renderEmr14();
  return;
}

if (action === "emr14-fire-back") {
  renderEmr14Fire();
  return;
}

if (action === "pump-back") {
  renderEmr14Pump();
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