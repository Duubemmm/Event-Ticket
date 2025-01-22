// DOM Elements
const formContainer = document.querySelector(".form-container");
const ticketContainer = document.querySelector(".ticket-container");
const heroSection = document.querySelector(".hero-section");

const fullNameInput = document.querySelector("#full-name");
const emailInput = document.querySelector("#email");
const githubInput = document.querySelector("#github");

const uploadArea = document.querySelector("#upload-area");
const fileInput = document.querySelector("#file-input");
const imagePreview = document.querySelector("#image-preview");
const imageActions = document.querySelector("#image-actions");
const removeBtn = document.querySelector("#remove-btn");
const changeBtn = document.querySelector("#change-btn");
const dropMessage = document.querySelector(".drop-message");
const uploadIcon = document.querySelector(".upload-icon");
const fileLabel = document.querySelector(".file-label");
const fileInputContainer = document.querySelector(".file-input-container");

const submitBtn = document.querySelector("#submit-btn");

const nameDisplay = document.querySelector("#name-display");
const emailDisplay = document.querySelector("#email-display");
const githubDisplay = document.querySelector("#github-display");
const ticketImage = document.querySelector("#ticket-image");

// Drag and Drop Handlers
uploadArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  uploadArea.classList.add("dragging");
});

uploadArea.addEventListener("dragleave", () => {
  uploadArea.classList.remove("dragging");
});

uploadArea.addEventListener("drop", (e) => {
  e.preventDefault();
  uploadArea.classList.remove("dragging");

  const files = e.dataTransfer.files;
  if (files.length) {
    handleImage(files[0]);
  }
});

// Handle Image Upload
const handleImage = (file) => {
  const reader = new FileReader();
  reader.onload = () => {
    imagePreview.src = reader.result;
    imagePreview.classList.remove("hidden");
    imageActions.classList.remove("hidden");
    dropMessage.classList.add("hidden");
    uploadIcon.classList.add("hidden");
    fileLabel.classList.add("hidden");
    fileInputContainer.classList.add("hidden"); // Hide the file label
  };
  reader.readAsDataURL(file);
};

// File Input Change Handler
fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    handleImage(file);
  }
});

// Change Button Functionality
changeBtn.addEventListener("click", () => {
  fileInput.click();
});

// Remove Button Functionality
removeBtn.addEventListener("click", () => {
  fileInput.value = ""; // Clear file input
  imagePreview.src = "";
  imagePreview.classList.add("hidden");
  imageActions.classList.add("hidden");
  dropMessage.classList.remove("hidden");
  uploadIcon.classList.remove("hidden"); // Show the upload icon again
});

// Form Submission
submitBtn.addEventListener("click", () => {
  const isValid = [fullNameInput, emailInput, githubInput].every((input) => {
    const errorSpan = input.nextElementSibling;
    if (!input.validity.valid) {
      errorSpan.style.display = "block";
      return false;
    } else {
      errorSpan.style.display = "none";
      return true;
    }
  });

  if (isValid) {
    nameDisplay.textContent = fullNameInput.value;
    emailDisplay.textContent = emailInput.value;
    githubDisplay.textContent = githubInput.value;
    document.querySelector(".gen-name").textContent = fullNameInput.value;
    ticketImage.src = imagePreview.src;

    formContainer.classList.add("hidden");
    ticketContainer.classList.remove("hidden");
    heroSection.classList.add("hidden");
  }
});
