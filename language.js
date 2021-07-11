const languages = ["ar", "zh", "en", "es", "fr", "ru"];

function renderLanguageAnchorTags() {
  let result = window.location.origin;
  const languageHTML = languages.map(
    (el) => `<a href="${result}/Index.html?lang=${el}">${el}</a>`
  );
  document.getElementById("language").innerHTML = languageHTML;
  // document.getElementById("languages").innerHTML = languagesMap.
}
renderLanguageAnchorTags();
