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

let currentScreen = "main";
let selectedIndex = 0;
let activeErgNumber = null;

function renderMainMenu() {
  currentScreen = "main";
  selectedIndex = 0;

  hud.innerHTML = `
    <div class="header">FIRE LENS</div>

    <div class="menu">
      <button class="menu-item selected">ERG</button>
      <button class="menu-item">EMS</button>
      <button class="menu-item">EQUIPMENT</button>
      <button class="menu-item">PREPLANS</button>
    </div>

    <div class="footer">Select with band</div>
  `;
}

function renderErgLookup() {
  currentScreen = "ergLookup";
  selectedIndex = 0;

  hud.innerHTML = `
    <div class="header">ERG LOOKUP</div>

    <div style="font-size:22px; margin-bottom:18px;">
      UN / NA NUMBER
    </div>

    <input
      id="ergInput"
      type="text"
      value="${activeErgNumber || "1203"}"
      maxlength="4"
      inputmode="numeric"
      style="
        font-size:44px;
        width:100%;
        padding:18px;
        background:#111;
        color:white;
        border:2px solid white;
        border-radius:12px;
        margin-bottom:22px;
      "
    />

    <div class="menu">
      <button class="menu-item selected">SEARCH</button>
      <button class="menu-item">HOME</button>
    </div>

    <div class="footer">FIRE LENS</div>
  `;

  document.querySelector("#ergInput").focus();
}

function renderErgResult(number) {
  activeErgNumber = number;
  currentScreen = "ergResult";
  selectedIndex = 0;

  const result = ergData[number];

  if (!result) {
    hud.innerHTML = `
      <div class="header">ERG RESULT</div>

      <div style="font-size:34px; font-weight:bold; margin-top:30px;">
        NO RECORD FOUND
      </div>

      <div style="font-size:24px; margin-top:20px;">
        UN / NA ${number}
      </div>

      <div class="menu" style="margin-top:50px;">
        <button class="menu-item selected">BACK</button>
        <button class="menu-item">HOME</button>
      </div>

      <div class="footer">FIRE LENS</div>
    `;

    return;
  }

  hud.innerHTML = `
    <div class="header">ERG RESULT</div>

    <div style="font-size:44px; font-weight:bold;">
      ${result.name}
    </div>

    <div style="font-size:28px; margin-top:12px;">
      UN ${number}
    </div>

    <div style="font-size:28px; margin-top:12px;">
      GUIDE ${result.guide}
    </div>

    <div style="font-size:24px; margin-top:24px;">
      ${result.hazard}
    </div>

    <div class="menu" style="margin-top:28px;">
      <button class="menu-item selected">DETAILS</button>
      <button class="menu-item">BACK</button>
      <button class="menu-item">HOME</button>
    </div>

    <div class="footer">FIRE LENS</div>
  `;
}

function renderErgDetails() {
  const result = ergData[activeErgNumber];

  if (!result) {
    renderErgLookup();
    return;
  }

  currentScreen = "ergDetails";
  selectedIndex = 0;

  hud.innerHTML = `
    <div class="header">GUIDE ${result.guide}</div>

    <div style="font-size:30px; font-weight:bold;">
      ${result.name}
    </div>

    <div style="font-size:21px; margin-top:24px;">
      <strong>ISOLATION</strong><br>
      ${result.isolation}
    </div>

    <div style="font-size:21px; margin-top:22px;">
      <strong>RESPONSE</strong><br>
      ${result.response}
    </div>

    <div class="menu" style="margin-top:28px;">
      <button class="menu-item selected">BACK</button>
      <button class="menu-item">HOME</button>
    </div>

    <div class="footer">FIRE LENS</div>
  `;
}

function updateSelection() {
  const items = document.querySelectorAll(".menu-item");

  items.forEach((item, index) => {
    item.classList.toggle("selected", index === selectedIndex);
  });
}

function moveSelection(direction) {
  const items = document.querySelectorAll(".menu-item");

  if (!items.length) return;

  selectedIndex =
    (selectedIndex + direction + items.length) % items.length;

  updateSelection();
}

function activateSelection() {
  const items = document.querySelectorAll(".menu-item");

  if (!items.length) return;

  const selected = items[selectedIndex].textContent.trim();

  if (currentScreen === "main") {
    if (selected === "ERG") renderErgLookup();
    return;
  }

  if (currentScreen === "ergLookup") {
    if (selected === "SEARCH") {
      const number = document
        .querySelector("#ergInput")
        .value
        .trim();

      renderErgResult(number);
    }

    if (selected === "HOME") {
      renderMainMenu();
    }

    return;
  }

  if (currentScreen === "ergResult") {
    if (selected === "DETAILS") {
      renderErgDetails();
    }

    if (selected === "BACK") {
      renderErgLookup();
    }

    if (selected === "HOME") {
      renderMainMenu();
    }

    return;
  }

  if (currentScreen === "ergDetails") {
    if (selected === "BACK") {
      renderErgResult(activeErgNumber);
    }

    if (selected === "HOME") {
      renderMainMenu();
    }
  }
}

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown") {
    event.preventDefault();
    moveSelection(1);
  }

  if (event.key === "ArrowUp") {
    event.preventDefault();
    moveSelection(-1);
  }

  if (event.key === "Enter") {
    event.preventDefault();
    activateSelection();
  }

  if (event.key === "Escape") {
    event.preventDefault();

    if (currentScreen === "ergLookup") {
      renderMainMenu();
    }

    else if (currentScreen === "ergResult") {
      renderErgLookup();
    }

    else if (currentScreen === "ergDetails") {
      renderErgResult(activeErgNumber);
    }
  }
});

renderMainMenu();