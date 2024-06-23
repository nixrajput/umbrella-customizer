"use strict";

{
  // Get the references to the DOM elements
  const colorButtons = document.querySelectorAll(".color-swatch");
  const umbrellaImage = document.getElementById("umbrella-image");
  const uploadButton = document.getElementById("upload");
  const fileUploader = document.getElementById("fileUploader");
  const logoField = document.getElementById("logo");
  const loadingIcon = document.getElementById("loading");

  let isLogoSelected = false;
  let seletedButton = "blue";

  function init() {
    window.addEventListener("load", () => {
      colorButtons.forEach((button) => {
        if (button.dataset.color === seletedButton) {
          button.classList.add(`${button.dataset.color}-swatch-border`);
        }
      });
    });
  }

  // Add event listener for each color button
  colorButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      loadingIcon.classList.remove(button.dataset.filterClass);
      loadingIcon.style.filter = button.dataset.filter;
      const colorName = button.dataset.color;
      const color = button.style.backgroundColor;
      seletedButton = colorName;
      removeButtonBorder();
      button.classList.add(`${colorName}-swatch-border`);
      changeTheme(colorName, color);
      displayLoadingIcon();
      await delay(2000);
      removeLoadingIcon();
    });
  });

  function removeButtonBorder() {
    colorButtons.forEach((button) => {
      if (button.dataset.color !== seletedButton) {
        button.classList.remove(`${button.dataset.color}-swatch-border`);
      }
    });
  }

  // changeTheme is used ro change the umbrella image and colors
  // whenever one of the color buttons are clicked
  function changeTheme(colorName, color) {
    umbrellaImage.src = `assets/${colorName}_umbrella.png`;
    uploadButton.style.backgroundColor = color;
  }

  // The fileuploader is actually an hidden element and is clicked
  // whenever uploadbutton is clicked.
  uploadButton.onclick = () => {
    fileUploader.click();
  };

  function displayLoadingIcon() {
    loadingIcon.classList.remove("disabled");
    umbrellaImage.classList.add("disabled");
    logoField.classList.add("disabled");
  }

  function removeLoadingIcon() {
    loadingIcon.classList.add("disabled");
    umbrellaImage.classList.remove("disabled");
    if (isLogoSelected) {
      logoField.classList.remove("disabled");
    }
  }

  function removeLogoIcon() {
    logoField.classList.add("disabled");
  }

  function displayLogoIcon() {
    logoField.classList.remove("disabled");
  }

  // Whenever a file is uploaded this function is called.
  fileUploader.onchange = function () {
    if (this.files && this.files[0]) {
      const reader = new FileReader();
      reader.onload = loadImage;
      reader.readAsDataURL(this.files[0]);
      removeLogoIcon();
    }
  };

  async function loadImage(e) {
    displayLoadingIcon();
    await delay(2000);
    removeLoadingIcon();
    displayLogoIcon();
    logoField.src = e.target.result;
    isLogoSelected = true;
  }

  // Use to delay program execution asynchronously
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  // Run on window load
  init();
}
