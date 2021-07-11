function produceDefaultUrl() {
  let url = `https://gnews.io/api/v4/top-headlines?token=bad48fad81cfc0564a7919cdc8e2f935
  `;

  const urlParams = window.location.search.split("?")[1];
  // console.log(window);
  console.log("check urlpara", urlParams);

  if (!urlParams) {
    return url + "&lang=en";
  } else {
    url += "&" + urlParams;
    console.log("check urlpara", url);
  }
  // urlParams.split("&").map((p) => {
  //   // "Massage data" into workable form.
  //   const [key, value] = p.split("=");
  //   url += `&${key}=${value}`;

  // });
  console.log("check url", url);

  return url;
}
let url = produceDefaultUrl();
console.log("check url", url);
// console.log("windown", window);

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

  console.log("goodArticles", goodArticles);
  document.getElementById("title").innerHTML = `CoderNews (${goodArticles})`;
}

getArticles();
function renderArticle(article) {
  if (article.image != undefined && article.source.name != undefined) {
    return `
    <li class="mb-3 align-self-center article">
        ${article.title}
        <img src="${article.image}" alt="Snow" width="900" 
        height="500"/>
      </div>
        <i class="fa fa-edit fa-xs"></i><h4 class="mb-0">${article.source.name}</h4>
        <p><i class="fa fa-envelope"></i>${article.publishedAt}</p>
        <h6 class="mb-0"><a href="${article.url}">${article.source.name}</a></h6>
      <p><i class="fa fa-envelope"></i>${article.content}</p>

    </li>
  `;
  }
}
