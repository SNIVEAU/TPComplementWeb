import ArticleProvider from "../../ArticleProvider.js";

export default class DetailArticle {
    constructor() {
        this.id = null;
    }

    static async render(request) {
        const id = request.id;
        let article = await ArticleProvider.getArticle(id);
        return `
        <section>
        <h2> Article Index ${article.id}</h2>
        <p>${article.text}</p>
        </section>
        `;
    }
}