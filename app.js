/**
 * ========================
 * ========================
 *          API APP
 * ========================
 * ========================
 * */

const apiUrl = "https://api.shrtco.de/v2/shorten?url=";
const submitLinkBtn = document.getElementById("submit-btn");
const linkInputField = document.getElementById("link-input");
const resultsContainer = document.querySelector(".results-container");
const errorMessage = document.querySelector(".error-message");
var scrollTimeout;
let resultUpdated = false;

/** get shortened link */
const getLink = async () => {
  const link = linkInputField.value;
  if (!link) {
    inputError(true);
    return;
  }

  const links = await shortenedLink(link);
  const elementsCount = resultsContainer.childElementCount;

  resultsContainer.innerHTML += `
    <!-- result -->
    <div class="result" id="result-${elementsCount + 1}">
        <p class="original-link">${links[1]}</p>
        <p class="short-link">${links[0]}</p>
        <button class="copy-btn"></button>
    </div>
  `;

  copyBtnsListeners();
  linkInputField.value = "";
  scrollToElement(elementsCount);
};

/** scroll to new results element */
const scrollToElement = (elementsCount) => {
  // removes all shake elements
  const alResults = [...resultsContainer.children];
  alResults.forEach((elm) => {
    elm.classList.remove("result-shake");
    console.log(elm.tagName);
  });

  resultUpdated = true;
  document
    .getElementById(`result-${elementsCount + 1}`)
    .scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
};

/** shakes new result element */
const shakeResultElement = () => {
  const result = resultsContainer.lastElementChild;
  result.classList.add("result-shake");
};

/** throw input error */
const inputError = (show) => {
  if (show) {
    errorMessage.classList.add("show-error-message");
    linkInputField.classList.add("input-error");
  } else {
    errorMessage.classList.remove("show-error-message");
    linkInputField.classList.remove("input-error");
  }
};

/** shorten link init */
const shortenedLink = async (link) => {
  let data = await fetchData(link);
  let links = [data.result.full_short_link, data.result.original_link];
  return links;
};

/** fetch data */
const fetchData = async (url) => {
  let response = await fetch(`${apiUrl}${url}`, { cache: "no-cache" }).catch(
    (err) => console.log(err)
  );
  if (response) return response.json();
  return response;
};

/** gets all 'copy' buttons and adds to them
 * an event listeners
 */
const copyBtnsListeners = () => {
  const allBtns = [...document.querySelectorAll(".copy-btn")];
  allBtns.forEach((b) => {
    b.addEventListener("click", () => copyToClipboard(b));
  });
};

/** copy elements to clipboard */
const copyToClipboard = (btn) => {
  const prevElement = btn.previousElementSibling;
  navigator.clipboard.writeText(prevElement.textContent);
};

/** listeners */
copyBtnsListeners();
submitLinkBtn.addEventListener("click", getLink);
linkInputField.addEventListener("input", () => inputError(false));

// checks if we stopped scrolling
document.addEventListener("scroll", function (e) {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(function () {
    if (resultUpdated) {
      resultUpdated = false;
      shakeResultElement();
      console.log("Scroll ended");
    }
  }, 100);
});

/**
 * ========================
 * ========================
 *          sidemenu
 * ========================
 * ========================
 * */
const sidemenu = document.getElementById("sidemenu");
const sidemenuBtn = document.querySelector(".hamburger");
let sidebarActive = false;

/** shows/hides sidemenu */
const sidemenuVisibility = (show) => {
  if (show == true) sidemenu.classList.add("show-sidemenu");
  if (show == false) sidemenu.classList.remove("show-sidemenu");
};

/** listeners */
sidemenuBtn.addEventListener("click", () => sidemenuVisibility(true));
sidemenu.addEventListener("click", () => sidemenuVisibility(false));
