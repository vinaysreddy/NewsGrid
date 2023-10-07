const API_KEY = "7e14f49bc28641ea931802d22e7275ba";
const URL = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("honey sing"));
async function fetchNews(query) {
    const response = await fetch(`${URL}${query}&apiKey=${API_KEY}`);
    const data = await response.json();
    console.log(data);
    if (data.articles) console.log("hiihiihi");
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML = '';

    articles.forEach(article => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });

}

function fillDataInCard(cardClone, article) {
    const newsImage = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDescription = cardClone.querySelector('#news-desc');


    newsImage.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsSource.innerHTML = article.publishedAt;
    newsDescription.innerHTML = article.description;

}
