let sliderVerificator = null;

function darkMode() {
  const allElements = document.querySelectorAll("*");

  if (sliderVerificator) {
    document.querySelector("#slider span").style.transform = "translateX(5rem)";
    for (let i = 0; i < allElements.length; i++) {
      if (allElements[i].classList.contains("noDarkMode")) {
      } else {
        allElements[i].style.backgroundColor = "#000";
        allElements[i].style.color = "#fff";
      }
    }
    sliderVerificator = false;
  } else if (sliderVerificator == false) {
    document.querySelector("#slider span").style.transform = "translateX(0)";
    for (let i = 0; i < allElements.length; i++) {
      if (allElements[i].classList.contains("noDarkMode")) {
      } else {
        allElements[i].style.backgroundColor = "initial";
        allElements[i].style.color = "initial";
      }
    }
    sliderVerificator = true;
  } else {
    sliderVerificator = true;
    darkMode();
  }
}
document.querySelector("#slider").addEventListener("click", darkMode);
