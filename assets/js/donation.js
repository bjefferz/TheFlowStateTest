// Frequency Button Handling
const monthlyButton = document.getElementById("donation-frequency-monthly");
const yearlyButton = document.getElementById("donation-frequency-yearly");
const oneTimeButton = document.getElementById("donation-frequency-onetime");

const monthlyOptions = document.getElementById("monthly-options");
const yearlyOptions = document.getElementById("yearly-options");
const oneTimeOptions = document.getElementById("one-time-options");

let selectedFrequency = null;
let selectedAmount = null;

function hideAllOptions() {
  monthlyOptions.style.display = "none";
  yearlyOptions.style.display = "none";
  oneTimeOptions.style.display = "none";
}

function removeActiveClasses() {
  document
    .querySelectorAll(".donation-frequency-button")
    .forEach((btn) => btn.classList.remove("active"));
}

function showSection(button, section) {
  hideAllOptions();
  removeActiveClasses();

  document
    .querySelectorAll(".donation-option-button")
    .forEach((btn) => btn.classList.remove("active"));

  selectedAmount = null;

  section.style.display = "block";
  button.classList.add("active");

  selectedFrequency = button.textContent.trim();
  console.log("Selected frequency:", selectedFrequency);
}

monthlyButton.addEventListener("click", () =>
  showSection(monthlyButton, monthlyOptions)
);
yearlyButton.addEventListener("click", () =>
  showSection(yearlyButton, yearlyOptions)
);
oneTimeButton.addEventListener("click", () =>
  showSection(oneTimeButton, oneTimeOptions)
);

window.addEventListener("DOMContentLoaded", () => {
  showSection(monthlyButton, monthlyOptions);
});

// Donation Amount Selection
document.querySelectorAll(".donation-option-button").forEach((button) => {
  button.addEventListener("click", () => {
    const parentGrid = button.closest(".donation-grid");
    parentGrid
      .querySelectorAll(".donation-option-button")
      .forEach((btn) => btn.classList.remove("active"));

    button.classList.add("active");

    selectedAmount = button.textContent.replace("$", "").trim();
    console.log("Selected amount:", selectedAmount);
  });
});

/* Handle "Custom Amount" button clicks
DOM Replacement:
- custom amount button is swapped with a text box
- if a user leaves it empty or a preset is selected, the button reappears
- each "recreation" of the button, it reattaches the event handler so it keeps working.
*/
function attachCustomHandler(button) {
  button.addEventListener("click", () => {
    const parentGrid = button.closest(".donation-grid");

    parentGrid
      .querySelectorAll(".donation-option-button")
      .forEach((btn) => btn.classList.remove("active"));

    const wrapper = document.createElement("div");
    wrapper.classList.add("custom-amount-wrapper", "active");

    const dollar = document.createElement("span");
    dollar.classList.add("custom-amount-symbol");
    dollar.textContent = "$";

    const input = document.createElement("input");
    input.type = "number";
    input.placeholder = "Enter amount";
    input.min = "1";
    input.classList.add("custom-amount-input");

    wrapper.appendChild(dollar);
    wrapper.appendChild(input);

    button.replaceWith(wrapper);
    input.focus();

    input.addEventListener("input", () => {
      selectedAmount = input.value;
      console.log("Selected custom amount:", selectedAmount);
    });

    input.addEventListener("blur", () => {
      if (input.value.trim() === "") {
        wrapper.classList.remove("active");
        selectedAmount = null;

        const newButton = document.createElement("button");
        newButton.className = "donation-option-button custom-amount";
        newButton.textContent = "Custom Amount";
        wrapper.replaceWith(newButton);

        attachCustomHandler(newButton);
      }
    });

    parentGrid
      .querySelectorAll(".donation-option-button:not(.custom-amount)")
      .forEach((preset) => {
        preset.addEventListener("click", () => {
          if (wrapper.isConnected) {
            const newButton = document.createElement("button");
            newButton.className = "donation-option-button custom-amount";
            newButton.textContent = "Custom Amount";
            wrapper.replaceWith(newButton);

            attachCustomHandler(newButton);
          }
        });
      });
  });
}

document
  .querySelectorAll(".custom-amount")
  .forEach((btn) => attachCustomHandler(btn));

// Donate Button Handling
const donateButton = document.getElementById("donate-button");
const billing = document.getElementById("billing");
const closeBilling = document.getElementById("close-billing");
const billingForm = document.getElementById("billing-form");

donateButton.addEventListener("click", () => {
  if (!selectedFrequency || !selectedAmount) {
    alert("Please select a frequency and amount before donating.");
    return;
  }
  billing.style.display = "flex";
});

closeBilling.addEventListener("click", () => {
  billing.style.display = "none";
});

billingForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("billing-name").value.trim();
  const address = document.getElementById("billing-address").value.trim();
  const card = document.getElementById("billing-card").value.trim();
  const cvv = document.getElementById("billing-cvv").value.trim();
  const exp = document.getElementById("billing-exp").value.trim();

  // Name validation
  for (let i = 0; i < name.length; i++) {
    if (!isNaN(name[i]) && name[i] !== " ") {
      alert("Name cannot contain numbers.");
      return;
    }
  }

  // Card validation
  for (let i = 0; i < card.length; i++) {
    let char = card[i].toLowerCase();
    if (char >= "a" && char <= "z") {
      alert("Card number cannot contain letters.");
      return;
    }
  }
  if (card.length > 16) {
    alert("Card number must be at most 16 digits.");
    return;
  }

  // CVV validation
  for (let i = 0; i < cvv.length; i++) {
    let char = cvv[i].toLowerCase();
    if (char >= "a" && char <= "z") {
      alert("CVV cannot contain letters.");
      return;
    }
  }
  if (cvv.length > 4) {
    alert("CVV must be at most 4 digits.");
    return;
  }

  // Expiration validation
  for (let i = 0; i < exp.length; i++) {
    let char = exp[i].toLowerCase();
    if (char >= "a" && char <= "z") {
      alert("Expiration date cannot contain letters.");
      return;
    }
  }
  if (exp.length > 4) {
    alert("Expiration date must be at most 4 digits (MMYY).");
    return;
  }

  // Redirect to thank you page
  billing.style.display = "none";
  window.location.href = `donation-thankyou.html?frequency=${encodeURIComponent(
    selectedFrequency
  )}&amount=${encodeURIComponent(selectedAmount)}`;
});
