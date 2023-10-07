const API_KEY = "7e14f49bc28641ea931802d22e7275ba";
const URL = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));
async function fetchNews(query) {
    const response = await fetch(`${URL}${query}&apiKey=${API_KEY}`);
    const data = await response.json();
    console.log(data);
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML = '';

    articles.forEach(article => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        cardsContainer.appendChild(cardClone);
    });

}