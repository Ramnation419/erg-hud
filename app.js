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
      <button data-action="ems-cardiac">CARDIAC</button>
      <button data-action="ems-medical">MEDICAL</button>
      <button data-action="ems-trauma">TRAUMA</button>
      <button data-action="home">HOME</button>
    </div>

    <div class="footer">DEMO • VERIFY LOCAL PROTOCOL</div>
  `;

  focusFirst();
}

function renderAdultCpr() {
  hud.innerHTML = `
    <div class="header">ADULT CPR</div>

    <div class="result-title">CARDIAC ARREST</div>

    <div class="info-block">
      <strong>START CPR</strong><br>
      30 : 2
    </div>

    <div class="info-block">
      <strong>RATE</strong><br>
      100–120 / MIN
    </div>

    <div class="info-block">
      <strong>DEPTH</strong><br>
      2–2.4 IN • 5–6 CM
    </div>

    <div class="info-block">
      FULL RECOIL<br>
      MINIMIZE PAUSES
    </div>

    <div class="info-block">
      AED / DEFIB ASAP
    </div>

    <div class="menu">
      <button data-action="cardiac-back">BACK</button>
      <button data-action="home">HOME</button>
    </div>

    <div class="footer">DEMO • VERIFY LOCAL PROTOCOL</div>
  `;

  focusFirst();
}
function renderChestPain() {
  hud.innerHTML = `
    <div class="header">CHEST PAIN</div>

    <div class="info-block">
      ABC
    </div>

    <div class="info-block">
      OPQRST / SAMPLE
    </div>

    <div class="info-block">
      VITALS • SpO₂
    </div>

    <div class="info-block">
      12-LEAD IF AVAILABLE
    </div>

    <div class="info-block">
      ASPIRIN<br>
      PER LOCAL PROTOCOL
    </div>

    <div class="info-block">
      MONITOR • REASSESS<br>
      TRANSPORT
    </div>

    <div class="menu">
      <button data-action="cardiac-back">BACK</button>
      <button data-action="home">HOME</button>
    </div>

    <div class="footer">DEMO • VERIFY LOCAL PROTOCOL</div>
  `;

  focusFirst();
}
function renderAnaphylaxis() {
  hud.innerHTML = `
    <div class="header">ANAPHYLAXIS</div>

    <div class="info-block">
      AIRWAY • BREATHING<br>
      CIRCULATION
    </div>

    <div class="info-block">
      <strong>EPINEPHRINE</strong><br>
      PER LOCAL PROTOCOL
    </div>

    <div class="info-block">
      OXYGEN / AIRWAY SUPPORT
    </div>

    <div class="info-block">
      MONITOR FOR SHOCK
    </div>

    <div class="info-block">
      REASSESS<br>
      TRANSPORT
    </div>

    <div class="menu">
      <button data-action="medical-back">BACK</button>
      <button data-action="home">HOME</button>
    </div>

    <div class="footer">DEMO • VERIFY LOCAL PROTOCOL</div>
  `;

  focusFirst();
}

function renderOpioid() {
  hud.innerHTML = `
    <div class="header">OPIOID OVERDOSE</div>

    <div class="info-block">
      CHECK RESPONSIVENESS
    </div>

    <div class="info-block">
      AIRWAY • BREATHING<br>
      PULSE
    </div>

    <div class="info-block">
      <strong>SUPPORT VENTILATION</strong>
    </div>

    <div class="info-block">
      NALOXONE<br>
      PER LOCAL PROTOCOL
    </div>

    <div class="info-block">
      IF PULSELESS<br>
      START CPR + AED
    </div>

    <div class="info-block">
      REASSESS
    </div>

    <div class="menu">
      <button data-action="medical-back">BACK</button>
      <button data-action="home">HOME</button>
    </div>

    <div class="footer">DEMO • VERIFY LOCAL PROTOCOL</div>
  `;

  focusFirst();
}
function renderDifficultyBreathing() {
  hud.innerHTML = `
    <div class="header">DIFFICULTY BREATHING</div>

    <div class="info-block">
      AIRWAY • BREATHING
    </div>

    <div class="info-block">
      RESP RATE / EFFORT
    </div>

    <div class="info-block">
      SpO₂ • LUNG SOUNDS
    </div>

    <div class="info-block">
      POSITION OF COMFORT
    </div>

    <div class="info-block">
      OXYGEN / VENTILATION<br>
      AS INDICATED
    </div>

    <div class="info-block">
      REASSESS
    </div>

    <div class="menu">
      <button data-action="medical-back">BACK</button>
      <button data-action="home">HOME</button>
    </div>

    <div class="footer">DEMO • VERIFY LOCAL PROTOCOL</div>
  `;

  focusFirst();
}
function renderBleedingControl() {
  hud.innerHTML = `
    <div class="header">BLEEDING CONTROL</div>

    <div class="info-block">
      FIND SOURCE
    </div>

    <div class="info-block">
      <strong>DIRECT PRESSURE</strong>
    </div>

    <div class="info-block">
      LIFE-THREATENING?
    </div>

    <div class="info-block">
      EXTREMITY<br>
      → TOURNIQUET
    </div>

    <div class="info-block">
      NOT TOURNIQUET-ABLE<br>
      → WOUND PACKING
    </div>

    <div class="info-block">
      TREAT FOR SHOCK<br>
      REASSESS
    </div>

    <div class="menu">
      <button data-action="trauma-back">BACK</button>
      <button data-action="home">HOME</button>
    </div>

    <div class="footer">DEMO • VERIFY LOCAL PROTOCOL</div>
  `;

  focusFirst();
}
function renderTourniquet() {
  hud.innerHTML = `
    <div class="header">TOURNIQUET</div>

    <div class="result-title">
      SEVERE EXTREMITY BLEEDING
    </div>

    <div class="info-block">
      PLACE<br>
      <strong>2–3 IN ABOVE WOUND</strong>
    </div>

    <div class="info-block">
      NOT ON WOUND<br>
      NOT OVER JOINT
    </div>

    <div class="info-block">
      <strong>TIGHTEN UNTIL<br>
      BLEEDING STOPS</strong>
    </div>

    <div class="info-block">
      SECURE DEVICE
    </div>

    <div class="info-block">
      NOTE APPLICATION TIME
    </div>

    <div class="menu">
      <button data-action="trauma-back">BACK</button>
      <button data-action="home">HOME</button>
    </div>

    <div class="footer">DEMO • VERIFY LOCAL PROTOCOL</div>
  `;

  focusFirst();
}
function renderImpalement() {
  hud.innerHTML = `
    <div class="header">PUNCTURE / IMPALEMENT</div>

    <div class="info-block">
      <strong>DO NOT REMOVE</strong><br>
      EMBEDDED OBJECT
    </div>

    <div class="info-block">
      CONTROL BLEEDING<br>
      AROUND OBJECT
    </div>

    <div class="info-block">
      STABILIZE WITH<br>
      BULKY DRESSING
    </div>

    <div class="info-block">
      ASSESS DISTAL<br>
      CIRCULATION
    </div>

    <div class="info-block">
      TREAT FOR SHOCK
    </div>

    <div class="info-block">
      TRANSPORT
    </div>

    <div class="menu">
      <button data-action="trauma-back">BACK</button>
      <button data-action="home">HOME</button>
    </div>

    <div class="footer">DEMO • VERIFY LOCAL PROTOCOL</div>
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
function renderPreplansMenu() {
  hud.innerHTML = `
    <div class="header">PREPLANS</div>

    <div class="menu">
      <button data-action="demo-preplan">DEMO COMMERCIAL</button>
      <button data-action="home">HOME</button>
    </div>

    <div class="footer">PROTOTYPE</div>
  `;

  focusFirst();
}

