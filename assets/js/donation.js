// Frequency Button Handling
const monthlyButton = document.getElementById('donation-frequency-monthly');
const yearlyButton = document.getElementById('donation-frequency-yearly');
const oneTimeButton = document.getElementById('donation-frequency-onetime');

const monthlyOptions = document.getElementById('monthly-options');
const yearlyOptions = document.getElementById('yearly-options');
const oneTimeOptions = document.getElementById('one-time-options');

let selectedFrequency = null;
let selectedAmount = null;

function hideAllOptions() {
  monthlyOptions.style.display = 'none';
  yearlyOptions.style.display = 'none';
  oneTimeOptions.style.display = 'none';
}

function removeActiveClasses() {
  document
    .querySelectorAll('.donation-frequency-button')
    .forEach(btn => btn.classList.remove('active'));
}

function showSection(button, section) {
  hideAllOptions();
  removeActiveClasses();

  document
    .querySelectorAll('.donation-option-button')
    .forEach(btn => btn.classList.remove('active'));

  selectedAmount = null;

  section.style.display = 'block';
  button.classList.add('active');

  selectedFrequency = button.textContent.trim();
  console.log("Selected frequency:", selectedFrequency);
}

monthlyButton.addEventListener('click', () =>
  showSection(monthlyButton, monthlyOptions)
);
yearlyButton.addEventListener('click', () =>
  showSection(yearlyButton, yearlyOptions)
);
oneTimeButton.addEventListener('click', () =>
  showSection(oneTimeButton, oneTimeOptions)
);

window.addEventListener('DOMContentLoaded', () => {
  showSection(monthlyButton, monthlyOptions);
});


// Donation Amount Selection
document.querySelectorAll('.donation-option-button').forEach(button => {
  button.addEventListener('click', () => {
    const parentGrid = button.closest('.donation-grid');
    parentGrid.querySelectorAll('.donation-option-button')
      .forEach(btn => btn.classList.remove('active'));

    button.classList.add('active');

    selectedAmount = button.textContent.replace('$', '').trim();
    console.log("Selected amount:", selectedAmount);
  });
});


// Custom Amount Handling
document.querySelectorAll('.custom-amount').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.donation-option-button')
      .forEach(btn => btn.classList.remove('active'));

    const wrapper = document.createElement('div');
    wrapper.classList.add('custom-amount-wrapper', 'active');

    const dollar = document.createElement('span');
    dollar.classList.add('custom-amount-symbol');
    dollar.textContent = '$';

    const input = document.createElement('input');
    input.type = 'number';
    input.placeholder = 'Enter amount';
    input.min = '1';
    input.classList.add('custom-amount-input');

    wrapper.appendChild(dollar);
    wrapper.appendChild(input);

    button.replaceWith(wrapper);
    input.focus();

    input.addEventListener('input', () => {
      selectedAmount = input.value;
      console.log("Selected custom amount:", selectedAmount);
    });

    input.addEventListener('blur', () => {
      if (input.value.trim() === '') {
        wrapper.classList.remove('active');
        selectedAmount = null;

        const newButton = document.createElement('button');
        newButton.className = 'donation-option-button custom-amount';
        newButton.textContent = 'Custom Amount';
        wrapper.replaceWith(newButton);

        newButton.addEventListener('click', () => {
          newButton.replaceWith(wrapper);
          input.focus();
        });
      }
    });
  });
});

// Donate Button Handling
const donateButton = document.getElementById('donate-button');

donateButton.addEventListener('click', () => {
  if (!selectedFrequency || !selectedAmount) {
    alert("Please select a frequency and amount before donating.");
    return;
  }

  // log values
  console.log("Donation submitted:");
  console.log("Frequency:", selectedFrequency);
  console.log("Amount:", selectedAmount);

  // Later:
  alert(`Thank you for your ${selectedFrequency} donation of $${selectedAmount}!`);
});
