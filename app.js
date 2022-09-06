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

/** get shortened link */
const getLink = async () => {
  const link = linkInputField.value;
  if (!link) {
    inputError(true);
    return;
  }

  const links = await shortenedLink(link);

  resultsContainer.innerHTML += `
    <!-- result -->
    <div class="result">
        <p class="original-link">${links[1]}</p>
        <p class="short-link">${links[0]}</p>
        <button class="copy-btn"></button>
    </div>
  `;

  copyBtnsListeners();
  linkInputField.value = "";
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

/**
 * ========================
 * ========================
 *          sidemenu
 * ========================
 * ========================
 * */
const sidemenu = document.getElementById("sidemenu");
const sidemenuBtn = document.querySelector(".hamburger");

sidemenuBtn.addEventListener("click", () => {
  sidemenu.classList.toggle("show-sidemenu");
});
