const languages = ["ar", "zh", "en", "es", "fr", "ru"];

function renderLanguageAnchorTags() {
  const languageHTML = languages.map(
    (el) => `<a href="http://localhost:5500/Index.html?lang=${el}">${el}</a>`
  );
  document.getElementById("language").innerHTML = languageHTML;
  // document.getElementById("languages").innerHTML = languagesMap.
}
renderLanguageAnchorTags();
