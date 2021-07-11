const languages = ["ar", "zh", "en", "es", "fr", "ru"];

function renderLanguageAnchorTags() {
  let result = window.location.origin;
  let result2 = window.location.pathname;

  const languageHTML = languages.map(
    (el) => `<a href="${result}${result2}?lang=${el}">${el}</a>`
  );
  document.getElementById("language").innerHTML = languageHTML;
  // document.getElementById("languages").innerHTML = languagesMap.
}
renderLanguageAnchorTags();
