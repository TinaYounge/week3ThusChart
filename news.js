let key = "a2c0769df580c64f7b27c4c74f10d0c4";
//other key bellow
// let key = "bad48fad81cfc0564a7919cdc8e2f935";

function produceDefaultUrl() {
  let url = `https://gnews.io/api/v4/top-headlines?token=` + key;
  const urlParams = window.location.search.split("?")[1];
  if (!urlParams) {
    return url + "&lang=en";
  } else {
    url += "&" + urlParams;
  }
  return url;
}
let url = produceDefaultUrl();

async function getArticles() {
  const response = await fetch(url);
  const json = await response.json();
  const { articles } = json;
  console.log("json form api", { json });
  const articlesHTML = articles.map(renderArticle);
  console.log(articlesHTML);
  document.getElementById("newsList").innerHTML = articlesHTML.join("");
  let goodArticles = articles.reduce((accumulator, currentValue) => {
    if (
      currentValue.image != undefined &&
      currentValue.source.name != undefined
    )
      return accumulator + 1;
    else return accumulator;
  }, 0);

  document.getElementById("title").innerHTML = `CoderNews (${goodArticles})`;
}

getArticles();
function renderArticle(article) {
  if (article.image != undefined && article.source.name != undefined) {
    return `
    <li class="mb-3 align-self-center article">
       <h3>${article.title}</h3>
        <img src="${article.image}" alt="Snow" width="700" 
        height="450"/>
      </div>
        <i class="fa fa-edit fa-xs"></i><h4 class="mb-0"></h4>
        <p><i class="fa fa-envelope"></i>${
          article.publishedAt.split("T")[0]
        }</p>
        <h6 class="mb-0"><a href="${article.url}">${
      article.source.name
    }</a></h6>
      <p><i class="fa fa-envelope"></i>${article.content}</p>

    </li>
  `;
  }
}
