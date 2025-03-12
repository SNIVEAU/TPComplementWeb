import ArticleProvider from "../../ArticleProvider.js";

export default class ArticleAll {
    static async render(){
        let articles = await ArticleProvider.fetchArticles(20);
        let view = `
        <h2> Les articles </h2>
        <ul>
        ${articles.map(article =>`
            <li><a href="#/articles/${article.id}">${article.title}</a></li>`).join('')}
        </ul>
        `;
        return view;
    }
}