function renderDemoPreplan() {
  hud.innerHTML = `
    <div class="header">100 INDUSTRIAL WAY</div>

    <div class="result-title">DEMO COMMERCIAL</div>

    <div class="menu">
      <button data-action="preplan-key">KEY INFO</button>
      <button data-action="preplan-fire">FIRE PROTECTION</button>
      <button data-action="preplan-utilities">UTILITIES</button>
      <button data-action="preplan-more">MORE</button>
      <button data-action="preplans-back">BACK</button>
      <button data-action="home">HOME</button>
    </div>

    <div class="footer">DEMO DATA ONLY</div>
  `;

  focusFirst();
}

function renderPreplanKey() {
  hud.innerHTML = `
    <div class="header">KEY INFO</div>

    <div class="info-block">
      <strong>OCCUPANCY</strong><br>
      COMMERCIAL / INDUSTRIAL
    </div>

    <div class="info-block">
      <strong>CONSTRUCTION</strong><br>
      TYPE II
    </div>

    <div class="info-block">
      <strong>SPRINKLER</strong><br>
      YES
    </div>

    <div class="info-block">
      <strong>FDC</strong><br>
      SIDE A
    </div>

    <div class="menu">
      <button data-action="demo-preplan-back">BACK</button>
      <button data-action="home">HOME</button>
    </div>
  `;

  focusFirst();
}

