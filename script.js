// ===========================
// Elements
// ===========================

const passwordBox = document.getElementById("password");

const copyBtn = document.getElementById("copyBtn");

const generateBtn = document.getElementById("generateBtn");

const lengthSlider = document.getElementById("length");

const lengthValue = document.getElementById("lengthValue");

const uppercase = document.getElementById("uppercase");

const lowercase = document.getElementById("lowercase");

const numbers = document.getElementById("numbers");

const symbols = document.getElementById("symbols");

const similar = document.getElementById("similar");

const strengthFill = document.getElementById("strengthFill");

const strengthLabel = document.getElementById("strengthLabel");

// ===========================
// Character Sets
// ===========================

const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const lowerChars = "abcdefghijklmnopqrstuvwxyz";

const numberChars = "0123456789";

const symbolChars = "!@#$%^&*()_+{}[]<>?/|~";

const similarChars = "O0Il1";

// ===========================
// Slider
// ===========================

lengthSlider.addEventListener("input", () => {

    lengthValue.textContent = lengthSlider.value;

});

// ===========================
// Generate Password
// ===========================

function generatePassword() {

    let characters = "";

    let password = "";

    if (uppercase.checked)
        characters += upperChars;

    if (lowercase.checked)
        characters += lowerChars;

    if (numbers.checked)
        characters += numberChars;

    if (symbols.checked)
        characters += symbolChars;

    if (similar.checked) {

        characters = characters
            .split("")
            .filter(char => !similarChars.includes(char))
            .join("");

    }

    if (characters.length === 0) {

        alert("Please select at least one character type.");

        return;

    }

    const length = Number(lengthSlider.value);

    for (let i = 0; i < length; i++) {

        const randomIndex = Math.floor(
            Math.random() * characters.length
        );

        password += characters[randomIndex];

    }

    passwordBox.value = password;

    updateStrength(password);

}
// ===========================
// Password Strength
// ===========================

function updateStrength(password) {

    let score = 0;

    if (password.length >= 8)
        score++;

    if (password.length >= 12)
        score++;

    if (/[A-Z]/.test(password))
        score++;

    if (/[a-z]/.test(password))
        score++;

    if (/[0-9]/.test(password))
        score++;

    if (/[^A-Za-z0-9]/.test(password))
        score++;

    if (score <= 2) {

        strengthFill.style.width = "25%";
        strengthFill.style.background = "#ef4444";
        strengthLabel.textContent = "Weak";

    }
    else if (score <= 4) {

        strengthFill.style.width = "55%";
        strengthFill.style.background = "#f59e0b";
        strengthLabel.textContent = "Medium";

    }
    else if (score <= 5) {

        strengthFill.style.width = "80%";
        strengthFill.style.background = "#22c55e";
        strengthLabel.textContent = "Strong";

    }
    else {

        strengthFill.style.width = "100%";
        strengthFill.style.background = "#15803d";
        strengthLabel.textContent = "Very Strong";

    }

}

// ===========================
// Copy Password
// ===========================

copyBtn.addEventListener("click", () => {

    if (passwordBox.value === "") {

        alert("Generate a password first.");

        return;

    }

    navigator.clipboard.writeText(passwordBox.value);

    copyBtn.textContent = "✅ Copied!";

    setTimeout(() => {

        copyBtn.textContent = "📋 Copy";

    }, 2000);

});

// ===========================
// Generate Button
// ===========================

generateBtn.addEventListener("click", generatePassword);

// ===========================
// Auto Generate on Load
// ===========================

window.onload = generatePassword;

// ===========================
// Press Enter to Generate
// ===========================

document.addEventListener("keydown", function(event){

    if(event.key === "Enter"){

        generatePassword();

    }

});

// ===========================
// Auto Generate on Option Change
// ===========================

lengthSlider.addEventListener("input", generatePassword);

uppercase.addEventListener("change", generatePassword);

lowercase.addEventListener("change", generatePassword);

numbers.addEventListener("change", generatePassword);

symbols.addEventListener("change", generatePassword);

similar.addEventListener("change", generatePassword);