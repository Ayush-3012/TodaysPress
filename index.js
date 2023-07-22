// const API_KEY = "33780e04ab8b4142bf17417cda780f46";
const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const url = `${proxyUrl}https://newsapi.org/v2/everything?q=`;
var i = Math.floor(Math.random() * 100);
var navItem = document.querySelectorAll(".navItem");

var query = "";

const options = {
  method: "GET",
  headers: {
    "X-Api-Key": "33780e04ab8b4142bf17417cda780f46",
  },
};

const getNews = (category, i) => {
  if (!category) {
    category = "World";
  }
  news.innerHTML = category;
  fetch(url + category, options)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      newsImg.src =
        response.articles[i]["urlToImage"] != null
          ? response.articles[i]["urlToImage"]
          : "./newspaper.png";
      newsTitle.innerHTML = response.articles[i]["title"];
      var ind = response.articles[i]["content"].indexOf("[+");
      var desc =
        response.articles[i]["content"].length >
        response.articles[i]["description"].length
          ? response.articles[i]["content"].slice(0, ind)
          : response.articles[i]["description"];

      newsDesc.innerHTML = desc;
      const date = new Date(response.articles[i].publishedAt).toLocaleString(
        "en-US",
        {
          timeZone: "Asia/Jakarta",
        }
      );
      newsSource.innerHTML = `${response.articles[i].source.name} · ${date}`;
      newsLink.href = response.articles[i]["url"];
    })
    .catch((err) => console.error(err));
};

navItem.forEach((item) =>
  item.addEventListener("click", () => {
    query = item.innerHTML;
    getNews(query, i);
  })
);

nextBtnIcon.addEventListener("click", () => {
  if (i < 99) {
    if (!query) query = category.value;

    getNews(query, ++i);
  }
});

nextBtnText.addEventListener("click", () => {
  if (i < 99) {
    if (!query) query = category.value;

    getNews(query, ++i);
  }
});

prevBtnIcon.addEventListener("click", () => {
  if (i > 0) {
    if (!query) query = category.value;
    getNews(query, --i);
  }
});

prevBtnText.addEventListener("click", () => {
  if (i > 0) {
    if (!query) query = category.value;
    getNews(query, --i);
  }
});

submit.addEventListener("click", (e) => {
  e.preventDefault();
  query = category.value;
  getNews(query, i);
});

window.onload = function () {
  document.getElementById("category").value = "";
};

window.addEventListener("load", () => getNews("World", i));