function renderPreplanFire() {
  hud.innerHTML = `
    <div class="header">FIRE PROTECTION</div>

    <div class="info-block">
      <strong>SPRINKLER SYSTEM</strong><br>
      FULL BUILDING
    </div>

    <div class="info-block">
      <strong>FDC</strong><br>
      SIDE A
    </div>

    <div class="info-block">
      <strong>FIRE ALARM PANEL</strong><br>
      MAIN ENTRANCE
    </div>

    <div class="info-block">
      <strong>HYDRANT</strong><br>
      SIDE A • STREET
    </div>

    <div class="menu">
      <button data-action="demo-preplan-back">BACK</button>
      <button data-action="home">HOME</button>
    </div>
  `;

  focusFirst();
}

function renderPreplanUtilities() {
  hud.innerHTML = `
    <div class="header">UTILITIES</div>

    <div class="info-block">
      <strong>GAS SHUTOFF</strong><br>
      SIDE C
    </div>

    <div class="info-block">
      <strong>ELECTRICAL MAIN</strong><br>
      ELECTRICAL ROOM
    </div>

    <div class="info-block">
      <strong>WATER SHUTOFF</strong><br>
      MECHANICAL ROOM
    </div>

    <div class="menu">
      <button data-action="demo-preplan-back">BACK</button>
      <button data-action="home">HOME</button>
    </div>
  `;

  focusFirst();
}

function renderPreplanAccess() {
  hud.innerHTML = `
    <div class="header">ACCESS</div>

    <div class="info-block">
      <strong>PRIMARY ENTRY</strong><br>
      SIDE A
    </div>

    <div class="info-block">
      <strong>SECONDARY ENTRY</strong><br>
      SIDE C
    </div>

    <div class="info-block">
      <strong>KNOX BOX</strong><br>
      SIDE A • MAIN ENTRANCE
    </div>

    <div class="menu">
      <button data-action="demo-preplan-back">BACK</button>
      <button data-action="home">HOME</button>
    </div>
  `;

  focusFirst();
}

