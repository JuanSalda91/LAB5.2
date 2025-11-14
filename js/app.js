// ## ----- RegistrationForm ----- ## //

// ----- Elements from the DOM ----- //
// --- Selecting the form --- //
const registrationForm = document.getElementById('registrationForm');
// --- Selecting the input fields --- //
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
// --- Selecting the errors --- //
const usernameError = document.getElementById('usernameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');


// ----- Load username ----- //
const savedUsername = localStorage.getItem('username');
if (savedUsername !== null) {
    usernameInput.value = savedUsername;
}; // - To test in the browser console / localStorage.setItem('username', 'tester') - /
// console.log(localStorage.setItem('username', 'tester'))

// --- Adding constrains --- //
usernameInput.required = true;
usernameInput.minLength = 3;

passwordInput.required = true;
passwordInput.minLength = 8;

confirmPasswordInput.required = true;

// --- username validation function --- //
function validateUserName() {
    let message = '';

    if (usernameInput.validity.valueMissing) {
        message = 'Username is required.';
    } else if (usernameInput.validity.tooShort) {
        message = `Username must be at least ${usernameInput.minLength} characters.`;
    }

    usernameError.textContent = message;
    return message === '';
};

// --- email validation function--- //
function validateEmail() {
    let message = '';

    if (emailInput.validity.valueMissing) {
        message = 'Email is required.';
    } else if (emailInput.validity.typeMismatch) {
        message = 'Please enter valid email address.';
    }

    emailError.textContent = message;
    return message === '';
};

// --- password validation function --- //
function validatePassword() {
    let message = '';

    if (passwordInput.validity.valueMissing) {
        message = 'Password is required.'
    } else if (passwordInput.validity.tooShort) {
        message = `Password must be at least ${passwordInput.minLength} characters.`
    } else {
        const value = passwordInput.value;
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumber = /[0-9]/.test(value);

        if (!hasUpperCase) {
            message = 'Password must include at least one uppercase letter.'
        } else if (!hasLowerCase) {
            message = 'Password must include at least one lowercase letter.'
        } else if (!hasNumber) {
            message = 'Password must include at least one number.'
        }
    }

    // --- integrate constrains for password --- //
    passwordInput.setCustomValidity(message);
    passwordError.textContent = message;
    return message === '';
};

// --- Confirm password validation function--- //
function validatePasswordConfirmation() {
    let message = '';
    
    if (confirmPasswordInput.validity.valueMissing) {
        message = 'Please confirm your password.'
    } else if (confirmPasswordInput.value !== passwordInput.value) {
        message = 'Password do not match.'
    }

    // --- constrains --- //
    confirmPasswordInput.setCustomValidity(message);
    confirmPasswordError.textContent = message;
    return message === '';
};

// ----- Real time validation ----- //
usernameInput.addEventListener('input', () => {
    validateUserName();
});

emailInput.addEventListener('input', () => {
    validateEmail();
});

passwordInput.addEventListener('input', () => {
    validatePassword();
});

confirmPasswordInput.addEventListener('input', () => {
    validatePasswordConfirmation();
});