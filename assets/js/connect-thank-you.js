
document.addEventListener('DOMContentLoaded', function() {
  // Get submitted data from sessionStorage
  const submittedName = sessionStorage.getItem('submittedName');
  const submittedEmail = sessionStorage.getItem('submittedEmail');

  // Personalize the thank you message if name is available
  if (submittedName) {
    const thankYouTitle = document.querySelector('.thankyou-content h1');
    const thankYouMessage = document.querySelector('.thankyou-message');
    
    // Update title with personalized greeting
    if (thankYouTitle) {
      thankYouTitle.textContent = `Thank You, ${submittedName}!`;
    }
    
    // Add personalized message
    if (thankYouMessage) {
      thankYouMessage.innerHTML = `
        We've received your message and appreciate you reaching out to The Flow State. 
        <br><br>
        A confirmation has been sent to <strong>${submittedEmail}</strong>.
        <br><br>
        Our team will get back to you as soon as possible.
      `;
    }

    // Clear the session storage after displaying
    sessionStorage.removeItem('submittedName');
    sessionStorage.removeItem('submittedEmail');
  }

  // confetti effect
  function createConfetti() {
    const colors = ['#4c95c0', '#6baed6', '#2d6e93', '#c6dbef'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'fixed';
      confetti.style.width = '10px';
      confetti.style.height = '10px';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.top = '-10px';
      confetti.style.opacity = Math.random();
      confetti.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
      confetti.style.pointerEvents = 'none';
      confetti.style.zIndex = '9999';
      confetti.style.borderRadius = '50%';
      
      document.body.appendChild(confetti);

      //  confetti falling
      const duration = Math.random() * 3 + 2;
      const animation = confetti.animate([
        { 
          transform: `translateY(0) rotate(0deg)`,
          opacity: 1
        },
        { 
          transform: `translateY(${window.innerHeight + 10}px) rotate(${Math.random() * 720}deg)`,
          opacity: 0
        }
      ], {
        duration: duration * 1000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      });

      animation.onfinish = () => confetti.remove();
    }
  }

  // Trigger confetti on page load
  setTimeout(createConfetti, 300);

  // Add button click tracking
  const buttons = document.querySelectorAll('.thankyou-btn');
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const buttonType = this.classList.contains('primary') ? 'Return Home' : 'Explore Resources';
      console.log(`User clicked: ${buttonType}`);
      

    });
  });

  //  hover effect enhancement for buttons
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s ease';
    });
  });

  // Redirect if user came directly to thank you page (without submitting form)
  if (!submittedName && !sessionStorage.getItem('allowDirectAccess')) {
    console.log('No form submission detected. User may have accessed page directly.');
    
    // Show a different message for direct access
    const thankYouMessage = document.querySelector('.thankyou-message');
    if (thankYouMessage && !thankYouMessage.textContent.includes('confirmation')) {
      // Page was accessed directly, message stays generic
    }
  }

  // Prevent back button after form submission
  window.history.pushState(null, '', window.location.href);
  window.onpopstate = function() {
    window.history.pushState(null, '', window.location.href);
  };
});