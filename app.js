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

function renderMainMenu() {
  currentScreen = "main";
  selectedIndex = 0;

  hud.innerHTML = `
    <div class="header">FIRE HOUSE HUD</div>

    <div class="menu">
      <button class="menu-item selected">ERG</button>
      <button class="menu-item">EMS PROTOCOLS</button>
      <button class="menu-item">EQUIPMENT</button>
    </div>

    <div class="footer">Use ↑ ↓ and Enter</div>
  `;
}

function renderErgLookup() {
  currentScreen = "ergLookup";

  hud.innerHTML = `
    <div class="header">ERG LOOKUP</div>

    <div style="font-size: 22px; margin-bottom: 20px;">
      UN / NA NUMBER
    </div>

    <input
      id="ergInput"
      type="text"
      value="1203"
      maxlength="4"
      style="
        font-size: 44px;
        width: 100%;
        padding: 18px;
        background: #111;
        color: white;
        border: 2px solid white;
        border-radius: 12px;
        margin-bottom: 25px;
      "
    />

    <button class="menu-item selected" id="searchButton">
      SEARCH
    </button>

    <div class="footer">Enter to search • Esc to go back</div>
  `;

  document.querySelector("#ergInput").focus();
}

function renderErgResult(number) {
  const result = ergData[number];

  if (!result) {
    hud.innerHTML = `
      <div class="header">ERG RESULT</div>

      <div style="font-size: 30px; margin-top: 50px;">
        NO RECORD FOUND
      </div>

      <div style="font-size: 22px; margin-top: 20px;">
        UN / NA ${number}
      </div>

      <div class="footer">Esc to go back</div>
    `;

    currentScreen = "ergResult";
    return;
  }

  currentScreen = "ergResult";

  hud.innerHTML = `
    <div class="header">ERG RESULT</div>

    <div style="font-size: 46px; font-weight: bold;">
      ${result.name}
    </div>

    <div style="font-size: 28px; margin-top: 18px;">
      UN ${number}
    </div>

    <div style="font-size: 26px; margin-top: 18px;">
      GUIDE ${result.guide}
    </div>

    <div style="font-size: 24px; margin-top: 35px;">
      ${result.hazard}
    </div>

    <div class="footer">Esc to go back</div>
  `;
}

function updateSelection() {
  const items = document.querySelectorAll(".menu-item");

  items.forEach((item, index) => {
    item.classList.toggle("selected", index === selectedIndex);
  });
}

document.addEventListener("keydown", (event) => {
  if (currentScreen === "main") {
    const items = document.querySelectorAll(".menu-item");

    if (event.key === "ArrowDown") {
      selectedIndex = (selectedIndex + 1) % items.length;
      updateSelection();
    }

    if (event.key === "ArrowUp") {
      selectedIndex =
        (selectedIndex - 1 + items.length) % items.length;
      updateSelection();
    }

    if (event.key === "Enter") {
      const selected = items[selectedIndex].textContent.trim();

      if (selected === "ERG") {
        renderErgLookup();
      }
    }
  }

  else if (currentScreen === "ergLookup") {
    if (event.key === "Enter") {
      const number = document
        .querySelector("#ergInput")
        .value
        .trim();

      renderErgResult(number);
    }

    if (event.key === "Escape") {
      renderMainMenu();
    }
  }

  else if (currentScreen === "ergResult") {
    if (event.key === "Escape") {
      renderErgLookup();
    }
  }
});

renderMainMenu();