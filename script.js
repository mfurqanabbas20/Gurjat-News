const API_KEY = "c6f63e7b6fb14d128a4bf07d1eb39405";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("Canada"));

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    console.log(data);
    bindData(data.articles);
}


function bindData(articles) {
    const cardscontainer = document.getElementById('cards-container');
    const newstemplate = document.getElementById('template-news-card');

    cardscontainer.innerHTML = "";
    // inner html empty kr dena se yeh ho ga k jab bhi api call ho gi toh pehle wali khatam ho jaein gai shayad.

    articles.forEach((articles)=> {
        if(!articles.urlToImage) return;
        const cardClone = newstemplate.content.cloneNode(true);
        // clone node ka matlab hum deep cloning krna chahte hain means div mei jitne bhi div hain sare k sare clone ho jane chaieye
        fillDataInCard(cardClone, articles);
        cardscontainer.appendChild(cardClone);

    })
}

function fillDataInCard(cardClone, articles) {
    const newsimage = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');
    newsimage.src = articles.urlToImage;
    newsTitle.innerHTML = articles.title;

    newsDesc.innerHTML = articles.description;
    const date = new Date(articles.publishedAt).toLocaleString("en-US",  {
        timeZone: "Asia/Jakarta"
    });
    newsSource.innerHTML = `${articles.source.name} . ${date}`;
    cardClone.firstElementChild.addEventListener('click', () =>
    window.open(articles.url, "_blank")
    )
}
let curSelected = null;

function onNavItemClick(query) {
    fetchNews(query);
    const navItem = document.getElementById(query);
    curSelected?.classList.remove('active');
    curSelected = navItem;
    curSelected.classList.add('active');

}
function reload() {
    window.location.reload();
}

const searchBtn = document.getElementById('search-button');
const searchText = document.getElementById('news-input');
searchBtn.addEventListener('click', () => {
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelected.classList.remove('active');
    curSelectedNav = null;
})


