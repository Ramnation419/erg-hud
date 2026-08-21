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
  const first = document.querySelector("button, input");
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
  hud.innerHTML = `
    <div class="header">ERG LOOKUP</div>

    <label for="ergInput">UN / NA NUMBER</label>

    <input
      id="ergInput"
      type="text"
      inputmode="numeric"
      maxlength="4"
      value="${activeErgNumber}"
    />

    <div class="menu">
      <button data-action="search">SEARCH</button>
      <button data-action="home">HOME</button>
    </div>
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

  if (action === "erg") {
    renderErgLookup();
  }

  if (action === "search") {
    const input = document.querySelector("#ergInput");
    renderErgResult(input.value.trim());
  }

  if (action === "details") {
    renderErgDetails();
  }

  if (action === "back-lookup") {
    renderErgLookup();
  }

  if (action === "back-result") {
    renderErgResult(activeErgNumber);
  }

  if (action === "home") {
    renderMainMenu();
  }
});

document.addEventListener("keydown", (event) => {
  const focusable = [
    ...document.querySelectorAll("button, input")
  ];

  if (!focusable.length) return;

  const currentIndex = focusable.indexOf(document.activeElement);

  if (event.key === "ArrowDown" || event.key === "ArrowRight") {
    event.preventDefault();

    const next =
      currentIndex < 0
        ? 0
        : (currentIndex + 1) % focusable.length;

    focusable[next].focus();
  }

  if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
    event.preventDefault();

    const previous =
      currentIndex <= 0
        ? focusable.length - 1
        : currentIndex - 1;

    focusable[previous].focus();
  }

  if (event.key === "Enter") {
    if (document.activeElement.tagName === "BUTTON") {
      event.preventDefault();
      document.activeElement.click();
    }
  }
});

renderMainMenu();