document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.contact-left');
  const nameInput = document.querySelector('input[name="name"]');
  const emailInput = document.querySelector('input[name="email"]');
  const messageInput = document.querySelector('textarea[name="message"]');
  const submitButton = form.querySelector('button[type="submit"]');

  // Email validation 
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // real-time validation feedback
  function createErrorMessage(input, message) {
    // Remove existing error message if any
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }

    // Makes new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#d32f2f';
    errorDiv.style.fontSize = '14px';
    errorDiv.style.marginTop = '5px';
    errorDiv.style.marginLeft = '25px';
    input.parentElement.insertBefore(errorDiv, input.nextSibling);
  }

  function removeErrorMessage(input) {
    const errorMessage = input.parentElement.querySelector('.error-message');
    if (errorMessage) {
      errorMessage.remove();
    }
  }

  function addSuccessIndicator(input) {
    input.style.borderColor = '#4caf50';
  }

  function removeSuccessIndicator(input) {
    input.style.borderColor = '';
  }

  // Validate name
  function validateName() {
    const name = nameInput.value.trim();
    
    if (name.length === 0) {
      createErrorMessage(nameInput, 'Name is required');
      removeSuccessIndicator(nameInput);
      return false;
    } else if (name.length < 2) {
      createErrorMessage(nameInput, 'Name must be at least 2 characters');
      removeSuccessIndicator(nameInput);
      return false;
    } else {
      removeErrorMessage(nameInput);
      addSuccessIndicator(nameInput);
      return true;
    }
  }

  // Validate email
  function validateEmail() {
    const email = emailInput.value.trim();
    
    if (email.length === 0) {
      createErrorMessage(emailInput, 'Email is required');
      removeSuccessIndicator(emailInput);
      return false;
    } else if (!emailRegex.test(email)) {
      createErrorMessage(emailInput, 'Please enter a valid email address');
      removeSuccessIndicator(emailInput);
      return false;
    } else {
      removeErrorMessage(emailInput);
      addSuccessIndicator(emailInput);
      return true;
    }
  }

  // Validate message
  function validateMessage() {
    const message = messageInput.value.trim();
    
    if (message.length === 0) {
      createErrorMessage(messageInput, 'Message is required');
      removeSuccessIndicator(messageInput);
      return false;
    } else if (message.length < 10) {
      createErrorMessage(messageInput, 'Message must be at least 10 characters');
      removeSuccessIndicator(messageInput);
      return false;
    } else {
      removeErrorMessage(messageInput);
      addSuccessIndicator(messageInput);
      return true;
    }
  }

  // Real-time validation on blur (when user leaves field)
  nameInput.addEventListener('blur', validateName);
  emailInput.addEventListener('blur', validateEmail);
  messageInput.addEventListener('blur', validateMessage);

  // Remove error on input
  nameInput.addEventListener('input', function() {
    if (nameInput.value.trim().length > 0) {
      removeErrorMessage(nameInput);
    }
  });

  emailInput.addEventListener('input', function() {
    if (emailInput.value.trim().length > 0) {
      removeErrorMessage(emailInput);
    }
  });

  messageInput.addEventListener('input', function() {
    if (messageInput.value.trim().length > 0) {
      removeErrorMessage(messageInput);
    }
  });

  // Character counter for message 
  function updateCharacterCount() {
    const currentLength = messageInput.value.length;
    let counter = messageInput.parentElement.querySelector('.char-counter');
    
    if (!counter) {
      counter = document.createElement('div');
      counter.className = 'char-counter';
      counter.style.fontSize = '12px';
      counter.style.color = '#666';
      counter.style.marginTop = '5px';
      counter.style.textAlign = 'right';
      messageInput.parentElement.appendChild(counter);
    }
    
    counter.textContent = `${currentLength} characters`;
  }

  messageInput.addEventListener('input', updateCharacterCount);

  // Form submission handler
  form.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission

    // Validate all fields
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();

    // If all validations pass
    if (isNameValid && isEmailValid && isMessageValid) {
      // Disable submit button to prevent double submission
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
      submitButton.style.opacity = '0.7';
      submitButton.style.cursor = 'not-allowed';

      // Get form data
      const formData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        message: messageInput.value.trim(),
        timestamp: new Date().toISOString()
      };

      // Log form data 
      console.log('Form Data:', formData);

      // Sending... message
      setTimeout(function() {
        // Store data in sessionStorage to display on thank you page
        sessionStorage.setItem('submittedName', formData.name);
        sessionStorage.setItem('submittedEmail', formData.email);

        // Redirect to thank you page
        window.location.href = 'connect-Thank-You.html';
      }, 1000);

      
    } else {
      // Scroll to first error
      const firstError = form.querySelector('.error-message');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });

  // Adds smooth animations to inputs
  const inputs = [nameInput, emailInput, messageInput];
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.style.transition = 'all 0.3s ease';
      this.style.transform = 'scale(1.02)';
    });

    input.addEventListener('blur', function() {
      this.style.transform = 'scale(1)';
    });
  });
});