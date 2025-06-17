function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
  return password.length >= 6;
}

function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = message;
  errorElement.style.display = 'block';
}

function clearError(elementId) {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = '';
  errorElement.style.display = 'none';
}

function showMessage(elementId, message, isError = false) {
  const messageElement = document.getElementById(elementId);
  messageElement.textContent = message;
  messageElement.style.display = 'block';
  
  if (isError) {
    messageElement.style.color = '#e74c3c';
  } else {
    messageElement.style.color = '#2ecc71';
  }
  
  // Auto-hide message after 5 seconds
  setTimeout(() => {
    messageElement.style.display = 'none';
  }, 5000);
}

// Login form handling
document.getElementById('login-btn').addEventListener('click', function() {
    window.location.href = 'login.html'; // Redirect to login.html
});
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    let isValid = true;
    
    // Clear previous errors
    clearError('email-error');
    clearError('password-error');
    clearError('error-message');
    
    // Validate email
    if (!email) {
      showError('email-error', 'Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      showError('email-error', 'Please enter a valid email address');
      isValid = false;
    }
    
    // Validate password
    if (!password) {
      showError('password-error', 'Password is required');
      isValid = false;
    }
    
    if (isValid) {
      // Simulate login API call
      setTimeout(() => {
        // For demo purposes, we'll just redirect to the home page
        // In a real application, you would validate credentials with your backend
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        window.location.href = 'index.html';
      }, 1000);
    }
  });
}

// Signup form handling
const signupForm = document.getElementById('signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    let isValid = true;
    
    // Clear previous errors
    clearError('name-error');
    clearError('email-error');
    clearError('password-error');
    clearError('confirm-password-error');
    clearError('error-message');
    
    // Validate name
    if (!name) {
      showError('name-error', 'Name is required');
      isValid = false;
    }
    
    // Validate email
    if (!email) {
      showError('email-error', 'Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      showError('email-error', 'Please enter a valid email address');
      isValid = false;
    }
    
    // Validate password
    if (!password) {
      showError('password-error', 'Password is required');
      isValid = false;
    } else if (!validatePassword(password)) {
      showError('password-error', 'Password must be at least 6 characters');
      isValid = false;
    }
    
    // Validate confirm password
    if (!confirmPassword) {
      showError('confirm-password-error', 'Please confirm your password');
      isValid = false;
    } else if (password !== confirmPassword) {
      showError('confirm-password-error', 'Passwords do not match');
      isValid = false;
    }
    
    if (isValid) {
      // Simulate signup API call
      setTimeout(() => {
        // For demo purposes, we'll just redirect to the home page
        // In a real application, you would register the user with your backend
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', name);
        localStorage.setItem('userEmail', email);
        window.location.href = 'index.html';
      }, 1000);
    }
  });
}

// Reset password handling
const emailForm = document.getElementById('email-form');
const codeForm = document.getElementById('code-form');
const passwordForm = document.getElementById('password-form');
const resendBtn = document.getElementById('resend-btn');

// Step 1: Email submission
if (emailForm) {
  emailForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    let isValid = true;
    
    // Clear previous errors
    clearError('email-error');
    clearError('error-message');
    
    // Validate email
    if (!email) {
      showError('email-error', 'Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      showError('email-error', 'Please enter a valid email address');
      isValid = false;
    }
    
    if (isValid) {
      // Simulate API call to send reset code
      setTimeout(() => {
        // Store email for later steps
        localStorage.setItem('resetEmail', email);
        
        // Show success message
        showMessage('success-message', 'A verification code has been sent to your email');
        
        // Move to step 2
        setTimeout(() => {
          emailForm.style.display = 'none';
          codeForm.style.display = 'block';
        }, 2000);
      }, 1000);
    }
  });
}

// Step 2: Code verification
if (codeForm) {
  codeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const code = document.getElementById('code').value;
    let isValid = true;
    
    // Clear previous errors
    clearError('code-error');
    clearError('error-message');
    
    // Validate code
    if (!code) {
      showError('code-error', 'Verification code is required');
      isValid = false;
    }
    
    if (isValid) {
      // Simulate API call to verify code
      setTimeout(() => {
        // Show success message
        showMessage('success-message', 'Code verified successfully');
        
        // Move to step 3
        setTimeout(() => {
          codeForm.style.display = 'none';
          passwordForm.style.display = 'block';
        }, 2000);
      }, 1000);
    }
  });
}

// Resend code button
if (resendBtn) {
  resendBtn.addEventListener('click', function() {
    // Simulate API call to resend code
    showMessage('success-message', 'A new verification code has been sent to your email');
  });
}

// Step 3: New password submission
if (passwordForm) {
  passwordForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    let isValid = true;
    
    // Clear previous errors
    clearError('new-password-error');
    clearError('confirm-password-error');
    clearError('error-message');
    
    // Validate new password
    if (!newPassword) {
      showError('new-password-error', 'New password is required');
      isValid = false;
    } else if (!validatePassword(newPassword)) {
      showError('new-password-error', 'Password must be at least 6 characters');
      isValid = false;
    }
    
    // Validate confirm password
    if (!confirmPassword) {
      showError('confirm-password-error', 'Please confirm your password');
      isValid = false;
    } else if (newPassword !== confirmPassword) {
      showError('confirm-password-error', 'Passwords do not match');
      isValid = false;
    }
    
    if (isValid) {
      // Simulate API call to update password
      setTimeout(() => {
        // Show success message
        showMessage('success-message', 'Password has been reset successfully');
        
        // Redirect to login page
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 2000);
      }, 1000);
    }
  });
}
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    let isValid = true;

    // ... [Existing validation code]

    if (isValid) {
        // Simulate login API call
        setTimeout(() => {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            
            // Redirect to the landing page after a successful login
            window.location.href = 'pro1.html'; 
        }, 1000);
    }
});