import About from "./services/views/pages/About.js";
import Utils from "./services/utils.js";
import CardsAll from "./services/views/pages/CardsAll.js";
import CardDetail from "./services/views/pages/CardsDetail.js";
import addFavoris from "./services/AddFavoris.js";
import FavoriCardAll from "./services/views/pages/FavoriCardAll.js";
import Equipe from "./services/views/pages/Equipe.js";
const routes = {
    '/': About,
    '/about': About,
    '/cards': CardsAll,
    '/cards/:id': CardDetail,
    '/favoris': FavoriCardAll,
    '/equipe': Equipe
};

const router = async () => {
    const content = document.querySelector("#contenu");
    let request = Utils.parseRequestURL();
    let parsedURL = `/${request.resource || ''}${request.id ? '/:id' : ''}${request.verb ? '/' + request.verb : ''}`;

    console.log("Request URL:", request);
    console.log("Parsed URL:", parsedURL);
    let page = routes[parsedURL] || (request.resource === "articles" && request.id ? ArticleDetail : Error404);

    content.innerHTML = await page.render(request);
};

const page = async () => {
    const content = document.querySelector("#contenu");
    content.innerHTML = await About.render();
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
