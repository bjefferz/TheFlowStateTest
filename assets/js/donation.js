const monthlyButton = document.getElementById('donation-frequency-monthly');
const yearlyButton = document.getElementById('donation-frequency-yearly');
const oneTimeButton = document.getElementById('donation-frequency-onetime');

const monthlyOptions = document.getElementById('monthly-options');
const yearlyOptions = document.getElementById('yearly-options');
const oneTimeOptions = document.getElementById('one-time-options');

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
  section.style.display = 'block';
  button.classList.add('active');
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

// initialize page with the Monthly highlighted and shown
window.addEventListener('DOMContentLoaded', () => {
  showSection(monthlyButton, monthlyOptions);
});
