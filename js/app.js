import About from "./services/views/pages/About.js";
import Utils from "./services/utils.js";
import CardsAll from "./services/views/pages/CardsAll.js";
import CardDetail from "./services/views/pages/CardsDetail.js";
import addFavoris from "./services/AddFavoris.js";
import FavoriCardAll from "./services/views/pages/FavoriCardAll.js";
import Equipe from "./services/views/pages/Equipe.js";
import MesEquipe from "./services/views/pages/MesEquipe.js";
import Jouer from "./services/views/pages/Jouer.js";

const routes = {
    '/': About,
    '/about': About,
    '/cards': CardsAll,
    '/cards/:id': CardDetail,
    '/favoris': FavoriCardAll,
    '/equipe': MesEquipe,
    '/equipecreate': Equipe,
    '/jouer': Jouer,
};

const router = async () => {
    const content = document.querySelector("#contenu");
    const request = Utils.parseRequestURL();

    const parsedURL = `/${request.resource || ''}${request.id ? '/:id' : ''}${request.verb ? '/' + request.verb : ''}`;
    const page = routes[parsedURL] || Error404;

    content.innerHTML = await page.render(request);

    if (page.after_render) {
        await page.after_render(request);
    }
    console.log("ROUTER ACTIVÉ");
    console.log("Request complet :", request);
};



const page = async () => {
    const content = document.querySelector("#contenu");
    content.innerHTML = await About.render();
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);



