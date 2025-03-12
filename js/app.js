import About from "./services/views/pages/About";
import Utils from "./services/utils";
import ArticleAll from "./services/views/pages/ArticleAll";
import ArticleDetail from "./services/views/pages/ArticleDetail";
const routes = {
    '/': About,
    '/about': About,
    '/articles': ArticleAll,
    '/articles/:id': ArticleDetail
};
const router = async () => {
    const content = document.querySelector("#contenu");
    let request = Utils.parseRequestURL();
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '');
    let page = routes[parsedURL] || Error404
};

const page = async () => {
    const content = document.querySelector("#contenu");
    content.innerHTML = await About.render();
};
window.addEventListener('load', router);
window.addEventListener('hashchange', router);
