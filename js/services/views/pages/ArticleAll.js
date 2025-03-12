import ArticleProvider from "../../ArticleProvider.js";

export default class ArticleAll {
    static async render(){
        let articles = await ArticleProvider.fetchArticles(20);
        let view = `
        <h2> Les articles </h2>
        <ul>
        ${articles.map(article =>`
            <li>${article.title}</li>`).join('')}
        </ul>
        `;
        return view;
    }
}