function renderPreplanHazards() {
  hud.innerHTML = `
    <div class="header">HAZARDS</div>

    <div class="info-block">
      <strong>DEMO HAZARD</strong><br>
      FOR PROTOTYPE USE ONLY
    </div>

    <div class="info-block">
      VERIFY ACTUAL SITE HAZARDS
      BEFORE OPERATIONAL USE
    </div>

    <div class="menu">
      <button data-action="demo-preplan-back">BACK</button>
      <button data-action="home">HOME</button>
    </div>
  `;

  focusFirst();
}
function renderPreplanMore() {
  hud.innerHTML = `
    <div class="header">PREPLAN • MORE</div>

    <div class="menu">
      <button data-action="preplan-access">ACCESS</button>
      <button data-action="preplan-hazards">HAZARDS</button>
      <button data-action="demo-preplan-back">BACK</button>
      <button data-action="home">HOME</button>
    </div>

    <div class="footer">DEMO DATA ONLY</div>
  `;

  focusFirst();
}
function renderEmsCardiac() {
  hud.innerHTML = `
    <div class="header">EMS • CARDIAC</div>

    <div class="menu">
      <button data-action="adult-cpr">ADULT CPR</button>
      <button data-action="chest-pain">CHEST PAIN</button>
      <button data-action="ems-back">BACK</button>
      <button data-action="home">HOME</button>
    </div>

    <div class="footer">DEMO • VERIFY LOCAL PROTOCOL</div>
  `;

  focusFirst();
}

function renderEmsMedical() {
  hud.innerHTML = `
    <div class="header">EMS • MEDICAL</div>

    <div class="menu">
      <button data-action="difficulty-breathing">DIFFICULTY BREATHING</button>
      <button data-action="anaphylaxis">ANAPHYLAXIS</button>
      <button data-action="opioid">OPIOID OVERDOSE</button>
      <button data-action="ems-back">BACK</button>
      <button data-action="home">HOME</button>
    </div>

    <div class="footer">DEMO • VERIFY LOCAL PROTOCOL</div>
  `;

  focusFirst();
}

function renderEmsTrauma() {
  hud.innerHTML = `
    <div class="header">EMS • TRAUMA</div>

    <div class="menu">
      <button data-action="bleeding-control">BLEEDING CONTROL</button>
      <button data-action="tourniquet">TOURNIQUET</button>
      <button data-action="impalement">PUNCTURE / IMPALEMENT</button>
      <button data-action="ems-back">BACK</button>
      <button data-action="home">HOME</button>
    </div>

    <div class="footer">DEMO • VERIFY LOCAL PROTOCOL</div>
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
if (action === "ems-cardiac") {
  renderEmsCardiac();
  return;
}

if (action === "ems-medical") {
  renderEmsMedical();
  return;
}

if (action === "ems-trauma") {
  renderEmsTrauma();
  return;
}
  if (action === "adult-cpr") {
    renderAdultCpr();
    return;
  }
  if (action === "chest-pain") {
  renderChestPain();
  return;
}

if (action === "cardiac-back") {
  renderEmsCardiac();
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
if (action === "preplans") {
  renderPreplansMenu();
  return;
}

if (action === "demo-preplan") {
  renderDemoPreplan();
  return;
}

if (action === "preplan-key") {
  renderPreplanKey();
  return;
}

if (action === "preplan-fire") {
  renderPreplanFire();
  return;
}

if (action === "preplan-utilities") {
  renderPreplanUtilities();
  return;
}

if (action === "preplan-access") {
  renderPreplanAccess();
  return;
}

if (action === "preplan-hazards") {
  renderPreplanHazards();
  return;
}

if (action === "preplans-back") {
  renderPreplansMenu();
  return;
}

if (action === "demo-preplan-back") {
  renderDemoPreplan();
  return;
}
if (action === "preplan-more") {
  renderPreplanMore();
  return;
}
if (action === "difficulty-breathing") {
  renderDifficultyBreathing();
  return;
}

if (action === "medical-back") {
  renderEmsMedical();
  return;
}
if (action === "bleeding-control") {
  renderBleedingControl();
  return;
}

if (action === "tourniquet") {
  renderTourniquet();
  return;
}

if (action === "impalement") {
  renderImpalement();
  return;
}

if (action === "trauma-back") {
  renderEmsTrauma();
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