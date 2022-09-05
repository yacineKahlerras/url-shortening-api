/** API APP */
const apiUrl = "https://api.shrtco.de/v2/shorten?url=";
const submitLinkBtn = document.getElementById("submit-btn");
const linkInputField = document.getElementById("link-input");
const resultsContainer = document.querySelector(".results-container");

/** get shortened link */
const getLink = async () => {
  const links = await shortenedLink();

  resultsContainer.innerHTML += `
    <!-- result -->
    <div class="result">
        <p class="original-link">${links[1]}</p>
        <p class="short-link">${links[0]}</p>
        <button class="copy-btn">Copy</button>
    </div>
  `;
};

/** shorten link init */
const shortenedLink = async () => {
  const link = linkInputField.value;
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

/** listeners */
submitLinkBtn.addEventListener("click", getLink);
