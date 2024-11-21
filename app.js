// Function to generate the password-protected link
function generateProtectedPage() {
    const url = document.getElementById("url").value;
    const password = document.getElementById("password").value;

    if (!url || !password) {
        alert("Please enter both URL and password.");
        return;
    }

    // Encrypt the URL
    const encrypted = CryptoJS.AES.encrypt(url, password).toString();

    // Generate a link with embedded encrypted data
    const generatedLink = `${window.location.origin}${window.location.pathname}?data=${encodeURIComponent(encrypted)}`;

    // Show the generated link
    document.getElementById("generated-link").classList.remove("hidden");
    document.getElementById("link").innerHTML = `<a href="${generatedLink}" target="_blank">${generatedLink}</a>`;
}

// Function to access the encrypted link
function accessLink() {
    const urlParams = new URLSearchParams(window.location.search);
    const encryptedData = urlParams.get("data");
    const password = document.getElementById("decrypt-password").value;

    if (!encryptedData || !password) {
        alert("Invalid data or password.");
        return;
    }

    try {
        // Decrypt the encrypted URL
        const bytes = CryptoJS.AES.decrypt(encryptedData, password);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);

        if (!decrypted) {
            throw new Error("Decryption failed");
        }

        // Redirect to the decrypted URL
        window.location.href = decrypted;
    } catch (error) {
        alert("Decryption failed. Please check your password.");
    }
}

// Automatically detect and handle the encrypted data on page load
(function handleEncryptedLink() {
    const urlParams = new URLSearchParams(window.location.search);
    const encryptedData = urlParams.get("data");

    if (encryptedData) {
        document.getElementById("encrypt-section").classList.add("hidden");
        document.getElementById("generated-link").classList.add("hidden");
        document.getElementById("decrypt-section").classList.remove("hidden");
    }
})();
