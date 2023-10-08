const API_KEY = "7e14f49bc28641ea931802d22e7275ba";
const URL = "https://newsapi.org/v2/everything?q=";

const defaultHomepageSearchQuery = "news";

window.addEventListener("load", () => fetchNews(defaultHomepageSearchQuery));


async function fetchNews(query) {
    const response = await fetch(`${URL}${query}&apiKey=${API_KEY}`);
    const data = await response.json();
    console.log(data);

    if (data.code === "rateLimited") {

        errorCard.style.display = "block";

        const errorTitle = document.getElementById('error-title')
        errorTitle.innerHTML = ":( API call rate limit exceeded. You can only make a limited number of API calls within a specified time frame. Please wait and try again later."

    } else if (data.totalResults === 0) {
        const errorCard = document.getElementById('error-message-card');
        errorCard.style.display = "block";

        const errorTitle = document.getElementById('error-title')
        errorTitle.innerHTML = "Content for this news article is currently unavailable."


    }

    else {
        const errorCard = document.getElementById('error-message-card');
        errorCard.style.display = "none"; // Hide the error message if there are articles
    }
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
    newsDescription.innerHTML = article.description;
    const date = new Date(article.publishedAt).toLocaleString("en-US", { timeZone: "America/Chicago" });
    newsSource.innerHTML = `${article.source.name} • ${date}`;
    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url, "_blank");
    })
}
let currentSelectedNav = null;

function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    console.log(navItem);
    currentSelectedNav?.classList.remove('active');
    currentSelectedNav = navItem;
    console.log(currentSelectedNav);
    currentSelectedNav.classList.add('active');
}


const searchButton = document.getElementById('search-button');
const SearchText = document.getElementById('news-input');


searchButton.addEventListener('click', handleSearch);

SearchText.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        handleSearch();
    }
});

function handleSearch() {
    const query = SearchText.value;
    if (!query) return;
    fetchNews(query);
    currentSelectedNav?.classList.remove('active');
}


function reloadPage() {
    fetchNews(defaultHomepageSearchQuery);
}