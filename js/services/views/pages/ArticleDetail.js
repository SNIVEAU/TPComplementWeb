import ArticleProvider from "../../ArticleProvider.js";
export default class DetailArticle {
    constructor() {
        this.id = null;
    }
    static async render(){
        let article = await ArticleProvider.getArticle(id)
        return `
        <section>
        <h2> Article Index ${article.id}</h2>
        <h3>${article.name}</h3>
        <p>${article.text}</p>
        ```
    }
}